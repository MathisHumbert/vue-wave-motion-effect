<script setup>
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import FontFaceObserver from 'fontfaceobserver';
import imagesLoaded from 'imagesloaded';
import * as THREE from 'three';

import Three from './components/Three.vue';
import Frame from './components/Frame.vue';

const loading = ref(true);
const loadedTextures = ref({});

const fontPragmaticaExtended = new Promise((resolve) => {
  new FontFaceObserver('pragmatica-extended').load().then(() => {
    resolve();
  });
});

const fontVorticeConcept = new Promise((resolve) => {
  new FontFaceObserver('vortice-concept').load().then(() => {
    resolve();
  });
});

const preloadImages = new Promise((resolve) => {
  imagesLoaded(document.querySelectorAll('img'), { background: true }, resolve);
});

const textureLoader = new THREE.TextureLoader();

const textureUrls = [
  'img/img-01.jpg',
  'img/img-02.jpg',
  'img/img-03.jpg',
  'img/img-04.jpg',
  'img/img-05.jpg',
  'img/img-06.jpg',
  'img/img-07.jpg',
  'img/img-08.jpg',
  'img/img-09.jpg',
  'img/slideshow-01.jpeg',
  'img/slideshow-02.jpeg',
  'img/slideshow-03.jpeg',
  'img/slideshow-04.jpeg',
  'img/disp-02.png',
];

const loadTextures = Promise.all(
  textureUrls.map(
    (url) =>
      new Promise((resolve) => {
        textureLoader.load(url, (texture) => {
          loadedTextures.value[url] = texture;
          resolve(texture);
        });
      })
  )
);

Promise.all([
  fontPragmaticaExtended,
  fontVorticeConcept,
  preloadImages,
  loadTextures,
]).then(() => {
  document.body.classList.remove('loading');
  loading.value = false;
});
</script>

<template>
  <Frame />
  <RouterView />
  <Three v-if="!loading" :textures="loadedTextures" />
</template>

<style scoped>
canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
}
</style>
