import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import UnoCSS from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // @ts-ignore
    uni.default(),
    UnoCSS(),
    Components({
      dts: 'src/types/components.d.ts',
    }),
    AutoImport({
      imports: ['vue', 'pinia', 'uni-app', '@vueuse/core'],
      dts: 'src/types/auto-imports.d.ts',
      dirs: ['src/utils/**', 'src/stores/**', 'src/api/**'],
      vueTemplate: true,
    }),
  ],
})
