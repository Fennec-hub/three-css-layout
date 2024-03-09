import { AmbientLight, DirectionalLight, Scene } from "three";

export const setSceneLights = (scene: Scene) => {
  const ambientLight = new AmbientLight(0xffffff, 1);
  const dirLight = new DirectionalLight(0xffffff, 1);
  const dirLight2 = new DirectionalLight(0xffffff, 2);
  const dirLight3 = new DirectionalLight(0xffffff, 1);

  dirLight.position.set(-5, 5, 5);
  dirLight2.position.set(5, 5, 5);
  dirLight3.position.set(0, 5, 0);

  scene.add(ambientLight, dirLight, dirLight2, dirLight3);
};
