import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';

const resolve = (dir: string) => path.resolve(__dirname, dir);

export default defineConfig({
  base: '/', // 启动服务公共路径
  publicDir: resolve('public'), // 静态资源路径
  mode: 'production', // 指定mode，会覆盖掉serve和build默认的mode
  cacheDir: 'node_modules/.vite', // 默认vite缓存路径
  appType: 'spa', // 应用种类 spa | mpa | custom

  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
        {
          'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'],
        },
      ],
    }),
    Components({
      resolvers: [NaiveUiResolver()],
    }),
  ],
  server: {
    cors: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000/api',
        secure: true,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    manifest: false, // 是否生成一个 manifest.json 的文件在assets目录下
    target: 'modules',
    assetsDir: 'static', // 指定打包生成静态资源的存放路径
    assetsInlineLimit: 4096, // 默认4kb 配置图片编译base64时大小，大于以原文件引入，小于会直接编译
    chunkSizeWarningLimit: 1024, // 打包文件超大小警告显示，默认500kbs
    emptyOutDir: true, // 构建时是否清空OutDir，再把新构建的文件放进去
    sourcemap: false, // 构建后是否生成 source map 文件
  },
});
