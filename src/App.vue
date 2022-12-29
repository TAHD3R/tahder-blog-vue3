<template>
  <n-config-provider
    :theme="darkTheme"
    :locale="zhCN"
    :date-locale="dateZhCN"
  >
    <n-loading-bar-provider>
      <n-message-provider>
        <n-notification-provider>
          <n-global-style />
          <navbar />
          <div
            class="mx-4 my-4 sm:mx-8 sm:my-8 md:mx-8 lg:mx-16 xl:mx-32"
          >
            <router-view />
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

import navbar from "./components/navbar.vue";

import { get_banner } from "./api/website";
import { get_articles, get_articles_hot } from "./api/posts";
import { get_messages } from "./api/users";
// Pinia 状态管理
import { useStore } from "./store";

const store = useStore();

onMounted(() => {
  // 获取数据
  get_banner()
    .then((res_banner) => {
      store.banner = res_banner.data.data;
      get_articles().then((res_articles) => {
        store.articles = res_articles.data.data;
        store.pages = res_articles.data.extra.pages;
        store.hasNextPage = res_articles.data.extra.has_next;
      });
      get_articles_hot().then((res_hot) => {
        store.articles_hot = res_hot.data.data;
        store.hasHotArticles = true;
        get_messages().then((res_msg) => {
          if (res_msg.data.data) {
            store.messages = res_msg.data.data;
            store.messageTotal = res_msg.data.data[0].total;
          }
        });
      });
    })
    .catch((err) => {
      console.log("数据拉取失败");
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
