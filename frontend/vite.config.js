import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      // Isso força a geração do service worker corretamente na raiz
      strategy: 'generateSW', 
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
      },
      manifest: {
        name: 'Matilha News',
        short_name: 'Matilha',
        description: 'Notícias, agenda e watch parties da Matilha RED Canids',
        theme_color: '#000000',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            // Removi o "icons/" porque no seu GitHub os ícones estão na raiz da pasta public
            src: 'icon192.png', 
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'icon192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable' // O Google exige um ícone maskable para Android
          },
          {
            src: 'icon512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          }
        ],
        screenshots: [
          {
            src: 'icon512.png', 
            sizes: '512x512',
            type: 'image/png',
            form_factor: 'wide',
            label: 'Matilha News Desktop'
          },
          {
            src: 'icon512.png', 
            sizes: '512x512',
            type: 'image/png',
            form_factor: 'narrow',
            label: 'Matilha News Mobile'
          }
        ]
      }
    })
  ]
})