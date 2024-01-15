import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  server: {
    proxy: {
      '/api/service_1': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/api/service_2': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
});
