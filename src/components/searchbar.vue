<template>
  <n-spin :show="loading" size="small">
    <n-input
      size="large"
      v-model:value="searchVal"
      passively-activated
      @change="handleSearch"
      round
      placeholder="搜索文章"
    >
      <template #prefix>
        <n-icon :component="SearchIcon" />
      </template>
    </n-input>
  </n-spin>
</template>
<script setup lang="ts">
import { ref, nextTick } from "vue";
import { useMessage } from "naive-ui";
// Pinia 状态管理
import { useStore } from "../store";
import { useRouter } from "vue-router";
import { Search as SearchIcon } from "@vicons/ionicons5";

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
    if (res.data.code == 200) {
      store.searchResults = res.data.data;
      console.log(res);
      router.push({ name: "search", query: { keyword: searchVal.value } });
    } else {
      message.error(res.data.msg);
    }
  });

  loading.value = false;
  nextTick(() => {
    searchVal.value = null;
  });
}
</script>
