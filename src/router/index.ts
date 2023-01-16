import { computed } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { createDiscreteApi, ConfigProviderProps, darkTheme } from 'naive-ui';
// Pinia 状态管理
import { useStore } from '../store';
import pinia from '../store';

// NaiveUI独立API
const configProviderPropsRef = computed<ConfigProviderProps>(() => ({
  theme: darkTheme,
}));
const { message, loadingBar } = createDiscreteApi(['message', 'loadingBar'], {
  configProviderProps: configProviderPropsRef,
});

const store = useStore(pinia);

// 路由配置
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    component: () => import('~/views/site-index.vue'),
    meta: {
      title: '首页',
    },
  },
  {
    path: '/post',
    name: 'post',
    component: () => import('~/views/post-detail.vue'),
    meta: {
      title: '文章详情',
    },
  },
  {
    path: '/editor',
    name: 'editor',
    component: () => import('~/views/article-editor.vue'),
    meta: {
      title: '编辑器',
      requireAuth: true,
    },
  },
  {
    path: '/space',
    name: 'space',
    component: () => import('~/views/my-space.vue'),
    meta: {
      title: '个人空间',
      requireAuth: true,
    },
  },
  {
    path: '/tags',
    name: 'tags',
    component: () => import('~/views/article-tags.vue'),
    meta: {
      title: '分类/标签',
    },
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('~/views/site-search.vue'),
    meta: {
      title: '搜索结果',
    },
    props: true,
  },
  {
    path: '/lab',
    name: 'lab',
    component: () => import('~/views/my-lab.vue'),
    meta: {
      title: '实验室',
    },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('~/views/about-me.vue'),
    meta: {
      title: '关于我',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    component: () => import('~/components/redirect/notfound-404.vue'),
    meta: {
      title: '页面走丢啦',
    },
  },
  {
    path: '/unauthorized',
    name: 'unauthorized',
    component: () => import('~/components/redirect/unauthorized-401.vue'),
    meta: {
      title: '无权限访问',
    },
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
  strict: true,
});

router.beforeEach(async (to, from, next) => {
  // 全局进度条
  loadingBar.start();
  // 登录判断
  if (!localStorage.hasOwnProperty.call('users')) {
    store.setNavbar(false);
  } else {
    //已登录的情况
    store.setNavbar(true);
    // 发帖权限
    if (to.name == 'editor') {
      if (store.userInfo.engima != 'zcjhxgfzglf') {
        // 这里简单设置了一个权限,如果数据库里用户权限设置为如上字符串则拥有发帖权限,简单粗暴实现功能
        message.error('普通用户组无发帖权限');
        router.push({ name: 'unauthorized' });
      }
    }
  }
  if (to.meta.requireAuth) {
    if (!localStorage.hasOwnProperty.call('users')) {
      message.warning('请先登录！');
      router.push({ name: 'unauthorized' });
    }
  }

  // 设置页面标题
  if (to.meta.title === '首页') {
    const title = '塔格德 - 专注技术, 分享生活';
    document.title = title;
  } else if (to.name == 'post') {
    document.title = store.articleDetail.title + ' - 塔格德';
  } else {
    const title = (to.meta.title ? to.meta.title : '') + ' - 塔格德';
    document.title = title;
  }
  next();
});

// 全局后置守卫
router.afterEach(() => {
  // 全局进度条
  loadingBar.finish();
});

export default router;
