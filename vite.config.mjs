import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages serves the site from /whetherapp-react/, so the build needs that base path.
// The preview server serves that build, so it needs it too. The dev server keeps using "/".
export default defineConfig(({ command, isPreview }) => ({
  base: command === 'build' || isPreview ? '/whetherapp-react/' : '/',
  plugins: [react()],
  build: {
    outDir: 'build',
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.js'],
  },
}));
