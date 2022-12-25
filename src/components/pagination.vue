<template>
      <n-card class="mt-4" v-if="store.pages > 1">
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
import { ref } from "vue";
// Pinia 状态管理
import { useStore } from "../store";
import pagination from "~/components/pagination.vue";
const store = useStore();

</script>