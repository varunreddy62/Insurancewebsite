import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const API_URL = env.VITE_API_URL;

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        '/api': {
          target: API_URL,
          changeOrigin: true,
        },
        '/admin': {
          target: API_URL,
          changeOrigin: true,
        },
      },
    },
  };
});
