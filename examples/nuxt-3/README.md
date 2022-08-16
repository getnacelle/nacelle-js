# Nuxt 3 Nacelle Example

Example of a Nacelle powered storefront with similar functionality to the [Nuxt starter](../../starters/nuxt/) but built using the Nuxt 3 RC.

## Features

- Static prerendering of all pages
- Global Cart/Checkout state managed with composables instead of Vuex
- `@nacelle/shopify-checkout` to manage checking out with Shopify
- TS for composables to provide better editor hints and DX since they're auto imported, while using JS for Vue components and other files.

## Nuxt 3 Caveats

- v1.x of the `@nacelle/storefront-sdk` currently exports esm as `esm.js`, which the [Nuxt 3 docs call out as an unsupported pattern](https://v3.nuxtjs.org/guide/going-further/esm#what-is-native-esm) for native Node.js ESM. The result is that the storefront sdk can be used in dev mode, but not in production builds. So to safely use the storefront sdk, it needs to be transpiled by adding it to the [`build.transpile` key of the `nuxt.config.ts file`](./nuxt.config.ts).

    ```js
     build: {
    // need to transpile the storefront-sdk for Node to use as ESM 
    transpile: ['@nacelle/storefront-sdk']
  },
    ```

- Nuxt 3 currently doesn't support async keys in the config file. So currently the only way to pre-render routes using Nacelle data, is to use build hook which adds routes to the `prerender.routes` key of the nitro config. See [issue 4919](https://github.com/nuxt/framework/issues/4919) for progress on handling async routes and the current workaround. Also track this [RFC for the proposed hybrid mode](https://github.com/nuxt/framework/discussions/560) which will allow for a combination of static and generated routes. There's also a [github issue](https://github.com/nuxt/framework/issues/6411) for tracking the implementation of a full static mode closer to Nuxt 2's static mode.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

## if in this monorepo, from the root:
npm run bootstrap 
```

Copy the .env.example to a file called `.env` and replace the values marked with `<>` with the values for your Nacelle space and Shopify storefront.

### Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

### Production

Build the application for production:

```bash
npm run generate
```

Locally preview production build:

```bash
npx serve .output/public
```

Checkout the [deployment documentation](https://v3.nuxtjs.org/guide/deploy/presets) for more information.
