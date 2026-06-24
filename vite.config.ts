import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import rails from 'rails-vite-plugin'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // rails-vite-plugin: no Rack proxy, no config/vite.json. In dev it writes
    // tmp/rails-vite.json with the dev server URL (Rails reads it and points
    // <script> tags straight at Vite); in build it writes public/vite/manifest.json.
    // Client entry points are auto-discovered from app/javascript/entrypoints/.
    rails({
      sourceDir: 'app/javascript',
      // SSR entry, resolved under sourceDir → app/javascript/ssr/ssr.tsx.
      // `npx vite build --ssr` outputs ssr/ssr.js; run it with `node ssr/ssr.js`.
      ssr: 'ssr/ssr.tsx',
    }),
  ],
  resolve: {
    alias: {
      // Shared React code lives in app/frontend, separate from sourceDir. A
      // user-provided `@` overrides the plugin's default `@` → sourceDir alias.
      '@': fileURLToPath(new URL('./app/frontend', import.meta.url)),
    },
  },
  // noExternal: true bundles every dependency into the SSR output so the Node
  // process can boot without resolving anything from node_modules.
  ssr: {
    noExternal: true,
  },
})
