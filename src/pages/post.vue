<template>
  <div>
    <n-grid
      cols="1 m:4"
      :x-gap="16"
      :y-gap="16"
      item-responsive
      responsive="screen"
    >
      <n-grid-item span="1 s:3">
        <n-card>
          <n-h1>{{ store.article["title"] }}</n-h1>
          <div class="flex flex-row items-center mb-4">
            <n-avatar
              round
              size="small"
              :src="store.article['avatar']"
            />
            <n-button
              text
              class="mx-2"
            >
              {{ store.article["author"] }}
            </n-button>
            <n-time
              v-if="docLoaded"
              :time="store.article['created_time']"
              format="yyyy年MM月dd日"
              unix
            />
          </div>

          <div ref="previewRef" />

          <n-space
            horizontal
            justify="space-between"
            class="my-4"
          >
            <div class="font-bold">
              文章分类：
              <n-tag
                type="success"
                size="small"
              >
                {{ store.article["category"] }}
              </n-tag>
            </div>

            <div class="font-bold ml-2">
              浏览量:
              <n-tag
                type="info"
                size="small"
              >
                {{ store.article["views"] }}点击
              </n-tag>
            </div>
          </n-space>

          <n-space vertical>
            <n-space
              horizontal
              justify="space-between"
            >
              <div class="font-bold text-xl">
                关于作者
              </div>
              <n-button strong>
                关注
              </n-button>
            </n-space>
            <n-space horizontal>
              <img
                :src="store.article['avatar']"
                class="w-14 h-14 rounded-md"
              >
              <n-space vertical>
                <div class="text-lg font-bold">
                  {{ store.article["author"] }}
                </div>
                <n-ellipsis
                  :line-clamp="2"
                  class="text-sm"
                >
                  {{ store.article["description"] }}
                </n-ellipsis>
              </n-space>
            </n-space>
          </n-space>

          <n-divider> 评论区 </n-divider>
          <div class="flex flex-col">
            <n-input
              v-model:value="commentValue"
              type="textarea"
              maxlength="80"
              show-count
              placeholder="请输入评论内容"
              :autosize="{
                minRows: 5,
                maxRows: 5,
              }"
            />
            <div class="flex flex-row my-2">
              <div class="grow" />
              <div>
                <n-button
                  size="large"
                  secondary
                  strong
                  @click="handleComment"
                >
                  发表
                </n-button>
              </div>
            </div>
            <n-empty
              v-if="toLength(Object.keys(store.comments).length) == 0"
              size="huge"
              class="my-16"
              description="暂时还没有人来评论呢.."
            />
            <div v-else>
              <comment />
            </div>
          </div>
        </n-card>
      </n-grid-item>
      <n-grid-item span="0 s:1">
        <n-card title="文章大纲">
          <div ref="outlineRef" />
        </n-card>
      </n-grid-item>
    </n-grid>
  </div>
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
const previewRef = ref<HTMLDivElement>();
const outlineRef = ref<HTMLDivElement>();
const containerRef = ref<HTMLElement | undefined>(undefined);
const doc = reactive({
  content: "",
});
const commentValue = ref(null);

onMounted(() => {
  get_article(router_info.query["id"]).then((res) => {
    if (res.data.code != "200") {
      router.push({ name: "notfound" });
    } else {
      store.article = res.data.data;
      doc.content = res.data.data.content;
      docLoaded.value = true;
      Vditor.preview(previewRef.value, doc.content, {
        mode: "dark",
        anchor: 2,
        speech: {
          enable: true,
        },
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
        after() {
          Vditor.outlineRender(previewRef.value, outlineRef.value);
          outlineRef.value.style.display = "block";
          initOutline();
        },
      });
    }
  });
  get_comments(router_info.query["id"]).then((res) => {
    store.comments = res.data.data;
  });
});

const initOutline = () => {
  const headingElements = [];
  Array.from(previewRef.value.children).forEach((item) => {
    if (
      item.tagName.length === 2 &&
      item.tagName !== "HR" &&
      item.tagName.indexOf("H") === 0
    ) {
      headingElements.push(item);
    }
  });

  let toc = [];
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    toc = [];
    headingElements.forEach((item) => {
      toc.push({
        id: item.id,
        offsetTop: item.offsetTop,
      });
    });

    const currentElement = document.querySelector(
      ".vditor-outline__item--current"
    );
    for (let i = 0, iMax = toc.length; i < iMax; i++) {
      if (scrollTop < toc[i].offsetTop - 30) {
        if (currentElement) {
          currentElement.classList.remove("vditor-outline__item--current");
        }
        let index = i > 0 ? i - 1 : 0;
        document
          .querySelector('span[data-target-id="' + toc[index].id + '"]')
          .classList.add("vditor-outline__item--current");
        break;
      }
    }
  });
};

function handleComment() {
  if (localStorage.getItem("users")) {
    let getLocalData: any = localStorage.getItem("users");
    let user_id: string = JSON.parse(getLocalData).user_id;

    let data = {
      user_id: user_id,
      article_id: router_info.query["id"],
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
            get_comments(router_info.query["id"]).then((res) => {
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
  } else {
    message.error("还是先登录再试试吧。");
  }
}
</script>

<style>
.vditor-outline li > span > span {
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
