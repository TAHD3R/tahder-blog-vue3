<template>
  <header>
    <n-grid
      cols="2 m:4"
      :x-gap="16"
      :y-gap="16"
      item-responsive
      responsive="screen"
    >
      <n-grid-item span="2 s:2 m:3">
        <router-link :to="{ name: 'post', query: { id: store.banner[0].id } }">
          <div
            class="relative bg-center transition duration-500 ease-out hover:brightness-125"
          >
            <img
              :src="store.banner[0].img"
              alt=""
              class="w-full h-[16rem] sm:h-[32rem] rounded-2xl bg-center object-cover"
            >
            <!-- <div
              class="absolute bottom-0 left-0 w-full h-full lg:h-[16rem] backdrop-blur-lg rounded-b-2xl rounded-t-2xl lg:rounded-t-none"
            /> -->
            <n-space
              vertical
              class="absolute bottom-0 left-0 w-full sm:w-3/5"
            >
              <div class="font-bold text-lg mx-4 sm:mx-16 sm:text-3xl">
                <div class="font-bold">
                  <n-ellipsis
                    :line-clamp="1"
                    :tooltip="false"
                  >
                    {{ store.banner[0].title }}
                  </n-ellipsis>
                </div>
              </div>
              <div>
                <n-ellipsis
                  :line-clamp="2"
                  class="mx-4 sm:mx-16"
                  :tooltip="false"
                >
                  {{ store.banner[0].summary }}
                </n-ellipsis>
              </div>
              <div>
                <n-space
                  class="flex justify-center items-center font-bold mx-4 mb-4 sm:mx-16 sm:mb-16"
                >
                  <div class="flex items-center">
                    <img
                      :src="store.banner[0].avatar"
                      class="w-8 h-8 mr-2 rounded-full"
                    >
                    <div>{{ store.banner[0].author }}</div>
                  </div>
                  <div class="flex items-center">
                    <n-icon
                      :component="ViewsIcon"
                      class="mr-2"
                    />
                    浏览量{{ store.banner[0].views }}
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
                      :time="store.banner[0].create_at"
                      format="yyyy年MM月dd日"
                      unix
                    />
                  </div>
                </n-space>
              </div>
            </n-space>
          </div>
        </router-link>
      </n-grid-item>
      <n-grid-item span="2 s:2 m:1">
        <n-grid
          cols="2 s:1"
          :x-gap="16"
          :y-gap="16"
          item-responsive
          responsive="screen"
        >
          <n-grid-item span="1">
            <router-link
              :to="{ name: 'post', query: { id: store.banner[1].id } }"
            >
              <div
                class="relative transition duration-500 ease-out hover:brightness-125"
              >
                <img
                  :src="store.banner[1].img"
                  alt=""
                  class="w-full h-[15.5rem] rounded-2xl bg-center object-cover"
                >
                <!-- <div
                  class="absolute bottom-0 left-0 w-full h-full sm:h-2/5 lg:h-0 backdrop-blur-lg rounded-b-2xl rounded-t-2xl sm:rounded-t-none"
                /> -->
                <n-space
                  vertical
                  class="absolute bottom-0 left-0 w-full"
                >
                  <div class="font-bold text-lg mx-4 sm:mx-8 sm:text-xl">
                    <div class="font-bold">
                      <n-ellipsis
                        :line-clamp="1"
                        :tooltip="false"
                      >
                        {{ store.banner[1].title }}
                      </n-ellipsis>
                    </div>
                  </div>
                  <n-ellipsis
                    :line-clamp="2"
                    class="mx-4 mb-4 sm:mx-8"
                    :tooltip="false"
                  >
                    {{ store.banner[1].summary }}
                  </n-ellipsis>
                </n-space>
              </div>
            </router-link>
          </n-grid-item>
          <n-grid-item
            id="anchor-articles"
            span="1"
          >
            <router-link
              :to="{ name: 'post', query: { id: store.banner[2].id } }"
            >
              <div
                class="relative transition duration-500 ease-out hover:brightness-125"
              >
                <img
                  :src="store.banner[2].img"
                  alt=""
                  class="w-full h-[15.5rem] rounded-2xl bg-center object-cover"
                >
                <!-- <div
                  class="absolute bottom-0 left-0 w-full h-full sm:h-2/5 lg:h-0 backdrop-blur-lg rounded-b-2xl rounded-t-2xl sm:rounded-t-none"
                /> -->
                <n-space
                  vertical
                  class="absolute bottom-0 left-0 w-full"
                >
                  <div class="font-bold text-lg mx-4 sm:mx-8 sm:text-xl">
                    <div class="font-bold">
                      <n-ellipsis
                        :line-clamp="1"
                        :tooltip="false"
                      >
                        {{ store.banner[2].title }}
                      </n-ellipsis>
                    </div>
                  </div>
                  <n-ellipsis
                    :line-clamp="2"
                    class="mx-4 mb-4 sm:mx-8"
                    :tooltip="false"
                  >
                    {{ store.banner[2].summary }}
                  </n-ellipsis>
                </n-space>
              </div>
            </router-link>
          </n-grid-item>
        </n-grid>
      </n-grid-item>
    </n-grid>
  </header>
</template>

<script lang="ts" setup>
import {
  EyeOutline as ViewsIcon,
  ChatbubbleEllipsesOutline as CommentIcon,
} from "@vicons/ionicons5";
// Pinia 状态管理
import { useStore } from "../store";
const store = useStore();
</script>

<style scoped>
.banner-main {
  background-image: url(https://images.unsplash.com/photo-1671695157166-c4bbd8e6e94e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80);
}

.banner-aside {
  background: url(https://images.unsplash.com/photo-1671540675978-472b34f36c2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738&q=80);
}
</style>
