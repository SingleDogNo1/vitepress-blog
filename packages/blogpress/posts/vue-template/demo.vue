<template>
  <div class="text">当前计数为：{{ count }}</div>
  <button @click="count++">点我</button>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(1)
</script>

<style scoped lang="scss">
.text {
  color: red;
  margin-bottom: 1rem;
}
</style>
