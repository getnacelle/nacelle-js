import { buildRoutes } from './utils/buildRoutes';

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-2',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/nacelle-sdk.js', '~/plugins/nuxt-client-init.client.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Nuxt image component: https://image.nuxtjs.org/
  image: {
    domains: [
      'https://cdn.shopify.com',
      'https://cdn.accentuate.io',
      'https://images.ctfassets.net'
    ]
  },

  publicRuntimeConfig: {
    nacelle: {
      storefrontEndpoint: process.env.NACELLE_STOREFRONT_ENDPOINT,
      token: process.env.NACELLE_STOREFRONT_TOKEN,
      locale: process.env.NACELLE_STOREFRONT_LOCALE
    },
    shopify: {
      myshopifyDomain: process.env.MYSHOPIFY_DOMAIN,
      storefrontCheckoutToken: process.env.SHOPIFY_STOREFRONT_CHECKOUT_TOKEN,
      storefrontApiVersion: process.env.SHOPIFY_STOREFRONT_API_VERSION
    }
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxt/image',
    '@nuxtjs/pwa'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  generate: {
    crawler: false,
    fallback: true,
    routes: () => buildRoutes()
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  vue: {
    config: {
      productionTip: false,
      devtools: true
    }
  }
};
