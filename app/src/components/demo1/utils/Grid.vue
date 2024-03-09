<template>
  <b>
    <v-icon name="bi-grid-1x2-fill" />
    <u>Layout</u>
    <i>
      {{ grid }}
      <v-icon class="r" name="md-arrowbackiosnew-round" :scale="0.8" />
    </i>
    <select v-model="grid">
      <option v-for="g in grids" :value="g">{{ g }}</option>
    </select>
  </b>
</template>

<script lang="ts" setup>
const grid = defineModel();
const grids = [
  ...Array(2).fill(null).map((_, i) => `flex-${i + 1}`),
  ...Array(6).fill(null).map((_, i) => `grid-${i + 1}`)
];
</script>