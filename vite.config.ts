// vite.config.ts
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
// 1. 아래 줄을 삭제하세요!
// import tsconfigPaths from 'vite-tsconfig-paths'; 

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: '/DailySprout/', 
    // 2. 아래 plugins 안의 tsconfigPaths()를 삭제하세요!
    plugins: [react() /*], 
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
    },
  };
});
