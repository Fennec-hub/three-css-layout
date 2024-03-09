# Three CSS Layout

`CSSLayout` seamlessly adapts its child `CSSLayoutObject` objects to the referenced HTML layout, efficiently manages there positioning, scaling and rotation, ensuring responsive and dynamic layouts within a Three.js scene.

# CSSLayout

## Properties

### .domElement

The main `HTMLElement` layout.

## Methods

### constructor(element: HTMLElement | string)

Take the main layout as an `HTMLElement` or a CSS query selector string, example `"#layout"`.

### .fitCamera(camera: PerspectiveCamera | OrthographicCamera, fit: "cover" | "contain" | "fill", lookAtCamera: boolean)

Typically used to overlay three.js scene over an HTML layout. It will map all the `CSSLayoutObject` children position and scale in relation to the camera viewport, `fit` simulate CSS's `object-fit` property, set it to `"cover"` if you also need to map the layout scroll.

### .fitPlane(width: number, height: number)

Map all the `CSSLayoutObject` children position and scale in relation to a plane defined by its `width` and `height`.

### .scroll(listen: boolean, scrollElement?: HTMLElement)

listen or stop listening the scroll event, set the `CSSLayout.position.y` accordingly. `scrollElement` is optional if not set will listen the `window` scroll event.

### .updateObjects(updateElements: boolean = false, updateObjects: boolean = false)

Typically used inside the animation loop in conjunction with CSS keyframes animations or transitions. Will update all the `CSSLayoutObject` children transformations. Both parameters are defaulted to false for performance.

If `updateElements` is `true`, will recompute the related `HTMLElement`'s `clientBoundingBox` (less performant), otherwise will only compute the `transform` style.

If `updateObjects` is `true`, will recompute the Object3D `boundingBox` (less performant).

## Events

### onBeforeFit

Event triggered before fitting any `CSSLayoutObject`child objects, useful for making adjustments before computing the transformations.

### onFit

Event triggered after fitting all the `CSSLayoutObject` child objects, useful for making post transformation adjustments.
