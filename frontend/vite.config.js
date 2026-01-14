import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
 VitePWA({
  registerType: 'prompt',
  workbox: {
    cleanupOutdatedCaches: true,
    skipWaiting: true, // Resolve o problema da imagem e1c5ed.jpg
    clientsClaim: true,
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
        src: 'icons/icon192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: 'icons/icon512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ],
    // Isso resolve o aviso de "Add screenshots" do PWABuilder
    screenshots: [
      {
        src: 'icons/icon512.png', // Use seu ícone provisoriamente se não tiver prints
        sizes: '512x512',
        type: 'image/png',
        form_factor: 'wide'
      }
    ]
  }
})
  ]
})