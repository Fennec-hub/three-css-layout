<template>
  <div class="container target">
    <header>
      <dropdown-menu>
        <template #trigger>
          <v-icon name="html5-css3" :scale="2.8" />
          <i>
            <v-icon class="r" name="md-arrowbackiosnew-round" :scale="0.8" />
          </i>
        </template>

        <template #body>
          <Animation v-model="animation" />
          <Grid v-model="grid" />
          <Aspect v-model="aspect" />
          <ObjectFit :index="index" />
          <PlaneSize v-if="isPlanes" :index="index" />
          <Color :index="index" v-model="color" />
          <Scroll v-model="scroll" :index="index" :fitPlane="isPlanes" />
        </template>
      </dropdown-menu>
    </header>

    <main ref="main" :style="{ '--aspect': aspect }">
      <div class="layout" :class="[animation, grid, popup, scroll.x || scroll.y ? 'scroll' : '']"
        :style="{ '--scale-x': scroll.x, '--scale-y': scroll.y, '--color': color }">
        <Rect class="rect" v-for="_ in 6" v-model:popup="popup" v-model:animation="animation" />
        <i />
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, ref, watch, watchEffect } from 'vue';
import { cssLayoutsFitAll } from './Three/index';

import Rect from "./utils/Rect.vue";
import Animation from "./utils/Animation.vue";
import Grid from "./utils/Grid.vue";
import Aspect from "./utils/Aspect.vue";
import Scroll from "./utils/Scroll.vue";
import ObjectFit from "./utils/ObjectFit.vue";
import PlaneSize from "./utils/PlaneSize.vue";
import Color from "./utils/Color.vue";

const { index, isPlanes } = defineProps<{ index: number, isPlanes: boolean }>();

const grid = ref<string>("grid-1");
const aspect = ref<string>("1/1");
const animation = ref<string>("mixed");
const scroll = ref<{ x: number, y: number }>({ x: 0, y: 0 });
const popup = ref<string>("");
const color = ref<string>(["#aaaaaa", "#d32f2f", "#50af58"][index]);

watch([aspect, animation, grid], () => nextTick(cssLayoutsFitAll));
watchEffect(() => {
  if (isPlanes)
    scroll.value = { x: 0, y: 0 };
});
</script>