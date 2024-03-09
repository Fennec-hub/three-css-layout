<template>
  <div id="demo2">

    <nav class="container">
      <b class="logo">
        <v-icon class="r" name="gi-sofa" :scale="2" />
        <s>Yellow</s>Sofa
      </b>
      <i>Collections</i>
      <i>Fabrics</i>
      <i>Offers</i>
      <i>Contact</i>
      <u class="actionButton">Customize Your Sofa</u>
    </nav>

    <div class="container hero">
      <div>
        <h2>Yellow is the new Orange</h2>
        <p>
          Dive into a world of vibrant warmth with our stunning yellow sofas. Embrace bold and bright living, where
          every
          moment is a splash of sunshine.
        </p>
      </div>

      <div id="sofa1" class="three" />
    </div>

    <div class="banner">
      <div class="container">
        <nav>
          <u>
            <v-icon class="r" name="fa-swatchbook" :scale="2.5" />
            <i>Select your favorite Yellow</i>
            <b>Color</b>
          </u>
          <u>
            <v-icon class="r" name="la-money-bill-wave-solid" :scale="2.5" />
            <i>Us our quick quote tool.</i>
            <b>Get a Quote</b>
          </u>
          <u>
            <v-icon class="r" name="bi-calendar-event" :scale="2.5" />
            <i>Locate your timely delivery</i>
            <b>Ship now</b>
          </u>
        </nav>

        <b class="logo">
          <v-icon class="r" name="gi-sofa" :scale="2.5" />
          <s>Yellow</s>Sofa
        </b>

        <p>
          <b>YellowHue</b> sofas exude energetic warmth, uplifting moods with their vibrant hue. Rich tones brighten
          spaces, creating a cheerful centerpiece that positively impacts the overall ambiance.
        </p>

        <u class="actionButton">Customize Your Sofa</u>
      </div>
    </div>

    <div class="container hero">

      <div id="sofa2" class="three" />

      <div>
        <h2>It's not just a color – it's a statement</h2>

        <ul>
          <li>Yellow is brightness, creativity and innovation.</li>
          <li>Yellow is energy and positivity.</li>
          <li>Yellow is warm, inviting, cozy and comfortable.</li>
          <li>Yellow is eclectic, modern and minimalist.</li>
          <li>Yellow is bold, stands out with a strong character.</li>
          <li>Yellow is timeless, is tradition, is longevity.</li>
        </ul>
      </div>

    </div>

    <div class="container dots">
      .
    </div>

    <div class="container footer">
      <div>
        <div>
          <h4>Three CSS Layout</h4>
          <p>
            This demo was created using <b><a href="https://threejs.org/">Three.js</a></b> and <b><a href="#">Three CSS
                Layout</a></b>, a JavaScript tool designed to
            simplify
            the positioning and scaling of Three.js objects within HTML elements.
          </p>
          <h4>Links</h4>
          <p class="links">
            <a href="https://twitter.com/SaharianFennec"><b>𝕏</b> @SaharianFennec</a>
            <a href="#"><i><v-icon name="bi-github" /></i>GitHub</a>
            <a href="#"><i><v-icon name="la-npm" /></i>npm</a>
          </p>
        </div>
        <div>
          <h4>Acknowledgement</h4>

          <h4><v-icon name="si-sketchfab" /> Models</h4>
          <ul>
            <li>
              <a href="https://sketchfab.com/3d-models/ritchie-armchair-ochre-yellow-a2217ae834c74a90a439a3a6a09c4e8f">
                Ritchie Armchair, Ochre Yellow.
              </a>, by <a href="https://sketchfab.com/made-it">MADE.COM</a>, <b>CC-BY-NC</b>.
            </li>
            <li>
              <a href="https://sketchfab.com/3d-models/dylan-armchair-yolk-yellow-31ba136eb97b4129880ac9fb32288d5c">
                Dylan Armchair, Yolk Yellow.
              </a>, by <a href="https://sketchfab.com/made-it">MADE.COM</a>, <b>CC-BY-NC</b>.
            </li>
          </ul>

          <h4>
            <b><v-icon name="co-3d" /> Background shader</b>
          </h4>
          <p>
            <a href="https://www.shadertoy.com/view/WdlyRS">
              Voronoi Gradient
            </a> by <a href="https://www.shadertoy.com/user/gls9102">gls9102</a>
          </p>

          <h4>
            <b><v-icon name="bi-dribbble" /> Layout inspiration:</b>
          </h4>
          <p>
            <a href="https://dribbble.com/shots/17349281-Laundry-Professional-Landing-Page-Template">
              Professional Landing Page Template
            </a> by <a href="https://dribbble.com/arjunmakwana">Arjun</a>
          </p>


        </div>
      </div>
      <u />
    </div>

    <i id="background" />

  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted } from 'vue';
import { initScene, disposeScene } from './three';
onMounted(initScene);
onBeforeUnmount(disposeScene);
</script>

<style src="./style/index.css" lang="postcss" />