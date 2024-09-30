import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: ['./index.html', './sheet.html', './views/docs.html','./notification.html','text.html','new.html','paper.html','recent.html','recycle-bin.html','shared.html','video-chat.html'],
    },
  },
});
