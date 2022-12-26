<template>
  <n-card embedded>
    <div class="flex flex-row justify-between mb-4">
      <div class="flex flex-col">
        <div class="text-3xl mb-2 font-bold">
          在这里发挥想象吧！
        </div>
      </div>
    </div>
    <n-grid
      x-gap="12"
      :cols="4"
      item-responsive
      class="mb-3"
    >
      <n-gi span="2">
        <n-select
          v-if="categoryLoaded"
          v-model:value="categoryValue"
          :options="options"
          class="mb-3"
          label-field="name"
          value-field="id"
          placeholder="选择文章分类"
        />
      </n-gi>

      <n-gi span="2">
        <n-input
          v-model:value="inputValue"
          type="text"
          placeholder="输入文章题目"
          show-count
          clearable
        />
      </n-gi>
      <n-gi span="4">
        <n-input
          v-model:value="descValue"
          type="text"
          placeholder="输入文章简介"
          show-count
          clearable
        />
      </n-gi>
    </n-grid>
    <div id="vditor" />
    <template #action>
      <n-space justify="end">
        <n-button
          size="large"
          @click="publishArticle"
        >
          <template #icon>
            <n-icon><ArchiveIcon /></n-icon>
          </template>
          发表文章
        </n-button>
      </n-space>
    </template>
  </n-card>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from "vue";
import { useMessage } from "naive-ui";
import { ChatboxOutline as ArchiveIcon } from "@vicons/ionicons5";
import { publish } from "../api/posts";
import { get_categories } from "../api/tags";
import { get_articles } from "../api/posts";
import Vditor from "vditor";

import { useRouter } from "vue-router";
// Pinia 状态管理
import { useStore } from "../store";

const vditor = ref<Vditor | null>(null);
const router = useRouter();
const store = useStore();
const message = useMessage();
const inputValue = ref(null);
const descValue = ref(null);
const tags = ref([]);
const categoryValue = ref(null);
const categoryLoaded = ref(false);
const options: any = [];

onMounted(() => {
  vditor.value = new Vditor("vditor", {
    theme: "classic",
    icon: "material",
    placeholder: "< 开始发挥想象🥇",
    toolbar: [
      "emoji",
      "headings",
      "bold",
      "italic",
      "strike",
      "link",
      "|",
      "list",
      "ordered-list",
      "check",
      "outdent",
      "indent",
      "|",
      "quote",
      "line",
      "code",
      "inline-code",
      "insert-before",
      "insert-after",
      "|",
      "table",
      "|",
      "undo",
      "redo",
    ],
    cache: {
      enable: false,
    },
    toolbarConfig: {
      pin: true,
    },
    counter: {
      enable: true,
      type: "text",
    },
    //默认关闭大纲
    outline: {
      enable: false,
      position: "right",
    },
    after: () => {
      // vditor.value is a instance of Vditor now and thus can be safely used here
      // vditor.value!.setValue(doc.content);
    },
  });

  get_categories().then((res) => {
    for (var key in res.data.data) {
      if (!res.data.data.hasOwnProperty(key)) {
        continue;
      }
      var item = {};
      options[key] = res.data.data[key];
      options.push(item);
      options.pop();
    }
    categoryLoaded.value = true;
  });
});

function publishArticle() {
  let getLocalData: any = localStorage.getItem("users");
  let user_id: string = JSON.parse(getLocalData).user_id;

  let data = {
    author: user_id,
    title: inputValue.value,
    content: vditor.value.getValue(),
    summary: descValue.value,
    category: categoryValue.value,
  };
  console.log(categoryValue.value);
  publish(data).then((res) => {
    if (res.data.code != 200) {
      nextTick(() => {
        message.error(res.data.msg);
      });
    } else {
      nextTick(() => {
        message.success(res.data.msg);
        get_articles().then((res) => {
          store.articles = res.data.data;
        });
        router.push({ name: "post", query: { id: res.data.data.id } });
      });
    }
  });
}

let vueEditor: Vditor | null = null;
function handleAfter(editor: any) {
  vueEditor = editor;
}
</script>
