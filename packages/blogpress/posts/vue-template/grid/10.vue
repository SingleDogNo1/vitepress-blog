<template>
  <div class="grid-demo-wrapper">
    <div v-for="i in 9" :key="i" class="grid-item">{{ i }}</div>
  </div>
</template>

<style lang="scss" scoped>
.grid-demo-wrapper {
  display: grid;
  height: 300px;
  grid-template-columns: [c1] 100px [c2] 100px [c3] auto [c4];
  grid-template-rows: [r1] 100px [r2] 100px [r3] auto [r4];
}
</style>
