<template>
  <nav class="navbar px-4 md:px-8">
    <n-grid cols="4 m:8 l:12" x-gap="8" item-responsive responsive="screen">
      <n-grid-item span="0 m:1">
        <router-link :to="{ name: 'index' }">
          <div class="nav-common">
            <img src="/images/logo.svg" class="hidden sm:inline w-8 h-8 mr-2" />
            <div class="hidden md:inline font-bold text-lg">塔格德</div>
          </div>
        </router-link>
      </n-grid-item>
      <n-grid-item span="0 m:0 l:3" />
      <n-grid-item span="3 m:4">
        <div class="nav-common mx-auto">
          <n-grid cols="4">
            <n-grid-item class="mx-auto">
              <router-link
                :to="{
                  name: 'index',
                }"
              >
                <n-button text class="font-semibold">
                  <template #icon>
                    <n-icon :component="HomeIcon" size="24" />
                  </template>
                  <div class="hidden md:inline font-semibold ml-2">首页</div>
                </n-button>
              </router-link>
            </n-grid-item>
            <n-grid-item class="mx-auto">
              <router-link
                :to="{
                  name: 'tags',
                }"
              >
                <n-button text class="font-semibold">
                  <template #icon>
                    <n-icon :component="BookIcon" size="24" />
                  </template>
                  <div class="hidden md:inline font-semibold ml-2">文章仓库</div>
                </n-button>
              </router-link>
            </n-grid-item>
            <n-grid-item class="mx-auto">
              <router-link
                :to="{
                  name: 'lab',
                }"
              >
                <n-button text class="font-semibold">
                  <template #icon>
                    <n-icon :component="LabIcon" size="24" />
                  </template>
                  <div class="hidden md:inline font-semibold ml-2">实验室</div>
                </n-button>
              </router-link>
            </n-grid-item>
            <n-grid-item class="mx-auto">
              <router-link
                :to="{
                  name: 'about',
                }"
              >
                <n-button text class="font-semibold">
                  <template #icon>
                    <n-icon :component="UserIcon" size="24" />
                  </template>
                  <div class="hidden md:inline font-semibold ml-2">关于我</div>
                </n-button>
              </router-link>
            </n-grid-item>
          </n-grid>
        </div>
      </n-grid-item>
      <n-grid-item span="0 l:1" />
      <n-grid-item span="0 m:2">
        <searchbar class="flex justify-center items-center h-16 w-full" />
      </n-grid-item>
      <n-grid-item span="1">
        <div v-if="store.isLogin" class="nav-common">
          <div class="flex items-center justify-center">
            <n-image v-if="!store.insiteMessages" :src="store.userInfo.avatar" alt="" class="w-8 h-8 rounded-md" preview-disabled />
            <div v-else>
              <n-badge :value="1" dot class="w-8 h-8">
                <n-image :src="store.userInfo.avatar" alt="" class="w-8 h-8 rounded-md" preview-disabled />
              </n-badge>
            </div>
            <n-dropdown :options="options" :show-arrow="true" placement="bottom-end" @select="handleSelect">
              <n-button text class="mx-2">
                {{ store.userInfo.nickname }}
                <n-icon :component="ArrowIcon" />
              </n-button>
            </n-dropdown>
          </div>
        </div>
        <div v-else class="nav-common">
          <n-button round @click="store.showLogin = true"> 登录/注册 </n-button>
        </div>
      </n-grid-item>
    </n-grid>
    <n-modal v-model:show="store.showLogin" transform-origin="center">
      <n-card class="login-modal">
        <login />
      </n-card>
    </n-modal>
  </nav>
</template>

<script setup lang="ts">
import { h, Component } from 'vue';
import { NIcon, useMessage, NAvatar, NText } from 'naive-ui';
import { RouterLink } from 'vue-router';
import {
  LibraryOutline as BookIcon,
  PersonCircleOutline as UserIcon,
  LogOutOutline as LogoutIcon,
  HomeOutline as HomeIcon,
  ChevronForward as ArrowIcon,
  PlanetOutline as LabIcon,
  AtCircleOutline as MessageIcon,
} from '@vicons/ionicons5';

// 登录组件
import login from '~/components/site-login.vue';
import searchbar from '~/components/site-search.vue';
import messages from '~/components/site-messages.vue';
// Pinia 状态管理
import { useStore } from '../store';

const store = useStore();
const message = useMessage();

const options = [
  {
    key: 'header',
    type: 'render',
    render: renderHeader,
  },
  {
    type: 'divider',
    key: 'd1',
  },
  {
    label: '站内消息',
    key: 'messages',
    icon: renderIcon(MessageIcon),
    children: [
      {
        key: 'messages',
        type: 'render',
        render: renderMessages,
      },
    ],
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'space',
          },
        },
        { default: () => '个人空间' }
      ),
    key: 'profile',
    icon: renderIcon(UserIcon),
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: renderIcon(LogoutIcon),
  },
];

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

function renderHeader() {
  return h(
    'div',
    {
      style: 'display: flex; align-items: center; padding: 8px 1rem;',
    },
    [
      h(NAvatar, {
        class: 'mr-4 w-16 h-16',
        src: store.userInfo.avatar,
      }),
      h('div', null, [
        h('div', null, [h(NText, { depth: 2, class: 'font-bold text-xl' }, { default: () => store.userInfo.nickname })]),
        h('div', { style: 'font-size: 12px;max-width:100px;' }, [h(NText, { depth: 3 }, { default: () => store.userInfo.description })]),
      ]),
    ]
  );
}

function renderMessages() {
  return h('div', { class: 'flex flex-col w-40 mx-4 my-2' }, [h(messages)]);
}

function handleSelect(key: string | number) {
  if (key == 'logout') {
    store.userLogout();
    message.success('已退出登录');
  }
}
</script>

<style scoped>
.navbar {
  background-color: #202022ab;
  position: sticky;
  top: 0px;
  margin-top: 0px;
  z-index: 1000;
  height: 4rem;
  width: 100%;
  backdrop-filter: blur(24px);
  justify-content: center;
}

.login-modal {
  width: 300px;
}
.nav-common {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;
}
</style>
