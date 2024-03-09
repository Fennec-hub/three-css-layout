import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export const loadModel = async (path: string) =>
  new GLTFLoader()
    .loadAsync(`../three-css-layout/models/${path}`)
    .then((gltf) => gltf.scene)
    .catch((error) => {
      console.error(error);
      return null;
    });
