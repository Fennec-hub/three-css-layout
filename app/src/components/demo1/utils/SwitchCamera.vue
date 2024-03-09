<template>
  <b @click="toggle">
    <v-icon name="bi-camera-reels-fill" :scale="1.2" />
    <u>
      {{ camera }}
    </u>
  </b>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { switchCamera } from '../Three';

const camera = ref<"perspective" | "orthographic">("orthographic");
const toggle = () => {
  camera.value = camera.value === "perspective" ? "orthographic" : "perspective";
  switchCamera();
}
</script>