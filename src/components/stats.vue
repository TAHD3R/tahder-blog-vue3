<template>
  <n-card title="统计数据" class="mb-4">
    <n-row>
      <n-col :span="12">
        <n-statistic label="文章数量">
          <template #prefix>
            <n-icon>
              <AlbumIcon />
            </n-icon>
          </template>
          <n-number-animation
            show-separator
            :from="0"
            :to="store.stats.posts"
          />
        </n-statistic>
      </n-col>
      <n-col :span="12">
        <n-statistic label="访问量">
          <n-number-animation show-separator :from="0" :to="store.stats.views" />
        </n-statistic>
      </n-col>
      <n-col :span="12">
        <n-statistic label="活跃用户">
          <n-number-animation
            show-separator
            :from="0"
            :to="store.stats.users"
          />
        </n-statistic>
      </n-col>
      <n-col :span="12">
        <n-statistic label="新用户">
          <n-avatar-group :options="options" :size="32" :max="4" />
        </n-statistic>
      </n-col>
    </n-row>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { get_stats } from "~/api/website";
import { Albums as AlbumIcon } from "@vicons/ionicons5";
// Pinia 状态管理
import { useStore } from "../store";
const store = useStore();
const options = ref([]);

get_stats().then((res) => {
  store.stats = res.data.data;
  let new_users = res.data.data.new_users;
  for (let key in new_users) {
    if (!new_users.hasOwnProperty(key)) {
      continue;
    }
    let item = {};
    options.value[key] = new_users[key];
    options.value.push(item);
    options.value.pop();
  }
  console.log(options);
});
</script>
