<template>
  <n-space
    v-for="(item, index) in store.messages"
    :key="index"
    justify="space-between"
    horizontal
  >
    <div
      v-if="item['status'] === 0"
      class="flex items-center justify-between w-[160px] mx-4 my-2"
    >
      <n-space
        vertical
        justify="space-between"
      >
        <n-ellipsis
          :line-clamp="1"
          style="max-width: 120px"
        >
          <n-text
            tag="div"
            class="font-bold"
          >
            {{ item["msgtype"] }}
          </n-text>
        </n-ellipsis>
        <n-ellipsis
          :line-clamp="1"
          style="max-width: 120px"
        >
          <n-text tag="div">
            {{ item["content"] }}
          </n-text>
        </n-ellipsis>
      </n-space>
      <n-button
        circle
        size="small"
        @click="handleClick(item['id'])"
      >
        <template #icon>
          <n-icon :component="Check" />
        </template>
      </n-button>
    </div>
  </n-space>
</template>

<script setup lang="ts">
import { ref, nextTick } from "vue";
import { CheckmarkSharp as Check } from "@vicons/ionicons5";
import { get_messages, read_messages } from "~/api/users";
// Pinia 状态管理
import { useStore } from "../store";

defineProps(["title", "content"]);
const store = useStore();
const messages = ref();

function handleClick(id: number) {
  let data = {
    id: id,
  };
  read_messages(data);
  nextTick(() => {
    get_messages().then((res) => {
      store.messages = res.data.data;
    });
  });
}
</script>
