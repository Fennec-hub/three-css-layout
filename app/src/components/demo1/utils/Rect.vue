<template>
  <div ref="cell" :class="pop" :style="{ transform }" v-on-click-outside="reset" />
</template>

<script lang="ts" setup>
import { nextTick, ref } from 'vue';
import { vOnClickOutside } from '@vueuse/components';

const popup = defineModel<string>('popup');
const animation = defineModel<string>('animation');

const cell = ref<HTMLElement>();
const pop = ref<string>("");
const transform = ref<string>("");

/* const setPopup = async () => {
  if (reset()) return;

  const element = cell.value!;
  const parent = element.parentElement!;

  pop.value = "pop";

  animation.value = "none";
  await nextTick();
  popup.value = "popup pop";

  const { width: mainWidth, height: mainHeight, top: mainTop, left: mainLeft } = parent!.getBoundingClientRect();
  const { width, height, top, left } = element.getBoundingClientRect();

  const scale = Math.min(mainWidth * 0.7 / width, mainHeight * 0.7 / height);

  transform.value = `translate3d(${(mainLeft + mainWidth / 2) - (left + width / 2)}px, ${(mainTop + mainHeight / 2) - (top + height / 2)}px, 5px) scale(${scale}, ${scale})`;
} */

const reset = () => {
  if (popup.value) {
    transform.value = "";
    setTimeout(() => {
      popup.value = ""
      pop.value = "";
    }, 500);
    popup.value = "popup";
    return true;
  }

  return false;
}
</script>
