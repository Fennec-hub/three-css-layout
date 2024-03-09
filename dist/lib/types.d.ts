import type { Object3D, Object3DEventMap } from "three";
export type CSSLayoutObjectFit = "cover" | "contain" | "fill";
export type ChildrenMap = [Object3D, HTMLElement][];
export type BoundingRect = [
    top: number,
    left: number,
    width: number,
    height: number
];
export interface CSSLayout3DEventMap extends Object3DEventMap {
    onFit: {};
    onBeforeFit: {};
}
