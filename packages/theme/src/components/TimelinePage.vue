<template>
  <ul>
    <li
      v-for="(wiki, index) in wikiList"
      :key="wiki.route"
      :style="{
        '--accent-color': [
          'var(--vp-c-tip-1)',
          'var(--vp-c-warning-1)',
          'var(--vp-c-important-1)',
          'var(--vp-c-danger-1)',
          'var(--vp-c-success-1)',
        ][index % 5]
      }"
      @click="toDetail(wiki.route)"
    >
      <div class="date">{{ formatDate(wiki.meta.date) }}</div>
      <div class="title">{{ wiki.meta.title }}</div>
      <div class="desc">
        <div class="content">
          {{ wiki.meta.description }}
        </div>
        <div v-if="wiki.meta.cover" class="cover">
          <img :src="wiki.meta.cover" :alt="wiki.meta.title">
        </div>
      </div>
    </li>
  </ul>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useArticles } from '../composables/config/blog'
import dayjs from 'dayjs'
import { useRouter } from 'vitepress'

const docs = useArticles()
const router = useRouter()

const wikiList = computed(() => {
  const topList = docs.value.filter((v) => !v.meta.hidden && !!v.meta.top)
  topList.sort((a, b) => {
    const aTop = a?.meta?.top
    const bTop = b?.meta.top
    return Number(aTop) - Number(bTop)
  })
  const data = docs.value.filter(
    (v) => v.meta.date && v.meta.title && !v.meta.top && !v.meta.hidden
  )
  data.sort((a, b) => +new Date(b.meta.date) - +new Date(a.meta.date))
  return topList.concat(data)
})

function formatDate(date: string) {
  return dayjs(date).format('YYYY-MM-DD')
}

function toDetail(route: string) {
router.go(route)
}

</script>

<style scoped>
ul {
  --col-gap: 2rem;
  --row-gap: 2rem;
  --line-w: 0.25rem;
  display: grid;
  grid-template-columns: var(--line-w) 1fr;
  grid-auto-columns: max-content;
  column-gap: var(--col-gap);
  list-style: none;
  width: min(60rem, 90%);
  margin-inline: auto;
}

/* line */
ul::before {
  content: "";
  grid-column: 1;
  grid-row: 1 / span 20;
  background: var(--vp-c-gray-1);
  border-radius: calc(var(--line-w) / 2);
}

/* columns*/

/* row gaps */
ul li:not(:last-child) {
  margin-bottom: var(--row-gap);
}

/* card */
ul li {
  cursor: pointer;
  grid-column: 2;
  --inlineP: 1.5rem;
  margin-inline: var(--inlineP);
  grid-row: span 2;
  display: grid;
  grid-template-rows: min-content min-content min-content;
}

/* date */
ul li .date {
  --dateH: 3rem;
  height: var(--dateH);
  margin-inline: calc(var(--inlineP) * -1);

  text-align: center;
  background-color: var(--accent-color);

  color: var(--vp-c-white);
  font-size: 1.25rem;
  font-weight: 700;

  display: grid;
  place-content: center;
  position: relative;

  border-radius: calc(var(--dateH) / 2) 0 0 calc(var(--dateH) / 2);
}

/* date flap */
ul li .date::before {
  content: "";
  width: var(--inlineP);
  aspect-ratio: 1;
  background: var(--accent-color);
  background-image: linear-gradient(rgb(from var(--vp-c-neutral) r g b / 0.2) 100%, transparent);
  position: absolute;
  top: 100%;
  clip-path: polygon(0 0, 100% 0, 0 100%);
  right: 0;
}

/* circle */
ul li .date::after {
  content: "";
  position: absolute;
  width: 2rem;
  aspect-ratio: 1;
  background: var(--vp-c-bg-alt);
  border: 0.3rem solid var(--accent-color);
  border-radius: 50%;
  top: 50%;
  transform: translate(50%, -50%);
  right: calc(100% + var(--col-gap) + var(--line-w) / 2);
}

/* title desc */
ul li .title,
ul li .desc {
  background: var(--vp-c-bg-alt);
  position: relative;
  padding-inline: 1.5rem;
}

ul li .title {
  overflow: hidden;
  padding-block-start: 1.5rem;
  padding-block-end: 1rem;
  font-weight: 500;
}

ul li .desc {
  padding-block-end: 1.5rem;
  font-weight: 400;
  display: flex;
  gap: 12px;

  .content {
    flex: 1;
  }
  .cover {
    width: 60px;
    height: 60px;
  }
}

ul li:nth-child(even) .desc {
  flex-direction: row-reverse;
}

/* shadows */
ul li .title::before,
ul li .desc::before {
  content: "";
  position: absolute;
  width: 90%;
  height: 0.5rem;
  background: rgb(from var(--vp-c-neutral) r g b / 0.5);
  left: 50%;
  border-radius: 50%;
  filter: blur(4px);
  transform: translate(-50%, 50%);
}

ul li .title::before {
  bottom: calc(100% + 0.125rem);
}

ul li .desc::before {
  z-index: -1;
  bottom: 0.25rem;
}

@media (min-width: 40rem) {
  ul {
    grid-template-columns: 1fr var(--line-w) 1fr;
  }

  ul::before {
    grid-column: 2;
  }

  ul li:nth-child(odd) {
    grid-column: 1;
  }

  ul li:nth-child(even) {
    grid-column: 3;
  }

  /* start second card */
  ul li:nth-child(2) {
    grid-row: 2/4;
  }

  ul li:nth-child(odd) .date::before {
    clip-path: polygon(0 0, 100% 0, 100% 100%);
    left: 0;
  }

  ul li:nth-child(odd) .date::after {
    transform: translate(-50%, -50%);
    left: calc(100% + var(--col-gap) + var(--line-w) / 2);
  }

  ul li:nth-child(odd) .date {
    border-radius: 0 calc(var(--dateH) / 2) calc(var(--dateH) / 2) 0;
  }
}
</style>