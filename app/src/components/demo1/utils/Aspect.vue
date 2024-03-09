<template>
  <b>
    <v-icon name="md-aspectratio-round" :scale="1.2" />
    <u>Aspect</u>
    <i>
      {{ aspect }}
      <v-icon class="r" name="md-arrowbackiosnew-round" :scale="0.8" />
    </i>
    <select v-model="aspect">
      <option v-for="ratio in aspects" :value="ratio">{{ ratio }}</option>
    </select>
  </b>
</template>

<script lang="ts" setup>
const aspect = defineModel<string>();
const aspects = ["9/21", "9/18", "9/16", "1/1", "5/4", "4/3", "3/2", "16/9", "18/9", "21/9"];
</script>
