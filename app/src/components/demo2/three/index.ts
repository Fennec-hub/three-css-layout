import {
  Clock,
  Color,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  MathUtils,
} from "three";

import { CSSLayout, CSSLayoutObject } from "@lib/index";
import { getBackgroundBox } from "./utils/getBackgroundBox";
import { threeResize } from "../../../threeUtils/onResize";
import { loadModel } from "../../../threeUtils/loadModel";
import { setSceneLights } from "./utils/setSceneLights";

const clock = new Clock();

const camera = new PerspectiveCamera();
camera.near = 0.1;
camera.far = 2;
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

  // Sofa1
  loadModel("ritchie_armchair_ochre_yellow.glb").then((sofa1) => {
    if (!sofa1) return;

    // correct initial transformations
    sofa1.position.set(0, -30, 0);
    sofa1.rotation.set(MathUtils.degToRad(25), MathUtils.degToRad(-20), 0);

    // CSSLayout
    const cssLayoutSofa1 = new CSSLayoutObject("#sofa1", "contain");
    cssLayoutSofa1.add(sofa1);

    cssLayout.add(cssLayoutSofa1);
    cssLayout.fitCamera(camera, "cover");
  });

  // Sofa2
  loadModel("dylan_armchair_yolk_yellow.glb").then((sofa2) => {
    if (!sofa2) return;

    // set initial center position
    sofa2.position.set(0, -45, 0);
    sofa2.rotation.set(MathUtils.degToRad(25), MathUtils.degToRad(20), 0);

    const cssLayoutSofa2 = new CSSLayoutObject("#sofa2", "contain");
    cssLayoutSofa2.add(sofa2);

    cssLayout.add(cssLayoutSofa2);
    cssLayout.fitCamera(camera, "cover");
  });

  scene.add(cssLayout);

  layout.appendChild(renderer.domElement);

  setSceneLights(scene);
  /* loadEnvMap({
    renderer,
    scene,
    path: "winter_evening_1k.hdr",
    toneMapping: CineonToneMapping,
  }); */

  renderer.setAnimationLoop(animation);
  function animation() {
    backgroundBox.setTime(clock.getElapsedTime());
    cssLayout.updateObjects();
    renderer.render(scene, camera);
  }

  resize();
  function resize() {
    const [width, height] = threeResize(layout, renderer, camera);

    cssLayout.fitCamera(camera, "cover");
    backgroundBox.setResolution(width, height);
  }

  window.onresize = resize;
};

// HMR reset
export const disposeScene = () => {
  renderer.domElement.remove();

  renderer.setAnimationLoop(null);
  renderer.dispose();

  scene.clear();
  backgroundBox.dispose();
};
