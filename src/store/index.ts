import { createPinia, defineStore } from "pinia";
import { ref, computed } from "vue";
import { darkTheme, useMessage, useOsTheme } from "naive-ui";
import { get_user, logout } from "../api/users";

const pinia = createPinia();
const osTheme = useOsTheme();

export const useStore: any = defineStore("main", {
  state: () => {
    return {
      showLogin: false,
      isLogin: false,
      showCarousel: true,
      hasHotArticles: false,
      userinfo: localStorage.getItem("users")
        ? JSON.parse(localStorage.getItem("users") || "{}")
        : false,
      articles: [],
      my_articles: [],
      articles_hot: [],
      comments: [],
      article: [],
      archives: [],
      topics: [],
      banner: [],
      ads: [],
      editorTheme: "dark",
      token: localStorage.getItem("token") || undefined,
    };
  },
  getters: {
    loginCheck: (state) => state.userinfo,
  },
  actions: {
    getUsers(token: string) {
      this.token = token;
      get_user(token)
        .then((res) => {
          console.log(res)
          let users = res.data.data;
          this.updateUserinfo(users);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    userLogout() {
      this.delAuth();
      this.setNavbar(false);
      logout(localStorage.getItem("token")).then((res) => {
        console.log(res);
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
    setCarousel(status: boolean) {
      this.showCarousel = status;
    },
    toggleTheme() {
      if ((this.dark_theme = true)) {
        this.theme = null;
      } else {
        this.theme = darkTheme;
      }
    },
  },
});

export default pinia;