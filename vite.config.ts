import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    // Pre-bundle heavy dependencies at server startup instead of lazily on
    // first browser request. Without this, lucide-react (1400+ icon exports)
    // causes multi-second "pending" requests in the Daytona sandbox preview.
    include: ['lucide-react', 'tailwind-merge', 'framer-motion', 'clsx'],
  },
});
