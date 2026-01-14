import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
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
        orientation: 'portrait', // Resolve o alerta "Specify your app's preferred device orientation"
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
            purpose: 'maskable' // Resolve o alerta "Fix the icon sizes"
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
        screenshots: [ // Resolve o alerta "Add screenshots to showcase your app"
          {
            src: 'icon512.png', 
            sizes: '512x512',
            type: 'image/png',
            form_factor: 'narrow',
            label: 'Matilha News Mobile'
          },
          {
            src: 'icon512.png', 
            sizes: '512x512',
            type: 'image/png',
            form_factor: 'wide',
            label: 'Matilha News Desktop'
          }
        ]
      }
    })
  ]
})