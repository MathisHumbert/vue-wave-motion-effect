<script setup>
const { title, pretitle, description, img, aspect, index } = defineProps([
  'title',
  'pretitle',
  'description',
  'img',
  'aspect',
  'index',
]);
</script>

<template>
  <article class="item">
    <figure class="item__fig">
      <div class="item__aspect" :style="{ paddingTop: aspect }"></div>
      <img :src="img" :alt="`img-0${index}`" class="item__img" />
    </figure>
    <span class="item__pretitle">{{ pretitle }}</span>
    <h2 class="item__title">{{ title }}</h2>
    <span class="item__counter">0{{ index + 1 }}</span>
    <p class="item__description">{{ description }}</p>
  </article>
</template>

<style scoped>
.item {
  padding: 2rem;
  align-self: flex-end;
  display: grid;
  grid-template-areas:
    '... ... ...'
    'pretitle pretitle pretitle'
    'title title title'
    '... counter counter'
    '... description ...';
  grid-template-columns: 10% 1fr 1rem;
  grid-template-rows: 3rem auto 1fr 2rem auto;
}

.item__fig {
  position: relative;
  max-width: 100%;
  grid-area: 1 / 2 / 4 / 3;
}

.item__img {
  position: absolute;
  left: 0;
  top: 0;
  max-width: 100%;
  opacity: 0;
}

.item__pretitle {
  grid-area: pretitle;
  font-size: 1rem;
  font-weight: 400;
  font-family: vortice-concept, sans-serif;
  color: var(--color-secondary);
  margin-bottom: 0.75rem;
  pointer-events: none;
}

.item__title {
  grid-area: title;
  font-size: 2.5rem;
  font-weight: 400;
  font-family: vortice-concept, sans-serif;
  -webkit-text-stroke: 1px var(--color-primary);
  -webkit-text-fill-color: transparent;
  pointer-events: none;
}

.item__counter {
  grid-area: counter;
  align-self: flex-end;
  justify-self: flex-end;
  font-size: 3rem;
  font-weight: 400;
  font-family: vortice-concept, sans-serif;
  color: var(--color-primary);
  pointer-events: none;
}

.item__description {
  grid-area: description;
  max-width: 200px;
  font-size: 0.85rem;
  color: var(--color-description);
  pointer-events: none;
}
</style>
