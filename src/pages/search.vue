<template>
  <n-card>
    <n-list show-divider hoverable class="my-4">
      <n-empty
        size="huge"
        class="my-16"
        description="没有找到搜索内容.."
        v-if="toLength(Object.keys(store.searchResults).length) == 0"
      />
      <div v-else>
        <div class="text-3xl font-bold my-4">搜索内容{{ router_info.query["keyword"] }}</div>
        <div v-for="(item, index) in store.searchResults">
          <n-list-item class="rounded-3xl">
            <div class="flex flex-row">
              <div class="flex flex-col">
                <div class="text-xl font-bold mt-4 sm:mt-8">
                  <router-link
                    :to="{
                      name: 'post',
                      query: { id: item['id'] },
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
                  <div class="hidden xl:inline">
                    <n-time
                      :time="item['created_time']"
                      format="yyyy年MM月dd日"
                      unix
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
import { ref, onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import { get_categories } from "../api/tags";
import {
  EyeOutline as ViewsIcon,
  ChatbubbleEllipsesOutline as CommentIcon,
} from "@vicons/ionicons5";
import { get_category_articles } from "../api/tags";
import { toLength } from "lodash";
// Pinia 状态管理
import { useStore } from "../store";

const store = useStore();
const router = useRouter();
const router_info = reactive({ ...router.currentRoute.value });


</script>
