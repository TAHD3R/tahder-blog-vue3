<template>
  <n-card>
    <n-result
      status="404"
      title="404 资源不存在"
      description="生活总归带点荒谬"
      size="huge"
    >
      <template #footer>
        <n-button @click="router.push('/')"> 回去找点乐子吧 </n-button>
      </template>
    </n-result>
  </n-card>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
</script>
