<template>
  <div class="grid-demo-wrapper">
    <div v-for="i in 6" :key="i" class="grid-item" :class="'item' + i">{{ i }}</div>
  </div>
</template>

<style lang="scss" scoped>
.grid-demo-wrapper {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;

  .item1 {
    grid-area: 1 / 1 / 3 / 3;
  }
}
</style>
