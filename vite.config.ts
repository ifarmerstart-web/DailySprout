import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  // 현재 작업 디렉토리에서 환경 변수 로드
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    // GitHub Pages 경로 설정
    base: '/DailySprout/', 
    
    plugins: [react()],
    
    resolve: {
      alias: {
        // '@' 별칭을 src 폴더로 매핑
        '@': path.resolve(__dirname, './src'),
      },
    },

    build: {
      // 빌드 결과물 저장 위치
      outDir: 'dist',
      // 빈 폴더 정리 후 빌드
      emptyOutDir: true,
      rollupOptions: {
        input: {
          // index.html을 빌드의 시작점으로 명시 (경로 치환의 핵심)
          main: path.resolve(__dirname, 'index.html'),
        },
      },
    },
  };
});
