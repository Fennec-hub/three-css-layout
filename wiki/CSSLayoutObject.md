# CSSLayoutObject Class

Must be a `CSSLayout`'s Child. Manages it self positioning, scaling and rotation in relation to the referenced `HTMLElement`.

## Properties

### .fit

Emulate CSS's `object-fit` property, can be `"contain"`, `"fill"` or `"cover"`, default `"contain"`.

### .domElement

The reference `HTMLElement`.

### objectNeedsUpdate

Set to `true` to recompute the `Object3D`'s `boundingBox` (less performant).

### elementNeedsUpdate

Set to `true` to recompute the related `HTMLElement`'s `clientBoundingBox` (less performant), default `false`.

## Methods

### constructor(domElement: HTMLElement | string, fit: "cover" | "contain" | "fill")

`CSSLayout` child object will be mapped in reference to the domElement.

- `domElement`: The reference element, can be an `HTMLElement` or a CSS querySelector string, example `"#my-3d-model"`.
- `fit`: Emulate CSS's `object-fit` property, can be`"contain"`, `"fill"` or `"cover"`, default `"contain"`.

### fitLayout(updateElement: boolean, updateObject: boolean)

Fit the object relative to its parent `CSSLayout` while mapping the transformations of the referenced `HTMLElement`.

- `updateElement`: Set to `true` to recompute the related `HTMLElement`'s `clientBoundingBox` (less performant), default `false`.
- `updateObject`: Set to `true` to recompute the `Object3D`'s `boundingBox` (less performant).

## Events

### onBeforeFit

Event triggered before fitting any `CSSLayoutObject`child objects, useful for making adjustments before computing the transformations.

### onFit

Event triggered after fitting all the `CSSLayoutObject` child objects, useful for making post transformation adjustments.
