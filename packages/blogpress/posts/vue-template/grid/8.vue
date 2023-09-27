<template>
  <div class="grid-demo-wrapper">
    <div v-for="i in 3" :key="i" class="grid-item">{{ i }}</div>
  </div>
</template>

<style lang="scss" scoped>
.grid-demo-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr minmax(100px, 1fr);
  grid-template-rows: repeat(1, 100px);
}
</style>
