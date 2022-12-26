<template>
  <n-space vertical>
    <img
      src="/src/assets/logo.svg"
      class="logo mx-auto"
    >
    <div class="flex justify-center">
      <div class="text-2xl font-bold mb-4">
        专注技术，分享生活。
      </div>
    </div>
    <n-tabs
      default-value="login"
      justify-content="space-evenly"
      type="segment"
      animated
    >
      <n-tab-pane
        name="login"
        tab="登录"
      >
        <n-space vertical>
          <n-form
            ref="formRef"
            block
            :model="formValue"
          >
            <n-space vertical>
              <n-input
                v-model:value="formValue.username"
                type="text"
                placeholder="用户名"
                :maxlength="32"
                path="username"
              >
                <template #prefix>
                  <n-icon :component="UserIcon" />
                </template>
              </n-input>
              <n-input
                v-model:value="formValue.password"
                type="password"
                show-password-on="mousedown"
                placeholder="密码"
                :maxlength="32"
                path="password"
              >
                <template #prefix>
                  <n-icon :component="PasswordIcon" />
                </template>
              </n-input>
            </n-space>
          </n-form>
          <n-space justify="end">
            <n-button text>
              忘记密码？
            </n-button>
          </n-space>
          <n-button
            strong
            :loading="loadingRef"
            class="w-full mb-8 mt-4"
            @click="handleLogin"
          >
            <template #icon>
              <n-icon><LoginIcon /></n-icon>
            </template>
            登录
          </n-button>
        </n-space>
      </n-tab-pane>
      <n-tab-pane
        name="register"
        tab="注册"
      >
        <n-form
          ref="regFormRef"
          block
          :model="regFormValue"
        >
          <n-space vertical>
            <n-input
              v-model:value="regFormValue.username"
              type="text"
              placeholder="用户名(由字母或数字组成)"
              :maxlength="32"
              path="username"
            >
              <template #prefix>
                <n-icon :component="UserIcon" />
              </template>
            </n-input>
            <n-input
              v-model:value="regFormValue.nickname"
              type="text"
              placeholder="用户昵称"
              :maxlength="32"
              path="nickname"
            >
              <template #prefix>
                <n-icon :component="NicknameIcon" />
              </template>
            </n-input>
            <n-input
              v-model:value="regFormValue.password"
              type="password"
              show-password-on="mousedown"
              placeholder="密码"
              :maxlength="32"
              path="password"
            >
              <template #prefix>
                <n-icon :component="PasswordIcon" />
              </template>
            </n-input>
            <n-input
              v-model:value="regFormValue.repassword"
              type="password"
              show-password-on="mousedown"
              placeholder="重复密码"
              :maxlength="32"
              path="repassword"
            >
              <template #prefix>
                <n-icon :component="PasswordIcon" />
              </template>
            </n-input>
          </n-space>
        </n-form>
        <n-button
          strong
          :loading="loadingRef"
          class="w-full mt-4"
          @click="handleRegister"
        >
          <template #icon>
            <n-icon><LoginIcon /></n-icon>
          </template>
          注册
        </n-button>
        <n-divider>提示</n-divider>
        <ul>
          <!-- <li>本站为邀请制,暂不开放注册.</li> -->
          <li>
            用户名与密码不能包含中文;密码长度大于8位,并且必须包含字母和数字.
          </li>
        </ul>
      </n-tab-pane>
    </n-tabs>
  </n-space>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { FormInst, useMessage } from "naive-ui";

import {
  ArrowRedo as LoginIcon,
  PersonCircleOutline as UserIcon,
  Key as PasswordIcon,
  FingerPrint as NicknameIcon,
} from "@vicons/ionicons5";
import { login, register } from "../api/users";
// Pinia 状态管理
import { useStore } from "../store";
import router from "../router";
const store = useStore();

const formRef = ref<FormInst | null>(null);
const regFormRef = ref<FormInst | null>(null);
const loadingRef = ref(false);

const message = useMessage();
const formValue = ref({
  username: "",
  password: "",
});

const regFormValue = ref({
  username: "",
  nickname: "",
  password: "",
  repassword: "",
});

function handleLogin() {
  let user_info = JSON.stringify(formValue.value);
  loadingRef.value = true;
  login(user_info)
    .then((res) => {
      if (res.data.code != 200) {
        message.error(res.data.msg);
        loadingRef.value = false;
      } else {
        let token = res.data.data.access_token;
        try {
          localStorage.setItem("token", token);
          store.setNavbar(true);
          store.getUsers(token);
          store.showLogin = false;
          message.success(res.data.msg);
          loadingRef.value = false;
        } catch (error) {
          message.error("登陆失败了,再试一次?");
        }
      }
    })
    .catch((err) => {
      message.error(err);
    });
}

function handleRegister() {
  let user_info = JSON.stringify(regFormValue.value);
  loadingRef.value = true;
  register(user_info)
    .then((res) => {
      if (res.data.code != 200) {
        message.error(res.data.msg);
        loadingRef.value = false;
      } else {
        try {
          message.success(res.data.msg);
          loadingRef.value = false;
          store.showLogin = false;
        } catch (error) {
          message.error("注册失败了,再试一次?");
        }
      }
    })
    .catch((err) => {
      message.error(err);
    });
}
</script>

<style scoped>
.logo {
  height: 64px;
  width: 64px;
}
</style>
