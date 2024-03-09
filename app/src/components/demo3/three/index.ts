import {
  AmbientLight,
  Clock,
  Color,
  DirectionalLight,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  SRGBColorSpace,
  Scene,
  WebGLRenderer,
} from "three";

import { CSSLayout, CSSLayoutObject } from "@lib/index";
import { getBackgroundBox } from "./utils/getBackgroundBox";
import { threeResize } from "@/threeUtils/onResize";
import { loadEnvMap } from "@/threeUtils/loadEnvMap";
import { setSceneLights } from "./utils/setSceneLights";
import { RoundRectGeometry } from "./utils/RoundRectGeometry";
import { loadModels } from "./utils/loadModels";

const clock = new Clock();
const ambientLight = new AmbientLight(0xffffff, 0.4);
const dirLight = new DirectionalLight(0xffffff, 2);
dirLight.position.set(-5, 5, 3);

const camera = new PerspectiveCamera();
camera.fov = 10;
camera.position.z = 1;

const scene = new Scene();
scene.background = new Color(0xeba601);

let layout: HTMLElement;
let backgroundBox: ReturnType<typeof getBackgroundBox>;
let renderer: WebGLRenderer;

export const initScene = () => {
  layout = document.body;

  renderer = new WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Layout
  const cssLayout = new CSSLayout(layout);
  cssLayout.scroll(true);

  // Background
  backgroundBox = getBackgroundBox();
  const cssLayoutBackground = new CSSLayoutObject("#background", "fill");
  cssLayoutBackground.add(backgroundBox.box);
  cssLayout.add(cssLayoutBackground);

  // Main plane
  const roundedRectGeometry = new RoundRectGeometry(1, 1, 0.03, 12);
  const basicMaterial = new MeshBasicMaterial({
    transparent: true,
    opacity: 0.5,
  });
  const mainPlane = new Mesh(roundedRectGeometry, basicMaterial);

  const cssLayoutMainPlane = new CSSLayoutObject("main", "fill");
  cssLayoutMainPlane.add(mainPlane);
  cssLayoutMainPlane.addEventListener("onBeforeFit", () => {
    const { offsetWidth, offsetHeight } = cssLayoutMainPlane.domElement;
    roundedRectGeometry.update(offsetWidth, offsetHeight, 30);
    cssLayoutMainPlane.objectNeedsUpdate = true;
  });

  cssLayout.add(cssLayoutMainPlane);

  // Header Model
  const { animateModel } = loadModels(cssLayout, camera);

  scene.add(ambientLight, dirLight, cssLayout);

  layout.appendChild(renderer.domElement);
  renderer.setAnimationLoop(animation);
  renderer.outputColorSpace = SRGBColorSpace;

  setSceneLights(scene);
  loadEnvMap({
    renderer,
    scene,
    path: "/three-css-layout/studio_small_03_2k.hdr",
  });

  resize();

  function animation() {
    const elapsedTime = clock.getElapsedTime();

    animateModel(elapsedTime);
    backgroundBox.setTime(elapsedTime);

    cssLayout.updateObjects();

    renderer.render(scene, camera);
  }

  function resize() {
    const [width, height] = threeResize(layout, renderer, camera);

    cssLayout.fitCamera(camera, "cover");

    backgroundBox.setResolution(width, height);
  }

  window.onresize = resize;
};

// HMR reset
export const disposeScene = () => {
  document.body.removeChild(renderer.domElement);

  renderer.setAnimationLoop(null);
  renderer.dispose();

  scene.clear();
  backgroundBox.dispose();
};
