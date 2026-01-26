// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url'; // 추가
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url)); // 추가

export default defineConfig({
  base: '/DailySprout/', 
  plugins: [react()],
  resolve: {
    alias: [
      // 이 방식으로 설정하면 조금 더 유연하게 경로를 잡습니다.
      { find: '@', replacement: path.resolve(__dirname, 'src') }
    ]
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
});
