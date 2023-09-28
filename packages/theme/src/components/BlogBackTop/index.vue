<template>
  <transition name="backtop-fade-in">
    <div v-if="visible" :style="backTopStyle" class="backtop" @click.stop="handleClick">
      <el-icon color="currentColor" size="24">
        <Top />
      </el-icon>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { ElIcon } from 'element-plus'
import { computed } from 'vue'
import { Top } from '@element-plus/icons-vue'
import { backtopEmits, backtopProps } from './types'
import { useBackTop } from './use-backtop'

const props = defineProps(backtopProps)
const emit = defineEmits(backtopEmits)

const { handleClick, visible } = useBackTop(props, emit)

const backTopStyle = computed(() => ({
  top: `${props.top}px`,
  right: `${props.right}px`
}))
</script>

<style scoped lang="scss">
.backtop {
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: var(--vp-c-brand-1);
  background-color: var(--vp-c-bg);
  box-shadow: 0 0 12px var(--vp-c-gutter);
  cursor: pointer;
  z-index: 5;
  &:hover {
    box-shadow: 0 0 4px var(--vp-c-gutter);
  }
}
</style>
