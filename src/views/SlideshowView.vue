<script setup>
import { slideshowItems } from '../data/items';
</script>

<template>
  <div class="slideshow">
    <div class="slideshow__gallery">
      <div class="slideshow__gallery__aspect"></div>
      <img
        class="slideshow__gallery__img"
        v-for="(item, index) in slideshowItems"
        :key="index"
        :src="item"
        :alt="`slideshow-0${index + 1}`"
      />
    </div>
    <div class="slideshow__intro">
      <p class="slideshow__intro__subline">A new cyber movement</p>
      <h2 class="slideshow__intro__title">Mechanism</h2>
      <p class="slideshow__intro__description">
        “Your assumptions are your windows on the world. Scrub them off every
        once in a while, or the light won't come in.”
      </p>
    </div>
    <nav class="slideshow__nav">
      <p class="slideshow__nav__item current">Seoul</p>
      <p class="slideshow__nav__item">Bangkok</p>
      <p class="slideshow__nav__item">Taipei</p>
      <p class="slideshow__nav__item">Tokyo</p>
    </nav>
  </div>
</template>

<style scoped>
.slideshow {
  display: grid;
  width: 100%;
  height: 100vh;
  grid-template-columns: 90% 10%;
  grid-template-rows: auto auto;
}

.slideshow__intro {
  grid-area: 1 / 1 / 3 / 3;
  align-self: center;
  justify-self: center;
  position: relative;
}

.slideshow__intro__title {
  font-family: vortice-concept, sans-serif;
  font-weight: 400;
  font-size: 9vw;
  line-height: 0.5;
  margin: 5vw 0 0 0;
  -webkit-text-stroke: 2px var(--color-primary);
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.slideshow__intro__subline {
  text-align: center;
  width: 100%;
  display: block;
  color: var(--color-primary);
  font-size: 1.25rem;
}

.slideshow__intro__description {
  margin: 2rem 0 0 1rem;
  max-width: 300px;
}

.slideshow__gallery {
  position: relative;
  grid-area: 1 / 1 / 3 / 2;
  justify-self: end;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto;
  overflow: hidden;
  width: 47%;
}

.slideshow__gallery__aspect {
  padding-top: 133.33%;
}

.slideshow__gallery__img {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  max-width: 100%;
  height: 100%;
  object-fit: cover;
}

/* .slideshow__img--current {
  opacity: 1;
} */

.slideshow__nav {
  grid-area: 2 / 1 / 3 / 3;
  display: flex;
  flex-direction: row;
  /* flex-direction: column; */
  align-self: end;
  align-items: end;
  justify-content: space-between;
  padding: 2rem 3rem;
  z-index: 100;
}

.slideshow__nav__item {
  font-family: vortice-concept, sans-serif;
  font-weight: 400;
  color: var(--color-secondary);
  font-size: 1rem;
  cursor: pointer;
}

.slideshow__nav__item:hover {
  color: var(--color-link-hover);
}

.slideshow__nav__item.current {
  color: var(--color-link-hover);
}
</style>
