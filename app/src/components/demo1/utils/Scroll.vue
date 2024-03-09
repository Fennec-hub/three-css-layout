<template>
  <b v-if="!fitPlane" :style="{ opacity: scroll.x || scroll.y ? 1 : 0.5 }">
    <v-icon name="bi-mouse-fill" :scale="1.25" />
    <u>Scroll</u>
    <i @click="toggleScroll('x')" :style="{ opacity: scroll.x ? 1 : 0.5 }">
      X
    </i>
    <i @click="toggleScroll('y')" :style="{ opacity: scroll.y ? 1 : 0.5 }">Y</i>
  </b>
</template>

<script lang="ts" setup>
import { nextTick } from 'vue';
import { setLayoutScroll } from '../Three';

const { index, fitPlane } = defineProps<{ index: number, fitPlane: boolean }>();
const scroll = defineModel<{ x: number, y: number }>({ required: true });

const toggleScroll = (axis: "x" | "y") => {
  scroll.value[axis] = !scroll.value[axis] ? 1 : 0;
  nextTick(() => setLayoutScroll(index, !!scroll.value.x || !!scroll.value.y));
};
</script>