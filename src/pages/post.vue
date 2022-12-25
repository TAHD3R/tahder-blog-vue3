<template>
  <div>
    <n-card>
      <n-h1>{{ store.article["title"] }}</n-h1>
      <div class="flex flex-row items-center mb-4">
        <n-avatar round size="small" :src="store.article['avatar']" />
        <n-button text class="mx-2"> {{ store.article["author"] }} </n-button>
        <n-time
          :time="store.article['created_time']"
          format="yyyy年MM月dd日"
          unix
          v-if="docLoaded"
        />
      </div>

      <div ref="myRef" />

      <n-space horizontal justify="space-between" class="my-4">
        <div class="font-bold">
          文章分类：
          <n-tag type="success" size="small">
            {{ store.article["category"] }}
          </n-tag>
        </div>

        <div class="font-bold ml-2">
          浏览量:
          <n-tag type="info" size="small">
            {{ store.article["views"] }}点击
          </n-tag>
        </div>
      </n-space>

      <n-space vertical>
        <n-space horizontal justify="space-between">
          <div class="font-bold text-xl">关于作者</div>
          <n-button strong>关注</n-button>
        </n-space>
        <n-space horizontal>
          <img :src="store.article['avatar']" class="w-14 h-14 rounded-md" />
          <n-space vertical>
            <div class="text-lg font-bold">
              {{ store.article["author"] }}
            </div>
            <n-ellipsis :line-clamp="2" class="text-sm">
              {{ store.article["description"] }}
            </n-ellipsis>
          </n-space>
        </n-space>
      </n-space>

      <n-divider> 评论区 </n-divider>
      <div class="flex flex-col">
        <n-input
          type="textarea"
          v-model:value="commentValue"
          maxlength="80"
          show-count
          placeholder="请输入评论内容"
          :autosize="{
            minRows: 4,
            maxRows: 5,
          }"
        />
        <div class="flex flex-row my-2">
          <div class="grow" />
          <div>
            <n-button size="large" secondary strong @click="handleComment">
              发表
            </n-button>
          </div>
        </div>
        <n-empty
          size="huge"
          class="my-16"
          description="暂时还没有人来评论呢.."
          v-if="toLength(Object.keys(store.comments).length) == 0"
        />
        <div v-else>
          <comment />
        </div>
      </div>
    </n-card>
  </div>
  <div id="classes"></div>
</template>

<script setup lang="ts">
import { get_article, get_comments, make_comment } from "../api/posts";
import { ref, onMounted, reactive, nextTick } from "vue";
import { RouterLink, useRouter } from "vue-router";
import comment from "~/components/comments.vue";
import { get_articles } from "../api/posts";
import { useMessage } from "naive-ui";
import { toLength } from "lodash";
import Vditor from "vditor";
// Pinia 状态管理
import { useStore } from "../store";

const store = useStore();
const router = useRouter();
const message = useMessage();
const router_info = reactive({ ...router.currentRoute.value });

const docLoaded = ref(false);
const myRef = ref<HTMLDivElement>();
const doc = reactive({
  content: "",
});
const commentValue = ref(null);

onMounted(() => {
  get_article(router_info.params["id"]).then((res) => {
    if (res.data.code != "200") {
      router.push({ name: "notfound" });
    } else {
      store.article = res.data.data;
      doc.content = res.data.data.content;
      docLoaded.value = true;
      Vditor.preview(myRef.value, doc.content, {
        mode: "dark",
        anchor: 2,
        theme: {
          current: "dark",
          list: {
            "ant-design": "Ant Design",
            dark: "Dark",
            light: "Light",
            wechat: "WeChat",
          },
        },
        hljs: {
          enable: true,
          style: "dracula",
          lineNumber: true,
        },
      });
    }
  });
  get_comments(router_info.params["id"]).then((res) => {
    store.comments = res.data.data;
  });
});

function handleComment() {
  if (localStorage.getItem("users")) {
    let getLocalData: any = localStorage.getItem("users");
    let user_id: string = JSON.parse(getLocalData).user_id;
    let data = {
      user_id: user_id,
      article_id: router_info.params["id"],
      comment: commentValue.value,
      parent_id: null,
    };

    if (commentValue.value != null) {
      make_comment(data).then((res) => {
        if (res.data.code != 200) {
          nextTick(() => {
            message.error(res.data.msg);
          });
        } else {
          nextTick(() => {
            message.success(res.data.msg);
            commentValue.value = null;
            get_comments(router_info.params["id"]).then((res) => {
              store.comments = res.data.data;
            });
            get_articles().then((res) => {
              store.articles = res.data.data;
            });
          });
        }
      });
    } else {
      message.warning("沉默是金，但或许沟通能带来更多财富?");
    }
  }else{
    message.error("还是先登录再试试吧。");
  }
}
</script>

<style scoped>

</style>
