import { defineNuxtConfig } from 'nuxt';
import { buildRoutes } from './utils/buildRoutes';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  // Nuxt 3 will replace any runtimeConfig values with matching env
  //values if they're prefixed with NUXT, as long as they have an initial value
  // see https://v3.nuxtjs.org/guide/features/runtime-config/#environment-variables
  runtimeConfig: {
    public: {
      nacelle: {
        storefrontEndpoint: '',
        storefrontToken: '',
        previewToken: '',
        usePreview: false
      },
      shopify: {
        myShopifyDomain: '',
        StorefrontCheckoutToken: '',
      }
    }
  },

  generate: {
    routes: ['/cart', '/'],
    crawler: false
  },
  hooks: {
    // use a hook to include async routes in generate
    // workaround  suggeseted in https://github.com/nuxt/framework/issues/4919#issuecomment-1124349857
    // since Nuxt 3 currently doesn't allow for async config options
    async 'nitro:config'(nitroConfig) {
      if (nitroConfig.dev) {
        // if dev, don't do any generating
        return;
      }
      const routes = await buildRoutes();
      nitroConfig.prerender.routes.push(...routes);
    }
  },
  build: {
    // need to transpile the storefront-sdk for Node to use as ESM
    transpile: ['@nacelle/storefront-sdk']
  },
  autoImports: {
    // setup composables to search one level down since rc-7 added breaking change
    // could also re-export everything in a composables/index.js and remove this config.
    dirs: ['composables', 'composables/*/index.{ts,js,mjs,mts}']
  }
});
