<template>
  <div class="grid-demo-wrapper">
    <div v-for="i in 9" :key="i" class="grid-item" :class="'item' + i">{{ i }}</div>
  </div>
</template>

<style lang="scss" scoped>
.grid-demo-wrapper {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;

  .item1 {
    grid-column-start: 2;
    grid-column-end: 4;
  }
  .item2 {
    grid-column-start: span 2;
  }

  grid-auto-rows: 50px;
}
</style>
