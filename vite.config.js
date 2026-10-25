import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/experiment-face-v2/",
  plugins: [react()],
})