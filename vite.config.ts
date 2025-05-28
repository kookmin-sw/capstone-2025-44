import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/naver-news': {
        target: 'https://openapi.naver.com', // 실제 뉴스 JSON 파일이 호스팅된 URL로 변경
        changeOrigin: true,
        rewrite: path => path.replace(/^\/naver-news/, ''),
      },
    },
  },
})
