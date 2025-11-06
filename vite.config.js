import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/nagimasen-survey/',   // ← add this line (repo name exactly)
});
