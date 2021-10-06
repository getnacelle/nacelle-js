import fetch from 'isomorphic-unfetch';

function getHandles() {
  return fetch('https://hailfrequency.com/v3/graphql', {
    method: 'POST',
    headers: {
      'x-nacelle-space-token': process.env.NACELLE_GRAPHQL_TOKEN,
      'x-nacelle-space-id': process.env.NACELLE_SPACE_ID
    },
    body: JSON.stringify({
      query: `
        {
          products: getProducts {
            items {
              handle
            }
          }
          collections: getCollections {
            items {
              handle
            }
          }
        }
      `
    })
  });
}

function buildRoutes(items, path) {
  return items.map((item) => {
    return `${path}${item.handle}`;
  });
}

export default {
  // Target: https://go.nuxtjs.dev/config-target
  ssr: true,
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-starter',
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
  plugins: [{ src: '~/plugins/globalSetup.js' }],

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
      id: process.env.NACELLE_SPACE_ID,
      token: process.env.NACELLE_GRAPHQL_TOKEN,
      nacelleEndpoint: process.env.NACELLE_ENDPOINT,
      locale: process.env.NACELLE_LOCALE || 'en-us'
    },
    shopify: {
      storefrontCheckoutToken: process.env.SHOPIFY_STOREFRONT_CHECKOUT_TOKEN,
      myshopifyDomain: process.env.MYSHOPIFY_DOMAIN,
      storefrontApiVersion: process.env.STOREFRONT_API_VERSION
    }
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxt/image',
    '@nuxtjs/composition-api/module',
    '@nuxtjs/pwa'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  generate: {
    crawler: false,
    concurrency: 25,
    interval: 2000,
    fallback: true,
    routes() {
      return getHandles()
        .then((res) => res.json())
        .then(({ data }) => {
          return [
            ...buildRoutes(data.products.items, '/products/'),
            ...buildRoutes(data.collections.items, '/collections/')
          ];
        });
    }
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
