<template>
  <n-card>
    <n-list hoverable>
      <n-empty
        size="huge"
        description="暂时还没有文章呢.."
        v-if="toLength(Object.keys(store.articles).length) == 0"
      />
      <div v-else>
        <div v-for="(item, index) in store.articles">
          <n-list-item class="rounded-3xl">
            <div class="flex flex-row">
              <div class="flex flex-col">
                <div class="text-xl font-bold mt-4 sm:mt-8">
                  <router-link
                    :to="{
                      name: 'post',
                      params: { id: item['id'] },
                    }"
                    >{{ item["title"] }}
                  </router-link>
                  <n-tag type="success" size="small" class="ml-2">
                    {{ item["category"] }}
                  </n-tag>
                </div>
                <n-ellipsis :line-clamp="2" class="my-4">
                  {{ item["summary"] }}
                </n-ellipsis>

                <n-space
                  class="flex justify-center items-center font-bold mb-4 sm:mb-8"
                >
                  <div class="flex items-center">
                    <img
                      :src="item['avatar']"
                      class="w-8 h-8 mr-2 rounded-full"
                    />
                    <div>{{ item["author"] }}</div>
                  </div>
                  <div class="flex items-center">
                    <n-icon :component="ViewsIcon" class="mr-2" />
                    浏览量{{ item["views"] }}
                  </div>
                  <div class="flex items-center">
                    <n-icon :component="CommentIcon" class="mr-2" />
                    评论数0
                  </div>
                  <div class="hidden xl:inline font-normal">
                    <n-time
                      :to="Date.now()"
                      :time="item['created_time'] * 1000"
                      type="relative"
                    />
                  </div>
                </n-space>
              </div>
            </div>
          </n-list-item>
        </div>
      </div>
    </n-list>
  </n-card>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, nextTick } from "vue";
import { toLength } from "lodash";
import { get_articles } from "../api/posts";
import {
  EyeOutline as ViewsIcon,
  ChatbubbleEllipsesOutline as CommentIcon,
} from "@vicons/ionicons5";
// Pinia 状态管理
import { useStore } from "../store";

const props = defineProps(["page"]);
const store = useStore();
const articles = ref();

watch(
  () => props.page,
  (newVal, oldVal) => {
    let data = {
      page: newVal,
    };
    document
      .getElementById("anchor-articles")
      .scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    get_articles(data).then((res) => {
      store.articles = res.data.data;
    });
  }
);
</script>

<style scoped>
.article-img {
  width: 480px;
  object-fit: cover;
}

.n-a {
  --tw-text-opacity: 1;
  color: rgb(244 244 245 / var(--tw-text-opacity));
}

.n-list {
  border-radius: 16px;
}
</style>
