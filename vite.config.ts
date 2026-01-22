import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    // GitHub Pages 리포지토리 이름과 일치해야 함
    base: '/DailySprout/', 
    
    plugins: [react()],
    
    resolve: {
      alias: {
        // '@'를 src 폴더로 매핑
        '@': path.resolve(__dirname, './src'),
      },
    },

    build: {
      // 빌드 결과물이 저장될 폴더
      outDir: 'dist',
      // 빌드 프로세스가 시작되는 지점 명시
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
        },
      },
    },

    server: {
      port: 3000,
      host: '0.0.0.0',
    },
  };
});
