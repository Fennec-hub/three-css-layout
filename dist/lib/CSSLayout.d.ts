import { Object3D, Object3DEventMap, Vector2, type OrthographicCamera, type PerspectiveCamera } from "three";
import { CSSLayout3DEventMap, CSSLayoutObjectFit } from "./types";
/**
 * `CSSLayout` seamlessly adapts its child `CSSLayoutObject` objects to the referenced HTML layout,
 * efficiently manages there positioning, scaling and rotation, ensuring responsive and dynamic
 * layouts within a Three.js scene.
 */
export declare class CSSLayout extends Object3D<CSSLayout3DEventMap> {
    type: string;
    /** The main `HTMLElement` layout. */
    domElement: HTMLElement;
    readonly isCSSLayout = true;
    readonly _layoutDomOffset: Vector2;
    readonly _positionOffset: Vector2;
    readonly _scaleFactor: Vector2;
    readonly _outerSize: Vector2;
    readonly _innerSize: Vector2;
    private _cssLayoutObjects;
    private _scrollReference?;
    private _scrollListener?;
    constructor(domElement: string | HTMLElement);
    /**
     * Set layout `width` and `height` to fit the camera viewport.
     * Typically used to overlay a `Scene` over an HTML layout.
     *
     * @param camera - The rendering camera
     * @param fit -  Emulate the CSS's `object-fit` property, set to "cover" if you also need to map the layout scroll.
     * @param lookAtCamera - set to true to rotate the layout toward the camera
     * @returns this
     */
    fitCamera(camera: PerspectiveCamera | OrthographicCamera, fit?: CSSLayoutObjectFit, lookAtCamera?: boolean): this;
    /**
     * Set ths `CSSLayout` dimensions to fit a plane defined by its `width` and `height`.
     *
     * @param width - The plane width
     * @param height - The plane Height
     * @param fit - Emulate the CSS's `object-fit` property, set to "cover" if you need to map the layout scroll.
     * @returns this
     */
    fitPlane(width: number, height: number, fit?: CSSLayoutObjectFit): this;
    /**
     * listen or stop listening the scroll event, and set the y position accordingly.
     *
     * @param listen - Boolean wither to listen or stop listening
     * @param scrollElement - Optional if not set will listen the `window` scroll event.
     * @returns this
     */
    scroll(listen: boolean, scrollElement?: string | HTMLElement): this;
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
    updateObjects(updateElements?: boolean, updateObjects?: boolean): this;
    add(...objects: Object3D<Object3DEventMap>[]): this;
    remove(...objects: Object3D<Object3DEventMap>[]): this;
    dispose(): void;
}
