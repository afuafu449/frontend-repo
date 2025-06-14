import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/smart-resume-frontend/', // 👉 ensures correct asset paths on GitHub Pages
});
```
