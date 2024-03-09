import { isTypePredicate } from "@lib/utils/isTypePredicate";
import type {
  PerspectiveCamera,
  OrthographicCamera,
  WebGLRenderer,
} from "three";

export const threeResize = (
  container: HTMLElement,
  renderer: WebGLRenderer,
  camera: PerspectiveCamera | OrthographicCamera
) => {
  let [width, height] = [container.clientWidth, container.clientHeight];

  if (isTypePredicate<PerspectiveCamera>(camera, "isPerspectiveCamera")) {
    camera.aspect = width / height;
  } else {
    camera.zoom = 100;
    camera.left = width / -2;
    camera.right = width / 2;
    camera.top = height / 2;
    camera.bottom = height / -2;
  }

  camera.updateProjectionMatrix();
  renderer.setSize(width, height);

  return [width, height];
};
