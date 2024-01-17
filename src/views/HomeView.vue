<script setup>
import HomeItem from '../components/HomeItem.vue';
import { gridItems } from '../data/items';
</script>

<template>
  <section class="content">
    <HomeItem
      v-for="(item, index) in gridItems"
      :key="index"
      :title="item.title"
      :pretitle="item.pretitle"
      :description="item.description"
      :img="item.img"
      :aspect="item.aspect"
      :index="index"
    />
  </section>
</template>

<style scoped>
.content {
  --column-gap: 2rem;
  --row-gap: 10vh;
  --mwidth: 400px;
  --columns: 3;

  display: grid;
  max-width: calc(
    var(--mwidth) * var(--columns) + (var(--columns) - 1) * var(--column-gap)
  );
  width: 100%;
  margin: 0 auto;
  grid-template-columns: repeat(
    auto-fill,
    minmax(calc(var(--mwidth) / 2), var(--mwidth))
  );
  grid-column-gap: var(--column-gap);
  grid-row-gap: var(--row-gap);
  justify-content: center;
  padding: 4rem 0 20rem;
  margin-top: 13rem;
}
</style>
