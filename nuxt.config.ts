// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-16',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    }
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css', '~/assets/css/fonts.css'],
  modules: [
    '@nuxt/content'
  ],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

})
