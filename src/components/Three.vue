<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import Canvas from '../three';

const { textures } = defineProps(['textures']);

const route = useRoute();

const canvasElement = ref(null);
const canvas = ref(null);

onMounted(() => {
  canvas.value = new Canvas({
    template: route.path,
    element: canvasElement.value,
    textures,
  });

  window.addEventListener('resize', () => {
    canvas.value.onResize();
  });
});

watch(route, () => {
  if (canvas.value) {
    canvas.value.onPageChange(route.path);
  }
});
</script>

<template>
  <canvas ref="canvasElement"></canvas>
</template>

<style scoped>
canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: -1;
}
</style>
