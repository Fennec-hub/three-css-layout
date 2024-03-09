import {
  Box3,
  Matrix4,
  Object3D,
  Object3DEventMap,
  Vector2,
  Vector3,
} from "three";
import type { CSSLayout } from "./CSSLayout";
import { BoundingRect, CSSLayout3DEventMap, CSSLayoutObjectFit } from "./types";
import { cssTransformToMatrix4 } from "./utils/cssTransformToMatrix4";
import { getDomElement } from "./utils/getDomElement";
import { resetObjectTransform } from "./utils/resetObjectTransform";

const _box3 = new Box3();
const _originMatrix = new Matrix4();
const _originPosition = new Vector3();
const _translate = new Vector3();

/**
 * `CSSLayout`'s Child. Manages it self positioning, scaling and rotation in relation
 *  to the referenced `HTMLElement`.
 */
export class CSSLayoutObject extends Object3D<CSSLayout3DEventMap> {
  type = "CSSLayoutObject";
  /** Emulate CSS's `object-fit` property */
  fit: CSSLayoutObjectFit = "contain";
  /** The reference `HTMLElement` */
  domElement: HTMLElement;
  /** Set to `true` to recompute the `Object3D`'s `boundingBox` (less performant). */
  objectNeedsUpdate?: boolean = true;
  /** Set to `true` to recompute the related `HTMLElement`'s `clientBoundingBox` (less performant) */
  elementNeedsUpdate?: boolean = true;

  readonly isCSSLayoutObject = true;
  private _container = new Object3D();
  private readonly _size = new Vector3();
  private readonly _domBoundingRect: BoundingRect = [0, 0, 0, 0];
  private readonly _boundingRectPosition: Vector3 = new Vector3();

  /**
   * `CSSLayout` child object will be mapped in reference to the domElement.
   *
   * @param domElement - the reference element, can be `HTMLElement` or a CSS querySelector string, example "#my-3d-model".
   * @param fit - Emulate CSS's `object-fit` property.
   */
  constructor(
    domElement: HTMLElement | string,
    fit: CSSLayoutObjectFit = "contain"
  ) {
    super();
    this.domElement = getDomElement(domElement, this.type);
    this._container.parent = this;
    this._container.name = "container";
    this.children.push(this._container);
    this.fit = fit;
  }

  /**
   * Fit the object relative to its parent `CSSLayout` mapping the transformations of the referenced `HTMLElement`.
   *
   * @param updateElement - Set to `true` to recompute the related `HTMLElement`'s `clientBoundingBox` (less performant)
   * @param updateObject - Set to `true` to recompute the related `HTMLElement`'s `clientBoundingBox` (less performant)
   * @returns this
   */
  fitLayout(updateElement: boolean = false, updateObject: boolean = false) {
    this.dispatchEvent({ type: "onBeforeFit" });

    this.elementNeedsUpdate = updateElement || this.elementNeedsUpdate;
    this.objectNeedsUpdate = updateObject || this.objectNeedsUpdate;

    const parent = this.parent as CSSLayout;
    if (!parent || !parent.isCSSLayout)
      throw Error(`${this.type} require a parent of type "CSSLayout"`);

    const layoutDomOffset = parent._layoutDomOffset;
    const parentScaleFactor = parent._scaleFactor;
    const parentPosOffset = parent._positionOffset;

    const computedStyle = getComputedStyle(this.domElement);
    const { transform, display } = computedStyle;

    if (display === "none") {
      this.visible = false;
      return this;
    }

    this.visible = true;
    resetObjectTransform(this);

    if (transform === "none") {
      this._updateElementBoundingRect(
        this.domElement,
        layoutDomOffset,
        parentScaleFactor,
        parentPosOffset
      );
      this.dispatchEvent({ type: "onFit" });
      return this;
    }

    this._resetCSSTransform(
      computedStyle,
      layoutDomOffset,
      parentScaleFactor,
      parentPosOffset
    );

    const [top, left, width, height] = this._domBoundingRect;
    const [halfWidth, halfHeight] = [width / 2, height / 2];

    const [originX, originY] = computedStyle.transformOrigin
      .split(" ")
      .map(parseFloat);

    _translate.setFromMatrixPosition(_originMatrix).multiply({
      x: parentScaleFactor.x,
      y: -parentScaleFactor.y,
      z: 1,
    });

    _originPosition
      .set(
        (left + halfWidth + originX - halfWidth - layoutDomOffset.x) *
          parentScaleFactor.x -
          parentPosOffset.x,
        -(top + halfHeight + originY - halfHeight - layoutDomOffset.y) *
          parentScaleFactor.y -
          parentPosOffset.y,
        0
      )
      .add(_translate);

    _originMatrix.setPosition(_originPosition);

    this.applyMatrix4(_originMatrix);

    this._container.position
      .copy(this._boundingRectPosition)
      .sub(_originPosition)
      .add(_translate)
      .fromArray(
        this._container.position.toArray().map((v) => parseFloat(v.toFixed(2)))
      );

    this.dispatchEvent({ type: "onFit" });

    return this;
  }

  add(...objects: Object3D<Object3DEventMap>[]): this {
    this._container.add(...objects);
    return this;
  }

  remove(...objects: Object3D<Object3DEventMap>[]): this {
    this._container.remove(...objects);
    return this;
  }

  private _updateObjectBoundingBox() {
    resetObjectTransform(this._container);

    if (!this.objectNeedsUpdate) return;

    _box3.setFromObject(this._container);
    _box3.getSize(this._size);

    this.objectNeedsUpdate = false;
  }

  private _updateElementBoundingRect(
    element: HTMLElement,
    domOffset: Vector2,
    scaleFactor: Vector2,
    posOffset: Vector2
  ) {
    if (!this.elementNeedsUpdate) return;

    const container = this._container;

    const { top, left, width, height } = element.getBoundingClientRect();

    this._updateObjectBoundingBox();

    (this._domBoundingRect as any).length = 0;
    this._domBoundingRect.push(top, left, width, height);

    container.position.set(
      (left - domOffset.x + width / 2) * scaleFactor.x - posOffset.x,
      -(top - domOffset.y + height / 2) * scaleFactor.y - posOffset.y,
      0
    );

    this._boundingRectPosition.copy(container.position);

    const fit = this.fit;
    if (fit !== "fill") {
      const ratio = Math[fit === "contain" ? "min" : "max"](
        (width * scaleFactor.x) / this._size.x,
        (height * scaleFactor.y) / this._size.y
      );

      container.scale.setScalar(ratio);
    } else
      container.scale.multiply({
        x: (width * scaleFactor.x) / this._size.x,
        y: (height * scaleFactor.y) / this._size.y,
        z: this._size.z, // FIXME - Handle Z axis
      });

    this.elementNeedsUpdate = false;
  }

  private _resetCSSTransform(
    computedStyle: CSSStyleDeclaration,
    domOffset: Vector2,
    scaleFactor: Vector2,
    posOffset: Vector2
  ) {
    cssTransformToMatrix4(computedStyle.transform, _originMatrix);

    if (!this.elementNeedsUpdate) return;

    const element = this.domElement;
    const style = element.style;

    const { transform, animation, transition } = style;

    const hasAnimation = computedStyle.animationName !== "none";
    const hasTransition = !!parseFloat(computedStyle.transitionDuration);

    style.transform = "none";
    if (hasAnimation) style.animation = "none";
    if (hasTransition) style.transition = "none";

    this._updateElementBoundingRect(element, domOffset, scaleFactor, posOffset);

    style.transform = transform;
    if (hasAnimation) style.animation = animation;
    if (hasTransition) style.transition = transition;
  }
}
