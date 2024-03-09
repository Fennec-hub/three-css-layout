<template>
  <s @click="toggle">
    <i><v-icon :name="fit === 'camera' ? `md-aspectratio-round` : `bi-camera-reels-fill`" :scale="1.1" /></i>
    Fit {{ fit === 'camera' ? 'Planes' : 'Camera' }}
  </s>
</template>

<script lang="ts" setup>
const fit = defineModel<"camera" | "planes">();
const toggle = () => fit.value = fit.value === "camera" ? "planes" : "camera";
</script>