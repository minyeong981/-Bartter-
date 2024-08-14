import {TanStackRouterVite} from '@tanstack/router-plugin/vite';
import viteReact from '@vitejs/plugin-react';
import svgr from '@svgr/rollup';
import {defineConfig} from 'vite';
import * as path from 'node:path';
import htmlEnv from 'vite-plugin-html-env';

const isTest = process.env.NODE_ENV === 'test';

export default defineConfig({
  plugins: [
    !isTest && TanStackRouterVite(),
    viteReact(),
    svgr({dimensions: false, svgo: false, typescript: true}),
  ],
  resolve: {
    alias: [{find: '@', replacement: path.resolve(__dirname, 'src')}],
  },
  define: {
    'process.env': {
      VITE_KAKAOMAP_API_KEY: process.env.VITE_KAKAOMAP_API_KEY,
    },
  }
});
