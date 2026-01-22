// vite.config.ts
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    base: '/DailySprout/',
    plugins: [react()],
    build: {
      // 빌드 결과물이 저장될 폴더
      outDir: 'dist',
      // 빌드 프로세스가 시작되는 지점이 루트임을 명시
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
});
