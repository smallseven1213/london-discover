import { defineConfig } from 'vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { qwikCity } from '@builder.io/qwik-city/vite';
import { qwikReact } from '@builder.io/qwik-react/vite';
import { wgslVitePlugin } from '@vgpu/wgsl/loader-vite';

export default defineConfig(() => ({
  base: '/london-discover/',
  plugins: [qwikCity(), qwikVite(), qwikReact(), wgslVitePlugin()],
  server: { port: 5173, strictPort: true },
  preview: { port: 4173, strictPort: true },
}));
