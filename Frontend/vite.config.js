import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': {  
        target: 'http://localhost:3001', // তোমার Backend Server URL
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''), // `/api` অংশটি রিমুভ করবে
      },
    },
  },
  plugins: [react()], // 🔹 এখানে কমা যোগ করা হয়েছে
});
