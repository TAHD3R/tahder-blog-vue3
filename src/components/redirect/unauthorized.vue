<template>
  <n-card>
    <n-result
      status="500"
      title="401 请求未授权"
      description="要不然，还是等有权限了再来吧！"
      size="huge"
    >
      <template #footer>
        <n-button @click="router.push('/')">
          送我回去
        </n-button>
      </template>
    </n-result>
  </n-card>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
</script>
