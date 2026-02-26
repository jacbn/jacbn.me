import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import checker from 'vite-plugin-checker';

import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    mdx({remarkPlugins: [remarkMath], rehypePlugins: [rehypeKatex]}),
    checker({
      typescript: {
        buildMode: true,
      },
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: [
          'import',
          'color-functions',
          'global-builtin',
          'if-function',
        ],
      },
    },
  },
});
