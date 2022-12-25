<template>
  <n-divider />
  <n-thing
    content-indented
    v-for="(item, index) in store.comments"
    class="mb-8"
  >
    <template #avatar>
      <n-avatar size="small" :src="item['avatar']" />
    </template>
    <template #header>
      {{ item["nickname"] }}
      <n-tag
        size="small"
        v-if="item['user_id'] == store.article['user_id']"
        class="ml-2 font-bold"
      >
        作者
      </n-tag>
    </template>
    <template #description>
      <n-time
        :to="Date.now()"
        :time="item['comment_time'] * 1000"
        type="relative"
      />
    </template>
    {{ item["comment"] }}
    <template #action>
      <n-space>
        <n-button text size="small">
          <template #icon> </template>
          回复
        </n-button>
      </n-space>
    </template>
    <n-thing class="mx-8" content-indented v-if="false">
      <template #avatar>
        <n-avatar size="small">露露</n-avatar>
      </template>
      <template #header> 宇宙最美最牛究极螺旋升天暗影美女 </template>
      <template #description>
        <n-time :time="0" :to="60000000" type="relative" />
      </template>
      <n-blockquote> 这篇文章写的很好！ </n-blockquote>
      嘿嘿嘿，夹子你也太棒了吧！
      <template #action>
        <n-space>
          <n-button size="small">
            <template #icon> </template>
            回复
          </n-button>
        </n-space>
      </template>
    </n-thing>
  </n-thing>
</template>

<script setup lang="ts">
import { defineComponent, ref } from "vue";
// Pinia 状态管理
import { useStore } from "../store";
import router from "../router";
const store = useStore();

</script>
