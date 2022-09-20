import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://Kai-Al.github.io/rick-and-morty-react/",
  plugins: [react()]
})
