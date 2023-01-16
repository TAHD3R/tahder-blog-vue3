<template>
  <n-config-provider :theme="darkTheme" :locale="zhCN" :date-locale="dateZhCN" :theme-overrides="themeOverrides">
    <n-loading-bar-provider>
      <n-message-provider>
        <n-notification-provider>
          <n-global-style />
          <navbar />
          <div class="responsive-layout">
            <router-view />
          </div>
          <n-back-top :right="48" />
        </n-notification-provider>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { GlobalThemeOverrides, darkTheme, zhCN, dateZhCN } from 'naive-ui';

import { get_banner } from './api/website';
import { get_articles, get_articles_hot } from './api/posts';
import { get_messages } from './api/users';

import navbar from './components/site-navbar.vue';
// Pinia 状态管理
import { useStore } from './store';

const store = useStore();

onMounted(() => {
  // 获取滚动图数据
  get_banner().then((res_banner) => {
    store.banner = res_banner.data.data;
  });
  // 获取文章数据
  get_articles().then((res_articles) => {
    store.articlesInfo = res_articles.data.data;
    store.totalPages = res_articles.data.extra.pages;
    store.hasNextPage = res_articles.data.extra.has_next;
  });
  // 获取站内消息
  get_messages().then((res_msg) => {
    if (res_msg.data.data) {
      store.insiteMessages = res_msg.data.data;
      store.messageTotal = res_msg.data.data[0].total;
    }
  });
  // 获取热门文章
  get_articles_hot().then((res_hot) => {
    if (res_hot.data.data) {
      store.hotArticles = res_hot.data.data;
      store.hasHotArticles = true;
    }
  });
});

// NaiveUI主题自定义配置
const themeOverrides: GlobalThemeOverrides = {
  common: {
    borderRadius: '16px',
    baseColor: '#101012',
  },
  LoadingBar: {
    height: '4px',
  },
  Card: {
    titleFontWeight: '700',
  },
  Alert: {
    titleFontWeight: '700',
  },
};
</script>

<style lang="postcss">
/* Tailwind响应式布局 */
.responsive-layout {
  @apply mx-4 my-4 sm:mx-8 sm:my-8 md:mx-8 lg:mx-8 xl:mx-32;
}

.n-list.n-list--bordered .n-list-item,
.n-list.n-list--hoverable .n-list-item {
  padding: 8px 8px;
}

/* 实现登陆注册页面背景模糊 */
.n-modal-mask {
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(24px);
}
</style>
