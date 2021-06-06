<template>
  <div id="app">
    <wc-stock-price></wc-stock-price>
    <wc-stock-finder v-if="showStockFinder"></wc-stock-finder>
    <button @click="showStockFinder = true">Show Finder</button>

    <github-stats username="savepong"></github-stats>
    <github-streak-stats username="savepong"></github-streak-stats>
    <github-top-langs langs-count="5"></github-top-langs>
    <wakatime-stats username="savepong"></wakatime-stats>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return { showStockFinder: false };
  },
  components: {},
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
