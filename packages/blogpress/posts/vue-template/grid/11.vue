<template>
  <div class="grid-demo-wrapper">
    <div v-for="i in 9" :key="i" class="grid-item">{{ i }}</div>
  </div>
</template>

<style lang="scss" scoped>
.grid-demo-wrapper {
  display: grid;
  height: 300px;
  grid-template-columns: 100px 100px auto;
  grid-template-rows: 3, 100px 100px auto;
  row-gap: 20px;
  column-gap: 20px;
}
</style>
