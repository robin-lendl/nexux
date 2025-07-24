// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: { lang: 'de' },
      titleTemplate: '%s – Agora Blog',
      meta: [
        { name: 'description', content: 'Agora Blog - Nachhilfe finden und anbieten' },
        { property: 'og:site_name', content: 'Agora Blog' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' }
      ],
      link: [
        { rel: 'canonical', href: 'https://blog.agora-nachhilfe.de' }
      ]
    }
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css', '~/assets/css/fonts.css'],
  modules: [
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    '@nuxt/content'
  ],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})