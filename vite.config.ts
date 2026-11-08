import {defineConfig} from 'vite';
import path from 'node:path';

export default defineConfig({
  root: path.resolve(__dirname, 'cms'),
  base: '/coba-dipikir/',
  build: {
    outDir: path.resolve(__dirname, 'dist/cms'),
    emptyOutDir: true,
  },
  server: {
    fs: {
      allow: [path.resolve(__dirname)],
    },
  },
});
