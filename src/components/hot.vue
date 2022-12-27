<template>
  <div>
    <n-card
      title="热门精选"
      class="mb-4"
    >
      <template #header-extra>
        <n-button
          strong
          secondary
          type="primary"
        >
          查看更多
        </n-button>
      </template>
      <n-list
        v-if="store.hasHotArticles"
        hoverable
        clickable
      >
        <div
          v-for="(item, index) in store.articles_hot"
          :key="index"
        >
          <n-list-item>
            <n-thing content-style="margin-top: 10px;">
              <template #header>
                <n-ellipsis
                  :line-clamp="1"
                  :tooltip="false"
                >
                  <router-link
                    :to="{
                      name: 'post',
                      query: { id: item['id'] },
                    }"
                  >
                    <div class="font-bold">
                      {{ item["article_title"] }}
                    </div>
                  </router-link>
                </n-ellipsis>
              </template>
              <template #description>
                <n-space
                  size="small"
                  style="margin-top: 4px"
                >
                  <n-tag
                    type="success"
                    size="small"
                  >
                    {{ item["category"] }}
                  </n-tag>
                </n-space>
              </template>
              <n-ellipsis
                :line-clamp="2"
                :tooltip="false"
              >
                {{ item["summary"] }}
              </n-ellipsis>
            </n-thing>
          </n-list-item>
        </div>
      </n-list>
      <n-empty
        v-else
        size="huge"
        class="my-16"
        description="暂时还没有热门文章.."
      />
    </n-card>
  </div>
</template>

<script setup lang="ts">
// Pinia 状态管理
import { useStore } from "../store";
const store = useStore();
</script>
