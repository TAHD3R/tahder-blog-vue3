<template>
  <n-thing v-for="(item, index) in store.comments" :key="index" class="mb-8" content-indented>
    <template #avatar>
      <n-avatar size="small" :src="item['avatar']" />
    </template>
    <template #header>
      {{ item['nickname'] }}
      <n-tag v-if="item['user_id'] == store.articleDetail['user_id']" size="small" class="ml-2 font-bold"> 作者 </n-tag>
    </template>
    <template #description>
      <n-time :to="Date.now()" :time="item['comment_time'] * 1000" type="relative" />
    </template>
    <n-space vertical>
      <n-text v-if="item['parent']" tag="div">
        <n-blockquote>
          <n-text italic> {{ item['parent']['nickname'] }}: {{ item['parent']['comment'] }} </n-text>
        </n-blockquote>
        <n-p>
          <router-link to="/" #="{ navigate, href }" custom>
            <n-a :href="href" @click="navigate"> @{{ item['parent']['nickname'] }} </n-a>
          </router-link>
          {{ item['comment'] }}
        </n-p>
      </n-text>
      <n-text v-else tag="div">
        <n-p>
          {{ item['comment'] }}
        </n-p>
      </n-text>
      <n-button text size="small" @click="handleReply(item['id'], item['nickname'])">
        <template #icon>
          <n-icon :component="Reply" />
        </template>
        回复
      </n-button>
    </n-space>
  </n-thing>
</template>

<script setup lang="ts">
import { ChatboxEllipses as Reply } from '@vicons/ionicons5';
// Pinia 状态管理
import { useStore } from '../store';
const store = useStore();
const emit = defineEmits(['callback']);

function handleReply(id: number, nickname: string) {
  emit('callback', { id, nickname });
  console.log({ id, nickname });
}
</script>
