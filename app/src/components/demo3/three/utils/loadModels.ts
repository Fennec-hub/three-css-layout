/**
 ** MODELS
 * -1 aiPhone 15 Pro - Low Poly smartphone
 *    link: https://sketchfab.com/3d-models/aiphone-15-pro-low-poly-smartphone-a3f10f0cc893468e85f454d4d5486e99
 *    Author: [hysokana](https://sketchfab.com/hysokana)
 *    license: CC Attribution-NonCommercial
 *
 * -2 Little Gym Stuff - Kettlebell
 *    link: https://sketchfab.com/3d-models/little-gym-stuff-kettlebell-925d98d9ba764e2186980b0d3da65fa2
 *    Author: [AJVFX](https://sketchfab.com/ajvisualeffects)
 *    license: CC Attribution
 *
 * -3 Little Gym Stuff - Dumbbell
 *    link: https://sketchfab.com/3d-models/little-gym-stuff-dumbbell-17f0629f7a714cfc8821e45ecbf5d273
 *    Author: [AJVFX](https://sketchfab.com/ajvisualeffects)
 *    license: CC Attribution
 *
 ** SCREEN MOCKUP
 *  dribbble: https://dribbble.com/shots/14001415-Workout-Fitness-Concept-App
 *  Author: [Uğur Yabar](https://dribbble.com/shots/14001415-Workout-Fitness-Concept-App)
 *  license: Sent an email, waiting for the answer. I hope they don't mind.
 */

import type { CSSLayout } from "@lib/CSSLayout";
import { loadModel } from "@/threeUtils/loadModel";
import { CSSLayoutObject } from "@lib/CSSLayoutObject";
import {
  type Texture,
  type Mesh,
  type MeshBasicMaterial,
  type PerspectiveCamera,
  MathUtils,
} from "three";

export const loadModels = (cssLayout: CSSLayout, camera: PerspectiveCamera) => {
  let map: Texture | null;

  loadModel("aiphone_15_pro_-_low_poly_smartphone/scene.gltf").then((phone) => {
    if (!phone) return;

    // set texture repeat/offset
    map = (
      (phone.getObjectByName("BasePhone_Screen_0") as Mesh)
        .material as MeshBasicMaterial
    ).map!;

    map.repeat.set(1, 0.25);

    loadModel("little_gym_stuff_-_dumbbell/scene.gltf").then((dumbbell) => {
      if (!dumbbell) return;

      dumbbell.scale.setScalar(0.0025);
      dumbbell.position.set(0.05, 0.05, -0.02);
      dumbbell.rotation.set(
        0,
        MathUtils.degToRad(-15),
        MathUtils.degToRad(-15)
      );
      phone.add(dumbbell);
    });

    loadModel("little_gym_stuff_-_kettlebell/scene.gltf").then((kettleBell) => {
      if (!kettleBell) return;

      kettleBell.scale.setScalar(0.004);
      kettleBell.position.set(-0.05, -0.05, 0.02);
      kettleBell.rotation.set(
        0,
        MathUtils.degToRad(-15),
        MathUtils.degToRad(-10)
      );
      phone.add(kettleBell);
    });

    const cssLayoutPhone = new CSSLayoutObject("#iphone", "contain");
    cssLayoutPhone.add(phone);
    cssLayout.add(cssLayoutPhone);
    cssLayout.fitCamera(camera, "cover");
  });

  // screen slider animation
  const interval = 2.5;
  let offset = 0;
  let lastTime = 0;
  return {
    animateModel: (elapsedTime: number) => {
      if (!map) return;

      const progress = (elapsedTime % interval) / interval;

      if (progress > 0 && elapsedTime - lastTime >= interval) {
        offset -= 0.25;
        lastTime = elapsedTime;
      }

      map.offset.y = MathUtils.lerp(map.offset.y, offset, progress);
    },
  };
};
