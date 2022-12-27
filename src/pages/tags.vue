<template>
  <n-card>
    <n-alert
      title="滑动标签页查看更多分类"
      type="success"
      class="flex sm:hidden mb-4"
    />
    <n-tabs
      v-if="dataPrepared"
      animated
      type="line"
      @update:value="handleSwitch"
    >
      <n-tab-pane
        v-for="(item, index) in options"
        :key="index"
        :name="item['id']"
        :tab="item['name']"
      >
        <div class="text-4xl font-bold my-4">
          {{ item["name"] }}
        </div>
        <div>{{ item["description"] }}</div>

        <n-list 
          show-divider 
          hoverable 
          class="my-4"
        >
          <n-empty
            v-if="toLength(Object.keys(articles_list).length) == 0"
            size="huge"
            class="my-16"
            description="暂时还没有文章发表呢.."
          />
          <div v-else>
            <div
              v-for="(item, index) in articles_list"
              :key="index"
            >
              <n-list-item class="rounded-3xl">
                <div class="flex flex-row">
                  <div class="flex flex-col">
                    <div class="text-xl font-bold mt-4 sm:mt-8">
                      <router-link
                        :to="{
                          name: 'post',
                          query: { id: item['id'] },
                        }"
                      >
                        {{ item["title"] }}
                      </router-link>
                      <n-tag
                        type="success"
                        size="small"
                        class="ml-2"
                        :tooltip="false"
                      >
                        {{ item["category"] }}
                      </n-tag>
                    </div>
                    <n-ellipsis
                      :line-clamp="2"
                      class="my-4"
                      :tooltip="false"
                    >
                      {{ item["summary"] }}
                    </n-ellipsis>

                    <n-space
                      class="flex justify-center items-center font-bold mb-4 sm:mb-8"
                    >
                      <div class="flex items-center">
                        <img
                          :src="item['avatar']"
                          class="w-8 h-8 mr-2 rounded-full"
                        >
                        <div>{{ item["author"] }}</div>
                      </div>
                      <div class="flex items-center">
                        <n-icon
                          :component="ViewsIcon"
                          class="mr-2"
                        />
                        浏览量{{ item["views"] }}
                      </div>
                      <div class="flex items-center">
                        <n-icon
                          :component="CommentIcon"
                          class="mr-2"
                        />
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
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { get_categories } from "../api/tags";
import {
  EyeOutline as ViewsIcon,
  ChatbubbleEllipsesOutline as CommentIcon,
} from "@vicons/ionicons5";
import { get_category_articles } from "../api/tags";
import { toLength } from "lodash";

const options: any = [];
const dataPrepared = ref(false);
const articles_list = ref([]);

onMounted(() => {
  get_categories().then((res) => {
    for (var key in res.data.data) {
      if (!res.data.data.hasOwnProperty(key)) {
        continue;
      }
      var item = {};
      options[key] = res.data.data[key];
      options.push(item);
      options.pop();
    }
    dataPrepared.value = true;
  });
  handleSwitch(0);
});

function handleSwitch(value: string | number) {
  get_category_articles({ category: value }).then((res) => {
    articles_list.value = res.data.data;
  });
}
</script>
