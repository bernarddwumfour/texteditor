import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: ['./index.html', './sheet.html', './views/docs.html','./notification.html'],
    },
  },
});
