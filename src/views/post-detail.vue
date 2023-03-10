<template>
  <div>
    <n-grid cols="1 m:4" :x-gap="16" :y-gap="16" item-responsive responsive="screen">
      <n-grid-item span="1 s:3">
        <n-card>
          <n-h1>{{ store.articleDetail['title'] }}</n-h1>
          <div class="flex flex-row items-center mb-4">
            <n-avatar round size="small" :src="store.articleDetail['avatar']" />
            <n-button text class="mx-2">
              {{ store.articleDetail['author'] }}
            </n-button>
            <n-time v-if="docLoaded" :time="store.articleDetail['created_time']" format="yyyy年MM月dd日" unix />
          </div>

          <div ref="previewRef" />

          <n-space horizontal justify="space-between" class="my-4">
            <div class="font-bold">
              文章分类：
              <n-tag type="success" size="small">
                {{ store.articleDetail['category'] }}
              </n-tag>
            </div>

            <div class="font-bold ml-2">
              浏览量:
              <n-tag type="info" size="small"> {{ store.articleDetail['views'] }}点击 </n-tag>
            </div>
          </n-space>

          <n-divider> 评论区 </n-divider>

          <n-grid cols="3 s:5" :x-gap="16" class="mb-4" item-responsive responsive="screen">
            <n-gi span="2 s:4">
              <n-mention
                ref="myMentionRef"
                v-model:value="commentRef"
                :options="UserlistRef"
                default-value="@"
                :loading="loadingRef"
                type="textarea"
                show-count
                placeholder="请输入评论内容"
                :autosize="{
                  minRows: 3,
                  maxRows: 5,
                }"
                @search="pullUserlist"
              />
            </n-gi>
            <n-gi>
              <n-button strong class="w-full h-full" @click="handleComment"> 发表 </n-button>
            </n-gi>
          </n-grid>

          <n-empty v-if="toLength(Object.keys(store.comments).length) == 0" size="huge" class="my-16" description="暂时还没有人来评论呢.." />
          <div v-else>
            <comment @callback="reply" />
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
import { get_article, get_comments, make_comment } from '../api/posts';
import { ref, onMounted, reactive, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import comment from '../components/article-comments.vue';
import { get_articles } from '~/api/posts';
import { get_userlist } from '~/api/users';
import { useMessage, MentionOption, MentionInst } from 'naive-ui';
import { toLength } from 'lodash';
import Vditor from 'vditor';
// Pinia 状态管理
import { useStore } from '../store';

const store = useStore();
const router = useRouter();
const message = useMessage();
const router_info = reactive({ ...router.currentRoute.value });

const docLoaded = ref(false);
const previewRef = ref<HTMLDivElement>();
const outlineRef = ref<HTMLDivElement>();
const parentRef = ref<number | undefined>(null);
const UserlistRef = ref<MentionOption[]>([]);
const loadingRef = ref(false);
const myMentionRef = ref<MentionInst | null>(null);
const commentRef = ref(null);

const doc = reactive({
  content: '',
});

// 传父信息数值，聚焦输入框
function reply(data: number) {
  parentRef.value = data['id'];
  myMentionRef.value?.focus();
}

// 拉取站内用户列表，用于评论区@某人
function pullUserlist(pattern: string) {
  get_userlist().then((res) => {
    UserlistRef.value = res.data.data.map((v) => ({
      label: pattern + v,
      value: pattern + v,
    }));
    loadingRef.value = false;
  });
}

onMounted(() => {
  // 拉取文章
  get_article(router_info.query['id']).then((res) => {
    if (res.data.code != '200') {
      // 若文章不存在,跳转404
      router.push({ name: 'notfound' });
    } else {
      store.articleDetail = res.data.data;
      doc.content = res.data.data.content;
      docLoaded.value = true;
      // Vditor预览模式
      Vditor.preview(previewRef.value, doc.content, {
        mode: 'dark',
        anchor: 2,
        speech: {
          enable: true,
        },
        theme: {
          current: 'dark',
          list: {
            'ant-design': 'Ant Design',
            dark: 'Dark',
            light: 'Light',
            wechat: 'WeChat',
          },
        },
        hljs: {
          enable: true,
          style: 'dracula',
          lineNumber: true,
        },
        after() {
          Vditor.outlineRender(previewRef.value, outlineRef.value);
          outlineRef.value.style.display = 'block';
          initOutline();
        },
      });
    }
  });
  // 拉取评论
  get_comments(router_info.query['id']).then((res) => {
    store.comments = res.data.data;
  });
});

// 加载文章大纲
const initOutline = () => {
  const headingElements = [];
  Array.from(previewRef.value.children).forEach((item) => {
    if (item.tagName.length === 2 && item.tagName !== 'HR' && item.tagName.indexOf('H') === 0) {
      headingElements.push(item);
    }
  });

  let toc = [];
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    toc = [];
    headingElements.forEach((item) => {
      toc.push({
        id: item.id,
        offsetTop: item.offsetTop,
      });
    });

    const currentElement = document.querySelector('.vditor-outline__item--current');
    for (let i = 0, iMax = toc.length; i < iMax; i++) {
      if (scrollTop < toc[i].offsetTop - 30) {
        if (currentElement) {
          currentElement.classList.remove('vditor-outline__item--current');
        }
        let index = i > 0 ? i - 1 : 0;
        document.querySelector('span[data-target-id="' + toc[index].id + '"]').classList.add('vditor-outline__item--current');
        break;
      }
    }
  });
};

// 评论处理函数
function handleComment() {
  if (localStorage.getItem('users')) {
    let getLocalData: string = localStorage.getItem('users');
    let user_id: string = JSON.parse(getLocalData).user_id;

    // 入参
    let data = {
      user_id: user_id,
      article_id: router_info.query['id'],
      comment: commentRef.value,
      parent_id: parentRef.value,
    };

    if (commentRef.value != null) {
      make_comment(data).then((res) => {
        if (res.data.code != 200) {
          nextTick(() => {
            message.error(res.data.msg);
          });
        } else {
          nextTick(() => {
            message.success(res.data.msg);
            commentRef.value = null;
            get_comments(router_info.query['id']).then((res) => {
              store.comments = res.data.data;
            });
            get_articles().then((res) => {
              store.articleDetail = res.data.data;
            });
          });
        }
      });
    } else {
      message.warning('沉默是金，但或许沟通能带来更多财富?');
    }
  } else {
    message.error('还是先登录再试试吧。');
  }
}
</script>
