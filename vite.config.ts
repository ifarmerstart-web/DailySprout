import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  // GitHub Pages 배포 경로 설정
  base: '/DailySprout/', 
  
  plugins: [react()],
  
  resolve: {
    alias: {
      // '@' 별칭을 'src' 폴더로 연결
      '@': path.resolve(__dirname, './src'),
    },
  },
  
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
