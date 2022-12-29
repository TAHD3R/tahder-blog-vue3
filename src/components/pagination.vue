<template>
  <n-card
    v-if="store.pages > 1"
    class="mt-4"
  >
    <n-space justify="center">
      <n-pagination
        v-model:page="store.page"
        :page-count="store.pages"
        size="large"
        :page-slot="7"
      />
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
// Pinia 状态管理
import { useStore } from "../store";
const store = useStore();
</script>