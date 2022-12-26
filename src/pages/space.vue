<template>
  <n-card
    embedded
    content-style="margin-top:24px;"
  >
    <template #cover>
      <img
        src="https://images.unsplash.com/photo-1669669957371-038884599ba1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1634&q=80"
        class="h-80 object-cover"
      >
    </template>

    <n-space>
      <img
        :src="store.userinfo['avatar']"
        alt=""
        class="w-16 h-16 sm:w-24 sm:h-24 rounded-xl"
      >
      <n-space vertical>
        <n-space>
          <n-space justify="end">
            <div class="text-2xl font-bold">
              {{ store.userinfo["nickname"] }}
            </div>
          </n-space>
          <n-button @click="active = true">
            编辑个人资料
          </n-button>
        </n-space>

        <n-space vertical>
          <div>
            <n-ellipsis :line-clamp="1">
              {{ store.userinfo["description"] }}
            </n-ellipsis>
          </div>
        </n-space>

        <n-space>
          <n-button text>
            <template #icon>
              <n-icon>
                <Follow />
              </n-icon>
            </template>
            关注 0
          </n-button>
          <n-divider vertical />
          <n-button text>
            <template #icon>
              <n-icon>
                <Fans />
              </n-icon>
            </template>
            粉丝 0
          </n-button>
        </n-space>
      </n-space>
    </n-space>
  </n-card>

  <n-card
    class="my-4"
    title="我的文章"
  >
    <template #header-extra>
      <n-button
        round
        @click="router.push('/editor')"
      >
        <template #icon>
          <n-icon :component="Pen" />
        </template>
        写文章
      </n-button>
    </template>
    <n-list
      show-divider
      hoverable
    >
      <n-empty
        v-if="toLength(Object.keys(store.my_articles).length) == 0"
        size="huge"
        class="my-16"
        description="暂时还没有文章发表呢.."
      />
      <div v-else>
        <div v-for="(item, index) in store.my_articles">
          <n-list-item class="my-4">
            <div class="flex flex-row">
              <div class="flex flex-col">
                <div class="text-xl font-bold">
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
                  >
                    {{ item["category"] }}
                  </n-tag>
                </div>
                <n-p>
                  {{ item["summary"] }}
                </n-p>
                <div>
                  <n-icon>
                    <Fire />
                  </n-icon>
                  浏览量 {{ item["views"] }}
                </div>
              </div>
            </div>
          </n-list-item>
        </div>
      </div>
    </n-list>
  </n-card>

  <n-modal
    v-model:show="active"
    preset="card"
    title="编辑个人资料"
    style="width: 300px"
  >
    <n-form
      ref="formRef"
      :model="formValue"
      label-placement="left"
      label-align="left"
    >
      <n-form-item path="nickname">
        <n-input
          v-model:value="formValue.nickname"
          placeholder="输入昵称"
        />
      </n-form-item>
      <n-form-item path="description">
        <n-input
          v-model:value="formValue.description"
          placeholder="输入自我介绍"
        />
      </n-form-item>
    </n-form>
    <template #footer>
      <n-space justify="center">
        <n-button
          strong
          class="w-full"
          @click="handleClick"
        >
          提交修改
        </n-button>
      </n-space>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
// Pinia 状态管理
import { ref, onMounted, nextTick } from "vue";
import { useStore } from "../store";
import { toLength } from "lodash";

import {
  AnalyticsOutline as Fans,
  BalloonOutline as Follow,
  FlameOutline as Fire,
  PencilOutline as Pen,
} from "@vicons/ionicons5";

import { useMessage } from "naive-ui";
import type { DrawerPlacement } from "naive-ui";
import { useRouter } from "vue-router";

import { get_my_articles } from "../api/posts";
import { update_userinfo } from "../api/users";
const router = useRouter();
const store = useStore();
const active = ref(false);
const placement = ref<DrawerPlacement>("right");
const message = useMessage();
const formValue = ref({
  nickname: "",
  description: "",
});

onMounted(() => {
  get_my_articles().then((res) => {
    nextTick(() => {
      console.log(res);
      store.my_articles = res.data.data;
    });
  });
});

function handleClick() {
  let user_info = JSON.stringify(formValue.value);
  update_userinfo(user_info)
    .then((res) => {
      if (res.data.code != 200) {
        message.error(res.data.msg);
      } else {
        try {
          message.success("修改成功,重新登录后生效");
          active.value = false;
        } catch (error) {
          message.error("修改失败,要不要再试试?");
        }
      }
    })
    .catch((err) => {
      message.error(err);
    });
  nextTick(() => {
    store.getUsers(store.token);
  });
}
</script>
