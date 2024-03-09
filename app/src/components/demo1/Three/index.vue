<template>
  <div id="three" class="container">
    <header>
      <dropdown-menu>
        <template #trigger>
          <v-icon name="three" :scale="2" />
          Three.js
          <i>
            <v-icon class="r" name="md-arrowbackiosnew-round" :scale="0.8" />
          </i>
        </template>

        <template #body>
          <Aspect v-model="aspect" />
          <SwitchCamera />
        </template>
      </dropdown-menu>
    </header>

    <main :style="{ '--aspect': aspect }">
      <div class="layout" />
    </main>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, ref, watch } from 'vue';
import { initScene, setTargetLayouts, resize } from '.';
import Aspect from "../utils/Aspect.vue";
import SwitchCamera from "../utils/SwitchCamera.vue";

const fitType = defineModel<string>({ default: "camera" });

const aspect = ref<string>("1/1");

watch([aspect], () =>
  nextTick(resize)
);

watch([fitType], () => {
  const params: [number, number][] | undefined = fitType.value === "planes" ? Array(3).fill(null).map(() => [7, 7]) : undefined;
  nextTick(() => setTargetLayouts(params));
});

onMounted(() => {
  initScene();
  nextTick(setTargetLayouts)
});
</script>
