import type { Object3D } from "three";

export const resetObjectTransform = (object: Object3D) => {
  object.position.set(0, 0, 0);
  object.scale.set(1, 1, 1);
  object.rotation.set(0, 0, 0);
};
