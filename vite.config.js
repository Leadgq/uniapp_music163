import {
  defineConfig
} from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import AutoImport from "unplugin-auto-import/vite";
export default defineConfig({
  plugins: [
    uni(),
    AutoImport({
      imports: ['vue', 'uni-app', 'pinia'],
      include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/, /\.vue\?vue/, // .vue
          /\.md$/, // .md
          /.*\.nvue$/,
        ],
    })
  ]
});
