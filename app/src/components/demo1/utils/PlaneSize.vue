<template>
  <b>
    <v-icon name="bi-textarea-resize" :scale="1.2" />
    <u>Plane Size</u>
    <i>
      X
      <input type="number" v-model.number.lazy="width" @input="update" />
    </i>
    <i>
      Y
      <input type="number" v-model.number.lazy="height" @input="update" />
    </i>
  </b>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { setLayoutPlane } from '../Three';

const { index } = defineProps<{ index: number }>()

const width = ref<number>(5);
const height = ref<number>(5);

const update = () =>
  setLayoutPlane(index, width.value, height.value);
</script>
