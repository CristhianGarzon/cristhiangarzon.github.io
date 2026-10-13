import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { seo } from './seo/plugin';

// Served from https://cristhiangarzon.github.io/
export default defineConfig({
  plugins: [react(), seo()],
  base: '/',
});
