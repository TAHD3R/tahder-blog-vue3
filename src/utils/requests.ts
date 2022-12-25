import axios from "axios";
import { computed } from "vue";
import { createDiscreteApi, ConfigProviderProps, darkTheme } from "naive-ui";
import axiosRetry from "axios-retry";
// Pinia 状态管理
import { useStore } from "../store";
import pinia from "../store";
const store = useStore(pinia);

// 提示模块
const configProviderPropsRef = computed<ConfigProviderProps>(() => ({
  theme: darkTheme,
}));
const { message } = createDiscreteApi(["message"], {
  configProviderProps: configProviderPropsRef,
});

// 封装Axios请求
const request = axios.create({
  baseURL: "/api",
});

// 自动重试
axiosRetry(request, {
  retries: 1,
  shouldResetTimeout: true,
  retryDelay: (retryCount) => {
    return retryCount * 3000; // 重复请求延迟，每次请求之间间隔10s
  },
});

// 请求拦截器
request.interceptors.request.use(
  (config: any) => {
    // 统一设置用户身份 token
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization =
        "Bearer" + " " + localStorage.getItem("token");
    }
    store.isSkeleton = false;
    return config;
  },
  (error) => {
    message.error(error.message);
    return Promise.reject(error);
  }
);

// 相应拦截器
request.interceptors.response.use(
  (response) => {
    // 统一设置接口相应错误, 比如 token 过期失效, 服务端异常
    if (response.data.err == "密匙已过期") {
      localStorage.removeItem("token");
      store.delAuth();
      store.setNavbar(false);
      message.info("Token已过期, 请重新登录。");
    }
    return response;
  },
  (error) => {
    /***** 接收到异常响应的处理开始 *****/
    if (error && error.response) {
      // 1.公共错误处理
      // 2.根据响应码具体处理
      switch (error.response.status) {
        case 400:
          error.message = "错误请求";
          break;
        case 401:
          error.message = "未授权，请重新登录";
          break;
        case 403:
          error.message = "拒绝访问";
          break;
        case 404:
          error.message = "请求错误,未找到该资源";
          break;
        case 405:
          error.message = "请求方法未允许";
          break;
        case 408:
          error.message = "请求超时";
          break;
        case 500:
          error.message = "服务器端出错";
          break;
        case 501:
          error.message = "网络未实现";
          break;
        case 502:
          error.message = "网络错误";
          break;
        case 503:
          error.message = "服务不可用";
          break;
        case 504:
          error.message = "网络超时";
          break;
        case 505:
          error.message = "http版本不支持该请求";
          break;
        default:
          error.message = `连接错误${error.response.status}`;
      }
    } else {
      // 超时处理
      if (JSON.stringify(error).includes("timeout")) {
        message.error(error.message);
      }
      error.message = "连接服务器失败";
    }
    message.error(error.message);
    return Promise.reject(error);
  }
);

export default request;
