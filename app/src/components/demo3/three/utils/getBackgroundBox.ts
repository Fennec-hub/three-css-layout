import { BoxGeometry, Mesh } from "three";
import { getShaderMaterial } from "./getGradientShaderMaterial";

// Ideally this should a plane
// To get the depth right we're using a box
export const getBackgroundBox = () => {
  const geometry = new BoxGeometry();
  const material = getShaderMaterial();
  const box = new Mesh(geometry, material);

  const { uTime, uResolution } = material.uniforms;

  return {
    box,
    dispose: () => {
      geometry.dispose();
      material.dispose();
    },
    setTime: (time: number) => (uTime.value = time),
    setResolution: (width: number, height: number) =>
      uResolution.value.set(width, height),
  };
};
