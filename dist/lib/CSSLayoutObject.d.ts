import { Object3D, Object3DEventMap } from "three";
import { CSSLayout3DEventMap, CSSLayoutObjectFit } from "./types";
/**
 * `CSSLayout`'s Child. Manages it self positioning, scaling and rotation in relation
 *  to the referenced `HTMLElement`.
 */
export declare class CSSLayoutObject extends Object3D<CSSLayout3DEventMap> {
    type: string;
    /** Emulate CSS's `object-fit` property */
    fit: CSSLayoutObjectFit;
    /** The reference `HTMLElement` */
    domElement: HTMLElement;
    /** Set to `true` to recompute the `Object3D`'s `boundingBox` (less performant). */
    objectNeedsUpdate?: boolean;
    /** Set to `true` to recompute the related `HTMLElement`'s `clientBoundingBox` (less performant) */
    elementNeedsUpdate?: boolean;
    readonly isCSSLayoutObject = true;
    private _container;
    private readonly _size;
    private readonly _domBoundingRect;
    private readonly _boundingRectPosition;
    /**
     * `CSSLayout` child object will be mapped in reference to the domElement.
     *
     * @param domElement - the reference element, can be `HTMLElement` or a CSS querySelector string, example "#my-3d-model".
     * @param fit - Emulate CSS's `object-fit` property.
     */
    constructor(domElement: HTMLElement | string, fit?: CSSLayoutObjectFit);
    /**
     * Fit the object relative to its parent `CSSLayout` mapping the transformations of the referenced `HTMLElement`.
     *
     * @param updateElement - Set to `true` to recompute the related `HTMLElement`'s `clientBoundingBox` (less performant)
     * @param updateObject - Set to `true` to recompute the related `HTMLElement`'s `clientBoundingBox` (less performant)
     * @returns this
     */
    fitLayout(updateElement?: boolean, updateObject?: boolean): this;
    add(...objects: Object3D<Object3DEventMap>[]): this;
    remove(...objects: Object3D<Object3DEventMap>[]): this;
    private _updateObjectBoundingBox;
    private _updateElementBoundingRect;
    private _resetCSSTransform;
}
