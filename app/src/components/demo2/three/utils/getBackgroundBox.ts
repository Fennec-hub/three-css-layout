import { BoxGeometry, ColorRepresentation, Mesh } from "three";
import { getVoronoiGradientMaterial } from "./getVoronoiGradientMaterial";

// Ideally this should a plane
// To get the depth right we're using a box
export const getBackgroundBox = () => {
  const geometry = new BoxGeometry();
  const [material, uniforms] = getVoronoiGradientMaterial();
  const box = new Mesh(geometry, material);

  return {
    box,
    dispose: () => {
      geometry.dispose();
      material.dispose();
    },
    setTime: (time: number) => (uniforms.time.value = time),
    setResolution: (width: number, height: number) => {
      uniforms.resolution.value.set(width, height);
      uniforms.cellSize.value = Math.max(width * 0.025, 16);
    },
    setColors: (color1: ColorRepresentation, color2: ColorRepresentation) => {
      uniforms.color1.value.set(color1);
      uniforms.color2.value.set(color2);
    },
  };
};
