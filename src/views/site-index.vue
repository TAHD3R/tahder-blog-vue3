<template>
  <banner />
  <n-grid cols="1 m:4" :x-gap="16" :y-gap="16" item-responsive responsive="screen" class="mt-4">
    <n-grid-item span="1 s:3">
      <n-grid cols="0 xs:1 m:0" class="mb-4 lg:mb-0" item-responsive responsive="screen">
        <n-grid-item span="1 m:0">
          <searchbar />
        </n-grid-item>
      </n-grid>
      <articles :current-page="store.currentPage" />
    </n-grid-item>
    <n-grid-item span="1 m:1">
      <hot />
      <about />
      <copyrights />
    </n-grid-item>
  </n-grid>
</template>

<script setup lang="ts">
// Pinia 状态管理
import { useStore } from '../store';

import banner from '~/components/site-banner.vue';
import hot from '~/components/article-hothot.vue';
import about from '~/components/site-about.vue';
import copyrights from '~/components/site-copyrights.vue';
import articles from '~/components/article-list.vue';
import searchbar from '~/components/site-search.vue';

const store = useStore();
</script>
