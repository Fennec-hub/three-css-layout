<template>
  <div id="demo1">
    <main ref="root" :class="{ overlap }">
      <div class="split" :class="[isPlanes ? 'plane' : '']">
        <Layout :index="0" :isPlanes="isPlanes" />
        <template v-if="isPlanes">
          <Layout :index="1" :isPlanes="isPlanes" />
          <Layout :index="2" :isPlanes="isPlanes" />
        </template>
      </div>
      <div class="split">
        <Three v-model="fitType" />
      </div>

      <FitType v-model="fitType" />
      <i v-show="!isPlanes" @click="overlap = !overlap">
        <v-icon :name="overlap ? `bi-arrows-angle-expand` : `bi-arrows-angle-contract`" />
      </i>
      <u />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import Layout from './Layout.vue';
import Three from './Three/index.vue';
import FitType from "./utils/FitType.vue";

const overlap = ref<boolean>(false);
const fitType = ref<"camera" | "planes">("camera");

const isPlanes = ref<boolean>(false);

watch([fitType], () => {
  isPlanes.value = fitType.value === "planes";
  if (isPlanes.value) overlap.value = false;
});
</script>

<style src="./style/index.css" lang="postcss" />