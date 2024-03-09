<template>
  <b>
    <v-icon name="bi-textarea-resize" :scale="1.2" />
    <u>Object fit</u>
    <i>
      {{ objectFit }}
      <v-icon class="r" name="md-arrowbackiosnew-round" :scale="0.8" />
    </i>
    <select v-model="objectFit">
      <option v-for="ratio in types" :value="ratio">{{ ratio }}</option>
    </select>
  </b>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { setLayoutObjectFit } from '../Three';

const { index } = defineProps<{ index: number }>()

const objectFit = ref<"cover" | "contain" | "fill">("fill");
const types = ["fill", "cover", "contain"];

watch([objectFit], () => {
  setLayoutObjectFit(index, objectFit.value);
});
</script>
