<template>
  <div class="grid-demo-wrapper">
    <div v-for="i in 9" :key="i" class="grid-item">{{ i }}</div>
  </div>
</template>

<style lang="scss" scoped>
.grid-demo-wrapper {
  width: 300px;
  height: 300px;
  display: grid;
  grid-template-columns: repeat(3, 33.33%);
  grid-template-rows: repeat(3, 33.33%);
}
</style>
