import { resolve } from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dts from 'unplugin-dts/vite'
import { libInjectCss } from 'vite-plugin-lib-inject-css';

// https://vite.dev/config/
export default defineConfig({
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, 'lib/main.tsx'),
      name: "SpreadsheetJSReact",
      fileName: "main",
    },
    rollupOptions: {
      external: ['react'],
      output: {
        globals: {
          react: "React",
        }
      },
    },
  },
  plugins: [
    react(),
    dts({
      tsconfigPath: './tsconfig.lib.json',
      rollupTypes: true,
    }),
    libInjectCss(),
  ],
  css: {
    modules: {
      localsConvention: 'camelCaseOnly'
    },
  }
  // css: {
    // preprocessorOptions: {
    //   scss: {
    //     importers: [
    //       // ...
    //     ],
    //   },
    // },
  // },
})

