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
      <n-card title="塔格德的项目与工具库" hoverable>
        <n-space>
          <n-button>Clockwise计时</n-button>
          <n-button>Pomorodo番茄钟</n-button>
          <n-button>Blender作品集</n-button>
          <n-button>诗歌&文学作品</n-button>
          <n-button>影视鉴赏</n-button>
        </n-space>
        <template #action> 前往实验室探索更多秘密！ </template>
      </n-card>
    </n-grid-item>
    <n-grid-item span="1 s:2">
      <n-grid
        cols="0 s:1 m:0"
        :x-gap="16"
        class="mb-4"
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
import { ref } from "vue";
import { useMessage } from "naive-ui";
// Pinia 状态管理
import { useStore } from "../store";
import { useRouter } from "vue-router";
import { Search as SearchIcon } from "@vicons/ionicons5";
import banner from "~/components/banner.vue";
import hot from "~/components/hot.vue";
import about from "~/components/about.vue";
import copyrights from "~/components/copyrights.vue";
import articles from "~/components/articles.vue";
import searchbar from "~/components/searchbar.vue";

import { search } from "../api/posts";

const store = useStore();
const router = useRouter();
const message = useMessage();
const searchVal = ref<string | null>(null);
const loading = ref(false);

function handleSearch() {
  loading.value = true;

  let data = {
    query: searchVal.value,
  };

  search(data).then((res) => {
    store.searchResults = res.data.data;
    loading.value = false;
    router.push({ name: "search" });
  });
}
</script>
