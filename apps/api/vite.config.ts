import { defineConfig } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
// import tsconfigPaths from 'vite-tsconfig-paths';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  server: {
    port: 4000,
    // hmr: {
    //   port: 4001, // osobny port dla HMR
    // },
  },
  plugins: [
    // tsconfigPaths(),
    ...VitePluginNode({
      adapter: 'fastify',
      appPath: './src/server.ts',
      exportName: 'app',
      tsCompiler: 'swc', // używamy SWC zamiast tsc
    }),
  ],
  // optimizeDeps: {
  //   // Wyłączamy skanowanie node_modules dla szybszego startu
  //   exclude: ['fastify', '@fastify/autoload'],
  // },
  resolve: {
    alias: [
      { find: '@/', replacement: resolve(__dirname, 'src/') },
      { find: '@/modules', replacement: resolve(__dirname, 'src/modules') },
      { find: '@/config', replacement: resolve(__dirname, 'src/config') },
      { find: '@/lib', replacement: resolve(__dirname, 'src/lib') },
    ],
  },
  // build: {
  //   target: 'esnext',
  //   sourcemap: true,
  //   minify: false,
  //   rollupOptions: {
  //     external: ['fastify', /node:.*/],
  //   },
  // },
  // resolve: {
  //   alias: {
  //     '@/': resolve(__dirname, './src'),
  //   },
  // },

  // Cache configuration
  cacheDir: '.vite',
});
