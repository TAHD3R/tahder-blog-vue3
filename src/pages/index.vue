<template>
  <!-- <n-alert
        title="温馨提示"
        type="info"
        class="flex sm:hidden mb-4 rounded-2xl"
        closable
      >
        移动端响应式布局优化中, 推荐前往PC端享受更完整体验。
      </n-alert> -->

  <banner />
  <n-grid
    cols="1 m:4"
    :x-gap="16"
    :y-gap="16"
    item-responsive
    responsive="screen"
    class="mt-4"
  >
    <n-grid-item span="0 m:1">
      <stats />
    </n-grid-item>
    <n-grid-item span="1 s:2">
      <n-grid
        cols="0 xs:1 m:0"
        class="mb-4 lg:mb-0"
        item-responsive
        responsive="screen"
      >
        <n-grid-item span="1 m:0">
          <searchbar />
        </n-grid-item>
      </n-grid>
      <articles :page="store.page" />
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
import { useStore } from "../store";

import banner from "~/components/banner.vue";
import hot from "~/components/hot.vue";
import about from "~/components/about.vue";
import copyrights from "~/components/copyrights.vue";
import articles from "~/components/articles.vue";
import searchbar from "~/components/searchbar.vue";
import stats from "~/components/stats.vue";

const store = useStore();
</script>
