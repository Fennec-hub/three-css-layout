<template>
  <div id="demo3">

    <nav class="container header">
      <b class="logo">
        <v-icon class="r" name="io-barbell-outline" :scale="2" />
        DoYouEvenLift
      </b>
      <i>Collections</i>
      <i>Fabrics</i>
      <i>Offers</i>
      <i>Contact</i>
      <u class="actionButton">Do You Even lift?</u>
    </nav>

    <header class="container">
      <div>
        <h2>Yellow is the new Orange</h2>
        <p>
          Dive into a world of vibrant warmth with our stunning yellow sofas. Embrace bold and bright living, where
          every
          moment is a splash of sunshine.
        </p>
      </div>

      <div id="iphone" class="three" />
    </header>

    <main class="container">

    </main>

    <footer class="container">
    </footer>

    <i id="background" />

  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted } from 'vue';
import { initScene, disposeScene } from './three';

onMounted(() => initScene());
onBeforeUnmount(disposeScene);
</script>

<style src="./style/index.css" lang="postcss" />