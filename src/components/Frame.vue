<template>
  <div class="frame">
    <div class="frame__title-wrap">
      <h1 class="frame__title">Wave Motion Effect</h1>
      <div class="frame__links">
        <a href="https://r3f-infinite-circular-gallery-codrops.vercel.app/"
          >Previous demo</a
        >
        <a href="https://tympanus.net/codrops/?p=48418">Article</a>
        <a href="https://github.com/MathisHumbert/vue-wave-motion-effect"
          >GitHub</a
        >
      </div>
    </div>
    <div class="frame__demos">
      <RouterLink to="/" class="frame__demo frame__demo--current"
        >demo 1</RouterLink
      >
      <RouterLink to="/slideshow" class="frame__demo">demo 2</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.frame {
  position: fixed;
  text-align: left;
  z-index: 100;
  top: 0;
  left: 0;
  display: grid;
  align-content: space-between;
  width: 100%;
  max-width: none;
  height: 100vh;
  padding: 3rem;
  background: none;
  pointer-events: none;
  grid-template-columns: 75% 25%;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    'title demos'
    '... ...'
    '... ...';
}

.frame__title-wrap {
  grid-area: title;
}

.frame__title {
  font-size: 1rem;
  margin: 0 0 1rem;
  font-weight: normal;
}

.frame__tagline {
  position: relative;
  margin: 0 0 0 1rem;
  padding: 0 0 0 1rem;
  opacity: 0.5;
}

.frame__demos {
  margin: 0;
  grid-area: demos;
  justify-self: end;
}

.frame__links {
  grid-area: links;
  padding: 0;
  justify-self: end;
}

.frame a {
  pointer-events: auto;
  white-space: nowrap;
}

.frame__links a:not(:last-child),
.frame__demos a:not(:last-child) {
  margin-right: 1rem;
}

.frame__demo--current,
.frame__demo--current:hover {
  color: var(--color-text);
}

@media screen and (max-width: 768px) {
  .frame__demo {
    margin-bottom: 0;
    grid-area: demos;
    justify-self: center;
  }

  .frame__links {
    padding: 0;
    grid-column: -1 / 1;
    grid-area: demos;
    gap: 0;
    text-decoration: none;
  }
}
</style>
