<template>
  <span :style="style">{{ msg }}</span>
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue';

const props = defineProps({
  msg: {
    type: String,
    default: ''
  },
  color: {
    type: String as PropType<'primary' | 'success' | 'warning' | 'danger'>,
    default: 'primary'
  }
})

const style = computed(() => {
  const colorMap = {
    primary: 'var(--vp-badge-tip-text)',
    success: 'var(--vp-c-success-1)',
    warning: 'var(--vp-badge-warning-text)',
    danger: 'var(--vp-badge-danger-text)',
  }
  return {
    color: colorMap[props.color],
    fontWeight: 'bold'
  }
})
</script>
