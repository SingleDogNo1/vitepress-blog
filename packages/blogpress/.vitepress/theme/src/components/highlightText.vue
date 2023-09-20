<template>
  <span style="color: var(--vp-badge-tip-text); font-weight: bold">
    {{ msg }}
  </span>
</template>

<script setup lang="ts">
defineProps({
  msg: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.action {
  margin: 1.8rem auto;
  text-align: center;
}

.nav-link {
  display: inline-block;
  font-size: 1.2rem;
  color: #fff;
  background-color: #3eaf7c;
  padding: 0.3rem 2rem;
  border-radius: 4px;
  transition: background-color 0.1s ease;
  box-sizing: border-box;
  border-bottom: 1px solid #389d70;
}
</style>
