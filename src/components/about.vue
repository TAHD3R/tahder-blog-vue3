<template>
  <n-card class="mb-4">
    <n-grid :x-gap="12" :y-gap="8" :cols="4">
      <n-grid-item span="4">
        <n-space horizontal>
          <img
            src="/src/assets/robot.png"
            alt=""
            class="w-20 h-20 rounded-md mb-4"
          />

          <n-space vertical>
            <n-space horizontal class="flex items-center mb-2">
              <div class="font-bold text-xl">塔格德</div>
              <n-gradient-text class="font-bold" type="info"
                >@北京化工大学</n-gradient-text
              >
            </n-space>
            <n-space horizontal>
              <n-tag round :bordered="true" type="success"> 全栈开发 </n-tag>
              <n-tag round :bordered="true" type="success"> Linux运维 </n-tag>
            </n-space>
          </n-space>
          <n-p class="mb-8">
            塔格德(Тағдыр)一词的含义是命运, 来源于哈萨克语。
            我总对自己说：永远不要屈服于命运, 去征服它。
          </n-p>
        </n-space>
      </n-grid-item>
    </n-grid>

    <div class="flex items-center justify-between mt-4">
      <n-button text style="font-size: 24px">
        <n-icon>
          <WeChat />
        </n-icon>
      </n-button>

      <n-button text style="font-size: 24px">
        <n-icon>
          <LinkIcon />
        </n-icon>
      </n-button>
      <n-button text style="font-size: 24px">
        <n-icon>
          <cash-icon />
        </n-icon>
      </n-button>
    </div>
  </n-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  BalloonSharp as CashIcon,
  LogoWechat as WeChat,
  LogoGithub as LinkIcon,
  ChatbubbleEllipsesOutline as CommentIcon,
} from "@vicons/ionicons5";

export default defineComponent({
  components: {
    CashIcon,
    WeChat,
    LinkIcon,
  },
});
</script>

<style scoped>
.avatar {
  width: 128px;
  height: 128px;
}
</style>
