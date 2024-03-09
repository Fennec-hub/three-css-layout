<template>
  <b>
    <v-icon name="md-animation" />
    <u>Animation</u>
    <i>
      {{ animation }}
      <v-icon class="r" name="md-arrowbackiosnew-round" :scale="0.8" />
    </i>
    <select v-model="animation">
      <option v-for="anim in animations" :value="anim">{{ anim }}</option>
    </select>
  </b>
</template>

<script lang="ts" setup>
const animation = defineModel<string>();
const animations = ["none", "mixed", "float", "pulse", "bounce", "rotate", "drop"];
</script>


