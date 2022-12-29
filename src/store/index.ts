import { createPinia, defineStore } from "pinia";
import { computed } from "vue";
import { darkTheme, createDiscreteApi, ConfigProviderProps } from "naive-ui";
import { get_user, logout } from "../api/users";

const pinia = createPinia();
// 提示模块
const configProviderPropsRef = computed<ConfigProviderProps>(() => ({
  theme: darkTheme,
}));
const { message } = createDiscreteApi(["message"], {
  configProviderProps: configProviderPropsRef,
});
export const useStore: any = defineStore("main", {
  state: () => {
    return {
      showLogin: false,
      isLogin: false,
      hasHotArticles: false,
      userinfo: localStorage.getItem("users")
        ? JSON.parse(localStorage.getItem("users") || "{}")
        : false,
      articles: [],
      messages: null,
      my_articles: [],
      articles_hot: [],
      comments: [],
      article: [],
      archives: [],
      topics: [],
      banner: [],
      ads: [],
      stats:[],
      searchResults: [],
      page: 1,
      pages: 1,
      messageTotal:0,
      hasNextPage: false,
      editorTheme: "dark",
      isSkeleton: true,
      token: localStorage.getItem("token") || undefined,
    };
  },
  getters: {
    loginCheck: (state) => state.userinfo,
  },
  actions: {
    getUsers(token: string) {
      this.token = token;
      get_user(token).then((res) => {
        const users = res.data.data;
        this.updateUserinfo(users);
      });
    },
    userLogout() {
      this.delAuth();
      this.setNavbar(false);
      logout(localStorage.getItem("token")).then((res) => {
        message.info(res.data.msg);
      });
    },
    setNavbar(status: boolean) {
      this.isLogin = status;
    },
    updateUserinfo(data: JSON) {
      this.userinfo = data;
      localStorage.setItem("users", JSON.stringify(data));
    },
    delAuth() {
      this.token = undefined;
      localStorage.removeItem("users");
    },
  },
});

export default pinia;
