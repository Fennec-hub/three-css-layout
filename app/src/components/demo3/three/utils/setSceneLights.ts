import { AmbientLight, DirectionalLight, Scene } from "three";

export const setSceneLights = (scene: Scene) => {
  const ambientLight = new AmbientLight(0xffffff, 0.5);

  const dirLight1 = new DirectionalLight(0xffffff, 2);
  const dirLight2 = new DirectionalLight(0xffffff, 0.3);
  const dirLight3 = new DirectionalLight(0xffffff, 0.3);

  dirLight1.position.set(5, 5, 5);
  dirLight2.position.set(-5, 5, 5);
  dirLight3.position.set(0, 0, 5);

  scene.add(ambientLight, dirLight1, dirLight2, dirLight3);
};
