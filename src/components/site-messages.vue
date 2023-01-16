<template>
  <div v-if="!store.insiteMessages">
    <n-empty description="没有新的消息" />
  </div>
  <div v-else>
    <n-space v-for="(item, index) in store.insiteMessages" :key="index" justify="space-between" horizontal>
      <div v-if="item['status'] === 0" class="flex items-center justify-between w-[160px]">
        <n-space vertical justify="space-between">
          <n-ellipsis :line-clamp="1" style="max-width: 120px">
            <n-text tag="div" class="font-bold">
              {{ item['msgtype'] }}
            </n-text>
          </n-ellipsis>
          <n-ellipsis :line-clamp="1" style="max-width: 120px">
            <n-text tag="div">
              {{ item['content'] }}
            </n-text>
          </n-ellipsis>
        </n-space>
        <n-button circle size="tiny" @click="handleClick(item['id'])">
          <template #icon>
            <n-icon :component="Check" />
          </template>
        </n-button>
      </div>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { nextTick } from 'vue';
import { CheckmarkSharp as Check } from '@vicons/ionicons5';
import { get_messages, read_messages } from '~/api/users';
// Pinia 状态管理
import { useStore } from '../store';

defineProps({
  title: { type: String, default: null },
  content: { type: String, default: null },
});
const store = useStore();

function handleClick(id: number) {
  let data = {
    id: id,
  };
  read_messages(data);
  nextTick(() => {
    get_messages().then((res) => {
      store.insiteMessages = res.data.data;
    });
  });
}
</script>
