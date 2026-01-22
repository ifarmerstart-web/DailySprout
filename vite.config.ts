import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  // 환경 변수 로드 경로를 현재 작업 디렉토리로 설정
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    // GitHub Pages 배포를 위한 기본 경로 (리포지토리 이름)
    base: '/DailySprout/', 
    
    plugins: [react()],
    
    resolve: {
      alias: {
        // '@' 별칭을 src 폴더로 연결
        '@': path.resolve(__dirname, './src'),
      },
    },

    build: {
      outDir: 'dist',
      // index.html을 빌드 입구로 명시하여 경로 치환을 강제함
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
