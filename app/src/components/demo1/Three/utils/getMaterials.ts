import { getSpiralAlphaMap, getStripeAlphaMap } from "@/threeUtils/alphaMaps";
import { DoubleSide, MeshStandardMaterial } from "three";

export const getMaterials = () => {
  const spiralTexture = getSpiralAlphaMap();
  const stripeTexture = getStripeAlphaMap();

  const colors = [0xffffff, 0xd32f2f, 0x2fd33e];

  return colors.map((color) => {
    const spiralMaterial = new MeshStandardMaterial({
      color,
      side: DoubleSide,
      transparent: true,
      alphaMap: spiralTexture,
    });

    const stripeMaterial = spiralMaterial.clone();
    stripeMaterial.alphaMap = stripeTexture;

    return { spiralMaterial, stripeMaterial };
  });
};
