import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt', // Evita o loop de recarregamento
      injectRegister: 'auto',
      workbox: {
        cleanupOutdatedCaches: true,
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        skipWaiting: true,
        clientsClaim: true,
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
            src: 'icon192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'icon192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable' // Isso tira o erro de ícone do Android
          },
          {
            src: 'icon512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'icon512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ],
        screenshots: [
          {
            src: 'icon512.png', 
            sizes: '512x512',
            type: 'image/png',
            form_factor: 'narrow', // Identifica como print de celular
            label: 'Matilha News no Celular'
          },
          {
            src: 'icon512.png', 
            sizes: '512x512',
            type: 'image/png',
            form_factor: 'wide', // Identifica como print de computador
            label: 'Portal Matilha News Desktop'
          }
        ]
      }
    })
  ]
})