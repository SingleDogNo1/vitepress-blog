<template>
  <div class="grid-demo-wrapper">
    <div v-for="i in 10" :key="i" class="grid-item">{{ i }}</div>
  </div>
</template>

<style lang="scss" scoped>
.grid-demo-wrapper {
  width: 100%;
  height: 100px;
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  grid-template-rows: 33.33% 33.33% 33.33%;
}
</style>
