<script setup lang="ts" name="BlogApp">
import { nextTick, watch, ref } from 'vue'
import Theme from 'vitepress/theme'
import { useRoute, useData } from 'vitepress'
import BlogHomeInfo from './BlogHomeInfo.vue'
import BlogHomeBanner from './BlogHomeBanner.vue'
import BlogList from './BlogList.vue'
import BlogComment from './BlogComment.vue'
import BlogSidebar from './BlogSidebar.vue'
import BlogImagePreview from './BlogImagePreview.vue'
import BlogArticleAnalyze from './BlogArticleAnalyze.vue'
import { useBlogThemeMode } from '../composables/config/blog'
import { DigitalPaRain } from '../plugins/DigitalRain'

const route = useRoute()
const digitalRainRef = ref<HTMLCanvasElement>()

const { isDark } = useData()

const isBlogTheme = useBlogThemeMode()
const { Layout } = Theme
const DigitalPaRainRef = ref()
watch(
  () => route,
  (val) => {
    if (val.data.frontmatter.layout === 'home') {
      nextTick(() => {
        if (!digitalRainRef.value) return
        if (isDark.value) {
          DigitalPaRainRef.value = new DigitalPaRain({
            el: digitalRainRef.value,
            bgColor: 'rgba(27, 27,31,0.06)'
          })
        } else {
          DigitalPaRainRef.value = new DigitalPaRain({
            el: digitalRainRef.value,
            bgColor: 'rgba(238,238,238,0.06)'
          })
        }
      })
    }
  },
  {
    immediate: true,
    deep: true
  }
)

watch(
  () => isDark.value,
  (val) => {
    if (val) {
      nextTick(() => {
        if (digitalRainRef.value) {
          DigitalPaRainRef.value.setBgColor('rgba(27, 27,31,0.06)')
          DigitalPaRainRef.value.run()
        }
      })
    } else {
      nextTick(() => {
        if (digitalRainRef.value) {
          DigitalPaRainRef.value.setBgColor('rgb(238,238,238,0.06)')
          DigitalPaRainRef.value.run()
        }
      })
    }
    console.log('val :>> ', val)
  }
)
</script>

<template>
  <Layout>
    <template #doc-before>
      <!-- 阅读时间分析 -->
      <ClientOnly>
        <BlogArticleAnalyze />
      </ClientOnly>
      <!-- 图片预览 -->
      <BlogImagePreview />
    </template>

    <!-- 自定义首页 -->
    <template #home-hero-before v-if="isBlogTheme">
      <div class="home">
        <div class="header-banner">
          <BlogHomeBanner />
        </div>
        <div class="content-wrapper">
          <div class="blog-list-wrapper">
            <BlogList />
          </div>
          <div class="blog-info-wrapper">
            <BlogHomeInfo />
          </div>
        </div>
      </div>
    </template>

    <template #home-hero-after>
      <canvas ref="digitalRainRef" id="digital-rain"></canvas>
    </template>

    <template #sidebar-nav-after v-if="isBlogTheme">
      <BlogSidebar />
    </template>
    <!-- 评论 -->
    <template #doc-after>
      <BlogComment />
    </template>
  </Layout>
</template>
<style scoped lang="scss">
.home {
  margin: 0 auto;
  padding: 20px;
  max-width: 1126px;
}

@media screen and (min-width: 960px) {
  .home {
    padding-top: var(--vp-nav-height);
  }
}

.header-banner {
  width: 100%;
  padding: 60px 0;
}

.content-wrapper {
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.blog-list-wrapper {
  width: 100%;
}

.blog-info-wrapper {
  margin-left: 16px;
  position: sticky;
  top: 100px;
}

@media screen and (max-width: 959px) {
  .blog-info-wrapper {
    margin-left: 16px;
    position: sticky;
    top: 40px;
  }
}

@media screen and (max-width: 767px) {
  .content-wrapper {
    flex-wrap: wrap;
  }

  .blog-info-wrapper {
    margin: 20px 0;
    width: 100%;
  }
}
</style>
