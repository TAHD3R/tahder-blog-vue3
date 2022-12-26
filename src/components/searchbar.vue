<template>
  <n-spin
    :show="loading"
    size="small"
  >
    <n-popover
      trigger="click"
      :show="showPopover"
      :duration="500"
    >
      <template #trigger>
        <n-input
          v-model:value="searchVal"
          size="large"
          passively-activated
          round
          placeholder="搜索文章"
          @change="handleSearch"
        >
          <template #prefix>
            <n-icon :component="SearchIcon" />
          </template>
        </n-input>
      </template>
      <span>没有找到搜索内容</span>
    </n-popover>
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
const showPopover = ref(false);

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
      //   message.error(res.data.msg);
      showPopover.value = true;
    }
  });

  setTimeout(() => {
    showPopover.value = false;
  }, 2000);

  nextTick(() => {
    loading.value = false;
    searchVal.value = null;
  });
}
</script>
