<template>
  <n-config-provider :theme="darkTheme" :locale="zhCN" :date-locale="dateZhCN">
    <n-loading-bar-provider>
      <n-message-provider>
        <n-notification-provider>
          <n-global-style />
          <navbar></navbar>
          <div class="m-4 sm:m-8 md:16">
            <router-view></router-view>
          </div>

          <n-back-top :right="36" />
        </n-notification-provider>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { darkTheme, zhCN, dateZhCN } from "naive-ui";

import navbar from "~/components/navbar.vue";

import { get_banner } from "./api/banner";
import { get_articles, get_articles_hot } from "./api/posts";
// Pinia 状态管理
import { useStore } from "./store";

const store = useStore();

onMounted(() => {
  // 获取数据
  get_banner()
    .then((res) => {
      store.banner = res.data.data;
      get_articles().then((res) => {
        store.articles = res.data.data;
      });
      get_articles_hot().then((res) => {
        store.articles_hot = res.data.data;
        store.hasHotArticles = true;
      });
    })
    .catch((err) => {
      console.log("数据拉取失败")
    });
});
</script>

<style>
.n-card {
  --n-border-radius: 16px !important;
}
.body {
  background-color: #101012;
}
.n-list.n-list--bordered .n-list-item,
.n-list.n-list--hoverable .n-list-item {
  padding: 8px 8px;
}

.n-modal-mask {
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(24px);
}
</style>
