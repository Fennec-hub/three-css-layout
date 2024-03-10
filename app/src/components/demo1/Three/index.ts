import {
  Mesh,
  OrthographicCamera,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { CSSLayout } from "@lib/CSSLayout";
import { CSSLayoutObject } from "@lib/CSSLayoutObject";
import { setSceneLights } from "./utils/setSceneLights";
import { CSSLayoutObjectFit } from "@lib/types";
import { getMaterials } from "./utils/getMaterials";
import { getPrimitives } from "@/threeUtils/getPrimitives";
import { threeResize } from "@/threeUtils/onResize";

let container: HTMLElement;

const cssLayouts: {
  cssLayout: CSSLayout;
  fitType: "camera" | "plane";
  objectFit: CSSLayoutObjectFit;
  scroll: boolean;
  plane?: [width: number, height: number];
}[] = [];

const perspCamera = new PerspectiveCamera();
const orthoCamera = new OrthographicCamera();
let camera: OrthographicCamera | PerspectiveCamera = perspCamera;
let orbit: OrbitControls;

let renderer = new WebGLRenderer({ antialias: true });
const scene = new Scene();
setSceneLights(scene);

const geometries = getPrimitives();
const materials = getMaterials();

export const initScene = () => {
  container = document.querySelector<HTMLElement>("#three .layout")!;

  container.appendChild(renderer.domElement);
  renderer.setClearAlpha(0);
  renderer.setAnimationLoop(animation);

  orbit && orbit.dispose();
  orbit = new OrbitControls(camera, renderer.domElement);

  function animation() {
    renderer.render(scene, camera);
    updateLayoutElements();
  }

  window.onresize = resize;
  resize();
};

export const setTargetLayouts = (planes?: [number, number][]) => {
  const layoutElements =
    document.querySelectorAll<HTMLElement>(".target .layout");

  clearLayouts();

  if (planes) {
    const positions: [number, number, number][] = [
      [0, 4, 0],
      [-4.5, -4, 0],
      [4.5, -4, 0],
    ];
    layoutElements.forEach((layoutElement, i) => {
      const layout = createCSSLayout(
        layoutElement,
        "plane",
        "fill",
        false,
        planes![i],
        i
      );

      layout.position.fromArray(positions[i]);
    });
  } else createCSSLayout(layoutElements[0], "camera", "fill");

  cssLayoutsFitAll();
};

export const clearLayouts = () => {
  cssLayouts.forEach(({ cssLayout }) => scene.remove(cssLayout));
  cssLayouts.length = 0;
};

export const createCSSLayout = (
  layout: HTMLElement,
  fitType: "camera" | "plane",
  objectFit: CSSLayoutObjectFit,
  scroll: boolean = false,
  plane?: [width: number, height: number],
  index: number = 0
) => {
  const cssLayout = new CSSLayout(layout);

  layout
    .querySelectorAll<HTMLElement>(".layout > div")
    .forEach((element, i) => {
      const cssLayoutObject = new CSSLayoutObject(element);
      const mesh = new Mesh(
        geometries[i],
        i % 2
          ? materials[index].spiralMaterial
          : materials[index].stripeMaterial
      );
      cssLayoutObject.add(mesh);
      cssLayout.add(cssLayoutObject);
    });

  scene.add(cssLayout);
  cssLayouts.push({ cssLayout, fitType, objectFit, scroll, plane });

  return cssLayout;
};

const cssLayoutFit = (layout: (typeof cssLayouts)[number]) => {
  const { cssLayout, fitType, objectFit, scroll, plane } = layout;

  if (fitType === "camera") {
    cssLayout.fitCamera(camera, objectFit);
    cssLayout.scroll(scroll, cssLayout.domElement);
  } else {
    const [width, height] = plane!;
    cssLayout.fitPlane(width, height, objectFit);
    cssLayout.scroll(false);
  }
};

export const cssLayoutsFitAll = () =>
  cssLayouts.forEach((cssLayout) => cssLayoutFit(cssLayout));

export const updateLayoutElements = () => {
  cssLayouts.forEach(({ cssLayout }) => cssLayout.updateObjects());
};

export const setLayoutPlane = (
  index: number,
  width: number,
  height: number
) => {
  cssLayouts[index].plane = [width, height];
  cssLayoutFit(cssLayouts[index]);
};

export const setLayoutObjectFit = (
  index: number,
  objectFit: CSSLayoutObjectFit
) => {
  cssLayouts[index].objectFit = objectFit;
  cssLayoutFit(cssLayouts[index]);
};

export const setLayoutScroll = (index: number, scroll: boolean) => {
  cssLayouts[index].scroll = scroll;
  cssLayoutFit(cssLayouts[index]);
};

export const setLayoutColor = (index: number, color: string) => {
  materials[index].spiralMaterial.color.set(color);
  materials[index].stripeMaterial.color.set(color);
};

export const resize = () => {
  camera.near = 0.1;
  camera.far = 30;
  camera.position.z = 25;

  threeResize(container, renderer, camera);

  if (orbit) orbit.update();

  cssLayoutsFitAll();
};

export const switchCamera = () => {
  camera = camera === perspCamera ? orthoCamera : perspCamera;
  orbit.object = camera;
  resize();
};
