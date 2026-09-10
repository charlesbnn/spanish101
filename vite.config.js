import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// `base` doit correspondre au nom du repo GitHub pour que les assets
// se chargent correctement une fois déployés sur GitHub Pages.
export default defineConfig({
  base: '/Esp/',
  plugins: [react(), tailwindcss()],
})
