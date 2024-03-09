import { AmbientLight, Color, DirectionalLight, Scene } from "three";

export const setSceneLights = (scene: Scene) => {
  const color = new Color(0xcccccc);
  const dirLight1 = new DirectionalLight(color, 3);
  const dirLight2 = new DirectionalLight(color, 5);
  const dirLight3 = new DirectionalLight(color, 3);

  dirLight1.position.set(-5, 2, 5);
  dirLight2.position.set(-5, 2, 5);
  dirLight3.position.set(5, 2, -5);

  const ambientLight = new AmbientLight(color, 1);

  scene.add(dirLight1, dirLight2, dirLight3, ambientLight);
};
