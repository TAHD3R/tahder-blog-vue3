import { computed } from 'vue';
import { createPinia, defineStore } from 'pinia';
import { darkTheme, createDiscreteApi, ConfigProviderProps } from 'naive-ui';
import { get_user, logout } from '../api/users';

const pinia = createPinia();

// NaiveUI独立API
const configProviderPropsRef = computed<ConfigProviderProps>(() => ({
  theme: darkTheme,
}));
const { message } = createDiscreteApi(['message'], {
  configProviderProps: configProviderPropsRef,
});

// 导出Store,可分离并导出为多个Store(Pinia特性)
export const useStore = defineStore('main', {
  state: () => {
    return {
      showLogin: false,
      isLogin: false,
      hasHotArticles: false,
      userInfo: localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users') || '{}') : false,
      articlesInfo: [
        {
          author: '',
          avatar: '',
          category: '',
          comments: 0,
          content: '',
          created_time: 0,
          description: '',
          id: 0,
          img: '',
          summary: '',
          title: '',
          user_id: 0,
          view: 0,
        },
      ],
      insiteMessages: null,
      myArticles: [
        {
          author: '',
          avatar: '',
          category: '',
          comments: 0,
          content: '',
          created_time: 0,
          description: '',
          id: 0,
          summary: '',
          title: '',
          user_id: 0,
          view: 0,
        },
      ],
      hotArticles: [
        {
          article_title: '',
          category: '',
          id: 0,
          summary: '',
        },
      ],
      comments: [],
      articleDetail: {
        author: '',
        avatar: '',
        category: '',
        comments: 0,
        content: '',
        created_time: 0,
        description: '',
        id: 0,
        img: '',
        summary: '',
        title: '',
        user_id: 0,
        view: 0,
      },
      archives: [],
      topics: [],
      banner: [],
      insiteStats: [],
      searchResults: [],
      currentPage: 1,
      totalPages: 1,
      messageTotal: 0,
      hasNextPage: false,
      editorTheme: 'dark',
      isSkeleton: true,
      token: localStorage.getItem('token') || undefined,
    };
  },
  getters: {
    loginCheck: (state) => state.userInfo,
  },
  actions: {
    getUsers(token: string) {
      this.token = token;
      get_user(token).then((res) => {
        const users = res.data.data;
        this.updateUserInfo(users);
      });
    },
    userLogout() {
      this.delAuth();
      this.setNavbar(false);
      logout(localStorage.getItem('token')).then((res) => {
        message.info(res.data.msg);
      });
    },
    setNavbar(status: boolean) {
      this.isLogin = status;
    },
    updateUserInfo(data: JSON) {
      this.userInfo = data;
      localStorage.setItem('users', JSON.stringify(data));
    },
    delAuth() {
      this.token = undefined;
      localStorage.removeItem('users');
    },
  },
});

export default pinia;
