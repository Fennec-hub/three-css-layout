import { isTypePredicate } from "@lib/utils/isTypePredicate";
import { Mesh, MeshStandardMaterial, Object3D } from "three";

export const setEnvMapIntensity = (object: Object3D, intensity: number) => {
  object.traverse((child) => {
    if (!isTypePredicate<Mesh>(child, "isMesh")) return;

    const material = child.material as MeshStandardMaterial;

    if (!material.hasOwnProperty("envMapIntensity")) return;

    material.envMapIntensity = intensity;
  });
};
