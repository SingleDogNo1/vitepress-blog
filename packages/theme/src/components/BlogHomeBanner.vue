<template>
  <div>
    <h1>
      <span class="name">{{ name }}</span>
      <span class="motto" v-show="motto">{{ motto }}</span>
    </h1>
    <div class="inspiring-wrapper">
      <TypedComponent :options="typedOptions" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { type TypedOptions } from 'typed.js'
import { computed } from 'vue'
import { useData } from 'vitepress'
import { useBlogConfig } from '../composables/config/blog'
import TypedComponent from './Typed.vue'

const { site, frontmatter } = useData()
const { home } = useBlogConfig()

const name = computed(() => (frontmatter.value.blog?.name ?? site.value.title) || home?.name || '')
const motto = computed(() => frontmatter.value.blog?.motto || home?.motto || '')

const inspiringList = computed<string[]>(() => {
  return [
    ...new Set([frontmatter.value.blog?.inspiring, home?.inspiring].flat().filter((v) => !!v))
  ]
})

const typedOptions = computed<TypedOptions>(() => {
  return {
    strings: inspiringList.value,
    typeSpeed: 100,
    backDelay: 2000,
    startDelay: 1000,
    backSpeed: 100,
    loop: true,
  }
})
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;

  .name {
    transition: all 0.25s ease-in-out 0.04s;
    transform: translateY(0px);
    opacity: 1;
    font-weight: bold;
    margin: 0 auto;
    font-size: 36px;
  }

  .motto {
    position: relative;
    bottom: 0px;
    font-size: 14px;
    margin-left: 10px;

    &::before {
      content: '- ';
    }
  }
}

@media screen and (max-width: 500px) {
  .motto {
    display: none;
  }
}


.inspiring-wrapper {
  margin: 20px 0;
  height: 24px;
  width: auto;
  font-size: 20px;
  text-align: center;
}
</style>