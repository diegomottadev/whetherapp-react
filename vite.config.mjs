import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const EXPLANATION_PATH = /\/explanation-redux(\/)?$/;

// public/explanation-redux/index.html is a static page. The build and GitHub Pages serve it at
// /explanation-redux/, but the dev and preview servers send that URL to the React app instead.
// This adds the missing slash (the page uses relative links) and then serves the file.
const explanationPage = () => {
  const serveExplanation = (req, res, next) => {
    const [path, query = ''] = req.url.split('?');
    const match = path.match(EXPLANATION_PATH);
    if (!match) {
      return next();
    }
    if (!match[1]) {
      res.statusCode = 302;
      res.setHeader('Location', `${path}/${query ? `?${query}` : ''}`);
      return res.end();
    }
    req.url = `${path}index.html${query ? `?${query}` : ''}`;
    return next();
  };
  return {
    name: 'explanation-page',
    // Block bodies on purpose: if these hooks return a function, Vite runs it later as a post hook.
    configureServer(server) {
      server.middlewares.use(serveExplanation);
    },
    configurePreviewServer(server) {
      server.middlewares.use(serveExplanation);
    },
  };
};

// GitHub Pages serves the site from /whetherapp-react/, so the build needs that base path.
// The preview server serves that build, so it needs it too. The dev server keeps using "/".
export default defineConfig(({ command, isPreview }) => ({
  base: command === 'build' || isPreview ? '/whetherapp-react/' : '/',
  plugins: [react(), explanationPage()],
  build: {
    outDir: 'build',
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.js'],
  },
}));
