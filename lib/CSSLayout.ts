import {
  Object3D,
  Object3DEventMap,
  Vector2,
  type OrthographicCamera,
  type PerspectiveCamera,
} from "three";
import type { CSSLayoutObject } from "./CSSLayoutObject";
import { CSSLayout3DEventMap, CSSLayoutObjectFit } from "./types";
import { getDomElement } from "./utils/getDomElement";
import { isTypePredicate } from "./utils/isTypePredicate";

/**
 * `CSSLayout` seamlessly adapts its child `CSSLayoutObject` objects to the referenced HTML layout,
 * efficiently manages there positioning, scaling and rotation, ensuring responsive and dynamic
 * layouts within a Three.js scene.
 */
export class CSSLayout extends Object3D<CSSLayout3DEventMap> {
  type = "CSSLayout";
  /** The main `HTMLElement` layout. */
  domElement: HTMLElement;
  readonly isCSSLayout = true;
  readonly _layoutDomOffset = new Vector2();
  readonly _positionOffset = new Vector2();
  readonly _scaleFactor = new Vector2();
  readonly _outerSize = new Vector2();
  readonly _innerSize = new Vector2();
  private _cssLayoutObjects: CSSLayoutObject[] = [];
  private _scrollReference?: HTMLElement;
  private _scrollListener?: () => void;

  constructor(domElement: string | HTMLElement) {
    super();
    this.domElement = getDomElement(domElement, this.type);
  }

  /**
   * Set layout `width` and `height` to fit the camera viewport.
   * Typically used to overlay a `Scene` over an HTML layout.
   *
   * @param camera - The rendering camera
   * @param fit -  Emulate the CSS's `object-fit` property, set to "cover" if you also need to map the layout scroll.
   * @param lookAtCamera - set to true to rotate the layout toward the camera
   * @returns this
   */
  fitCamera(
    camera: PerspectiveCamera | OrthographicCamera,
    fit: CSSLayoutObjectFit = "fill",
    lookAtCamera: boolean = false
  ) {
    let width = 1;
    let height = 1;

    if (!!this._scrollListener) this.position.set(0, 0, this.position.z);

    if (isTypePredicate<PerspectiveCamera>(camera, "isPerspectiveCamera")) {
      const distance = camera.position.distanceTo(this.position);
      const verticalFov = camera.fov * (Math.PI / 180);
      height = 2 * Math.tan(verticalFov / 2) * distance;
      width = height * camera.aspect;
    } else {
      width = (camera.right - camera.left) / camera.zoom;
      height = (camera.top - camera.bottom) / camera.zoom;
    }

    if (lookAtCamera) this.lookAt(camera.position);

    return this.fitPlane(width, height, fit);
  }

  /**
   * Set ths `CSSLayout` dimensions to fit a plane defined by its `width` and `height`.
   *
   * @param width - The plane width
   * @param height - The plane Height
   * @param fit - Emulate the CSS's `object-fit` property, set to "cover" if you need to map the layout scroll.
   * @returns this
   */
  fitPlane(width: number, height: number, fit: CSSLayoutObjectFit = "cover") {
    this.dispatchEvent({ type: "onBeforeFit" });

    let scrollLeft = 0;
    let scrollTop = 0;

    if (this._scrollListener) {
      if (this._scrollReference) {
        scrollLeft = this._scrollReference.scrollLeft;
        scrollTop = this._scrollReference.scrollTop;
      } else {
        scrollLeft = window.screenX;
        scrollTop = window.scrollY;
      }
    }

    const {
      width: layoutWidth,
      height: layoutHeight,
      left,
      top,
    } = this.domElement.getBoundingClientRect();

    this._outerSize.set(layoutWidth, layoutHeight);
    this._innerSize.set(width, height);
    this._layoutDomOffset.set(left + layoutWidth / 2, top + layoutHeight / 2);
    this._positionOffset.set(0, 0);
    this._scaleFactor.set(width / layoutWidth, height / layoutHeight);

    if (fit !== "fill") {
      const ratio = Math[fit === "contain" ? "min" : "max"](
        this._scaleFactor.x,
        this._scaleFactor.y
      );

      this._scaleFactor.set(ratio, ratio);
      this._outerSize.multiply(this._scaleFactor);

      if (this._outerSize.x > width)
        this._positionOffset.x = (this._outerSize.x - width) / -2;
      else if (this._outerSize.y > height)
        this._positionOffset.y = (this._outerSize.y - height) / 2;
    } else this._outerSize.multiply(this._scaleFactor);

    this.updateObjects(true);

    if (this._scrollListener) {
      if (this._scrollReference) {
        this._scrollReference.scrollLeft = scrollLeft;
        this._scrollReference.scrollTop = scrollTop;
      } else window.scroll(0, 0);

      this._scrollListener();
    }

    this.dispatchEvent({ type: "onFit" });

    return this;
  }

  /**
   * listen or stop listening the scroll event, and set the y position accordingly.
   *
   * @param listen - Boolean wither to listen or stop listening
   * @param scrollElement - Optional if not set will listen the `window` scroll event.
   * @returns this
   */
  scroll(listen: boolean, scrollElement?: string | HTMLElement) {
    if (this._scrollListener) {
      this.position.set(0, 0, this.position.z);
      (this._scrollReference || window).removeEventListener(
        "scroll",
        this._scrollListener
      );
      delete this._scrollListener;
      delete this._scrollReference;
    }

    if (!listen) return this;

    if (scrollElement)
      this._scrollReference = getDomElement(scrollElement, this.type);

    this._scrollListener = () => {
      const scrollX = this._scrollReference
        ? (this._scrollReference as HTMLElement).scrollLeft
        : window.scrollX;
      const scrollY = this._scrollReference
        ? (this._scrollReference as HTMLElement).scrollTop
        : window.scrollY;

      this.position.set(
        -scrollX * this._scaleFactor.x,
        scrollY * this._scaleFactor.y,
        this.position.z
      );
    };

    (this._scrollReference || window).addEventListener(
      "scroll",
      this._scrollListener
    );

    this._scrollListener();

    return this;
  }

  /**
   * Update all the `CSSLayoutObject` child objects transformations.
   * Typically used inside the animation loop in conjunction with CSS keyframes animations or transitions.
   * Both parameters are defaulted to false for performance.
   *
   * @param updateElements - If `true`, will recompute the related `HTMLElement`'s `clientBoundingBox` (less performant),
   *                         otherwise will only compute the `transform` style.
   * @param updateObjects - If `true`, will recompute the `Object3D`'s `boundingBox` (less performant).
   * @returns this
   */
  updateObjects(
    updateElements: boolean = false,
    updateObjects: boolean = false
  ) {
    this._cssLayoutObjects.forEach((cssObject) =>
      cssObject.fitLayout(updateElements, updateObjects)
    );

    return this;
  }

  add(...objects: Object3D<Object3DEventMap>[]): this {
    super.add(...objects);
    objects.forEach((object) => {
      if (isTypePredicate<CSSLayoutObject>(object, "isCSSLayoutObject"))
        this._cssLayoutObjects.push(object);
    });
    return this;
  }

  remove(...objects: Object3D<Object3DEventMap>[]): this {
    super.remove(...objects);
    objects.forEach((object) => {
      const index = this._cssLayoutObjects.indexOf(object as CSSLayoutObject);
      if (~index) this._cssLayoutObjects.splice(index, 1);
    });
    return this;
  }

  dispose() {
    this.scroll(false);
  }
}
