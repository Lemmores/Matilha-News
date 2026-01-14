import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({ 
  registerType: 'autoUpdate',
  injectRegister: 'script', // Força a injeção do registro
  workbox: {
    globPatterns: ['**/*.{js,css,html,ico,png,svg}'] // Garante que ele faz cache de tudo
  },
  manifest: {
    name: 'Matilha News',
    short_name: 'Matilha',
    description: 'Notícias, agenda e watch parties da Matilha RED Canids',
    theme_color: '#000000',
    background_color: '#ffffff',
    display: 'standalone',
    start_url: '/',
    icons: [
      {
        src: 'icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable' // Ajuda no Android
      },
      {
        src: 'icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable'
      }
    ]
  }
})
  ]
})