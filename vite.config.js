import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Sur GitHub Pages, le site est servi depuis https://<compte>.github.io/<repo>/ :
// les assets doivent donc être préfixés par le nom du repo. On le lit dans la
// variable que GitHub Actions fournit au build (GITHUB_REPOSITORY = "compte/repo"),
// ce qui évite d'avoir à écrire le nom du repo en dur ici.
// En local, `base` reste "/".
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1]

export default defineConfig({
  base: repo ? `/${repo}/` : '/',
  plugins: [react(), tailwindcss()],
})
