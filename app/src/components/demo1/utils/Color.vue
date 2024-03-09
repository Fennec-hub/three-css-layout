<template>
  <b>
    <v-icon name="md-colorlens-round" :scale="1.25" />
    <u>Color</u>
    <i>
      <s :style="{ background: color }" />
      <input type="color" v-model="color" />
    </i>
  </b>
</template>

<script lang="ts" setup>
import { watchEffect } from 'vue';
import { setLayoutColor } from '../Three';

const { index } = defineProps<{ index: number }>();
const color = defineModel<string>({ required: true });

watchEffect(() => setLayoutColor(index, color.value));
</script>