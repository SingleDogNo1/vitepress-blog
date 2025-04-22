<template>
  <div class="comment" v-if="show" id="giscus-comment" data-pagefind-ignore="all" ref="commentEl">
    <el-affix
      :class="{ hidden: commentIsVisible }"
      class="comment-btn"
      target="#app"
      position="bottom"
      :offset="40"
    >
      <el-icon class="comment-icon" size="20" @click="handleScrollToComment">
        <Comment />
      </el-icon>
      <BackTop :right="-70" :top="-50" />
    </el-affix>
    <Giscus
      v-if="showComment"
      id="comments"
      :repo="commentConfig.repo"
      :repoId="commentConfig.repoId"
      :category="commentConfig.category"
      :categoryId="commentConfig.categoryId"
      :mapping="commentConfig.mapping || 'pathname'"
      :reactionsEnabled="'1'"
      :emitMetadata="'0'"
      :inputPosition="commentConfig.inputPosition || 'top'"
      :theme="isDark ? 'dark' : 'light'"
      :lang="commentConfig.lang || 'zh-CN'"
      :loading="commentConfig.loading || 'lazy'"
    />
  </div>
</template>
<script setup lang="ts">
import { useDark, useElementVisibility } from '@vueuse/core'
import { useData, useRoute } from 'vitepress'
import { computed, ref, watch } from 'vue'
import { ElAffix, ElIcon } from 'element-plus'
import { Comment } from '@element-plus/icons-vue'
import { useGiscusConfig } from '../composables/config/blog'
import BackTop from './BlogBackTop/index.vue'
import Giscus from '@giscus/vue';
import { type GiscusProps } from '@giscus/vue'

const { frontmatter } = useData()
const commentEl = ref(null)
const commentIsVisible = useElementVisibility(commentEl)

const handleScrollToComment = () => {
  document.querySelector('#giscus-comment')?.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  })
}
const giscusConfig = useGiscusConfig() as GiscusProps

const commentConfig = computed<GiscusProps>(() => {
  return giscusConfig
})

const show = computed(() => {
  if (frontmatter.value.comment === false) {
    return frontmatter.value.comment
  }
  if (!giscusConfig) {
    return giscusConfig
  }
  return (
    giscusConfig.repo && giscusConfig.repoId && giscusConfig.category && giscusConfig.categoryId
  )
})

const isDark = useDark({
  storageKey: 'vitepress-theme-appearance'
})

const route = useRoute()
const showComment = ref(true)
watch(
  () => route.path,
  () => {
    showComment.value = false
    setTimeout(() => {
      showComment.value = true
    }, 200)
  },
  {
    immediate: true
  }
)
</script>
<style scoped lang="scss">
.comment {
  width: 100%;
  text-align: center;
  padding: 40px 0;
}

.hidden {
  opacity: 0;
  pointer-events: none;
}

.comment-btn {
  :deep(.el-affix--fixed) {
    text-align: right;

    .comment-icon {
      position: absolute;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      color: var(--vp-c-brand-1);
      align-items: center;
      justify-content: center;
      background-color: var(--vp-c-bg);
      box-shadow: 0 0 12px var(--vp-c-gutter);
      cursor: pointer;
      z-index: 5;
      right: -70px;

      &:hover {
        box-shadow: 0 0 4px var(--vp-c-gutter);
      }
    }
  }
}

@media screen and (max-width: 1200px) {
  .comment-btn {
    :deep(.el-affix--fixed) {
      opacity: 0.7;

      .el-button {
        position: static;
      }
    }
  }
}
</style>