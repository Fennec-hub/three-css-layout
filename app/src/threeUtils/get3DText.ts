import { Mesh, MeshStandardMaterial } from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";

export const get3DText = (text: string = "Three CSS Layout") =>
  new FontLoader()
    .loadAsync("./fonts/Lato_Regular.json")
    .then((font) => {
      const geometry = new TextGeometry(text, {
        font: font,
        size: 80,
        height: 5,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 10,
        bevelSize: 1,
        bevelOffset: 0,
        bevelSegments: 5,
      }).center();

      const material = new MeshStandardMaterial({
        color: 0x222222,
      });

      return new Mesh(geometry, material);
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
