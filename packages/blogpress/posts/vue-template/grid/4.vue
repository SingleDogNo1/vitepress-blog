<template>
  <div class="grid-demo-wrapper">
    <div v-for="i in 18" :key="i" class="grid-item">{{ i }}</div>
  </div>
</template>

<style lang="scss" scoped>
.grid-demo-wrapper {
  display: grid;
  grid-template-columns: repeat(2, 100px 80px 60px);
  grid-template-rows: repeat(3, 100px);
}
</style>
