import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  server: {
    port: 4000,
    hmr: {
      port: 4001,
    },
  },
  optimizeDeps: {
    // exclude node_modules from scanning for faster start
    exclude: ['fastify'],
  },
  resolve: {
    alias: [
      { find: '@/', replacement: resolve(__dirname, 'src/') },
      { find: '@/modules', replacement: resolve(__dirname, 'src/modules') },
      { find: '@/config', replacement: resolve(__dirname, 'src/config') },
      { find: '@/lib', replacement: resolve(__dirname, 'src/lib') },
    ],
  },
});
