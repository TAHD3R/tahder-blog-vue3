import { computed } from "vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { createDiscreteApi, ConfigProviderProps, darkTheme } from "naive-ui";
// Pinia 状态管理
import { useStore } from "../store";
import pinia from "../store";

const configProviderPropsRef = computed<ConfigProviderProps>(() => ({
  theme: darkTheme,
}));
const { message, loadingBar } = createDiscreteApi(["message", "loadingBar"], {
  configProviderProps: configProviderPropsRef,
});

const store = useStore(pinia);

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "index",
    component: () => import("~/pages/index.vue"),
    meta: {
      title: "首页",
    },
  },
  {
    path: "/post",
    name: "post",
    component: () => import("~/pages/post.vue"),
    meta: {
      title: "文章详情",
    },
  },
  {
    path: "/editor",
    name: "editor",
    component: () => import("~/pages/editor.vue"),
    meta: {
      title: "编辑器",
      requireAuth: true,
    },
  },
  {
    path: "/space",
    name: "space",
    component: () => import("~/pages/space.vue"),
    meta: {
      title: "个人空间",
      requireAuth: true,
    },
  },
  {
    path: "/tags",
    name: "tags",
    component: () => import("~/pages/tags.vue"),
    meta: {
      title: "分类/标签",
    },
  },
  {
    path: "/search",
    name: "search",
    component: () => import("~/pages/search.vue"),
    meta: {
      title: "搜索结果",
    },
    props: true,
  },
  {
    path: "/lab",
    name: "lab",
    component: () => import("~/pages/lab.vue"),
    meta: {
      title: "实验室",
    },
  },
  {
    path: "/about",
    name: "about",
    component: () => import("~/pages/about.vue"),
    meta: {
      title: "关于我",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("~/components/redirect/notfound.vue"),
    meta: {
      title: "页面走丢啦",
    },
  },
  {
    path: "/unauthorized",
    name: "unauthorized",
    component: () => import("~/components/redirect/unauthorized.vue"),
    meta: {
      title: "无权限访问",
    },
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
  strict: true,
});

router.beforeEach(async (to, from, next) => {
  // 全局进度条
  loadingBar.start();
  // 登录判断
  if (!localStorage.hasOwnProperty("users")) {
    store.setNavbar(false);
  } else {
    //已登录
    store.setNavbar(true);
    // 发帖权限
    if (to.name == "editor") {
      if (store.userinfo.engima != "zcjhxgfzglf") {
        message.error("普通用户组无发帖权限");
        router.push({ name: "unauthorized" });
      }
    }
  }
  if (to.meta.requireAuth) {
    if (!localStorage.hasOwnProperty("users")) {
      message.warning("请先登录！");
      router.push({ name: "unauthorized" });
    }
  }

  // 设置页面标题
  if (to.meta.title === "首页") {
    let title = "塔格德 - 专注技术, 分享生活";
    document.title = title;
  } else {
    let title = (to.meta.title ? to.meta.title : "") + " - 塔格德";
    document.title = title;
  }
  next();
});

// 全局后置守卫
router.afterEach((to, from) => {
  // 全局进度条
  loadingBar.finish();
});

export default router;
