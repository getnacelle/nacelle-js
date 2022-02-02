# Nacelle Nuxt 2 Starter

Nacelle-powered Nuxt Starter project designed to get you up and running quickly. This project uses [Nuxt 2](https://nuxtjs.org) (with Vue 2 Options API).

Please note that this starter supports Nacelle's [v2 backend](https://dashboard.nacelle.com) only.

## Getting Started

First, pull down a fresh copy of the Nuxt 2 Starter:

```
npx degit https://github.com/getnacelle/nacelle-js/starters/nuxt
```

Next, install dependencies and run the project.

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

## Project Directory

### `components`

- `ProductCard.vue` - Displays a product with variant selectors and an add to cart button.

### `pages`

- `404.vue` - A simple 404 page
- `cart.vue` - A shopping cart page powered by Vuex
- `index.vue` - A simple homepage to get you started
- `collections/_handle.vue` - A dynamic collections page, with data being queried using the Nacelle Storefront SDK.
- `products/_handle.vue` - A dynamic products page, with data being queried using the Nacelle Storefront SDK.

### `plugins`

- `nacelle-sdk.js` - Initializes the Nacelle Storefront SDK and injects it as a global plugin `$nacelle`
- `nuxt-client-init.js` - Registers `nuxtClientInit` Vuex action that runs once on the client when the app starts.

### `store`

- `cart.js` - Vuex module containing all cart-related functionality.
- `checkout.js` - Vuex module containing all checkout-related functionality.
- `index.js` - Vuex module containing global actions - `nuxtClientInit`

### `utils`

- `buildRoutes.js` - Build an array of dynamic `/collection/_handle.vue` and `/products/_handle.vue` routes to generate.
- `getCartVariant.js` - Formats a variant for use in the cart.
- `getSelectedVariant.js` - Finds the selected variant based on an array of selected options.

### Nacelle

To learn more about Nacelle, check out our [Documentation](https://nacelle.com/docs).

For more information on querying data from Nacelle, check out our documentation on Nacelle's [Storefront SDK](https://nacelle.com/docs/querying-data/storefront-sdk) and [Storefront API](https://nacelle.com/docs/querying-data/storefront-api).

Finally, here's where you can find the Nacelle packages used in this project:

- [`@nacelle/storefront-sdk`](https://www.npmjs.com/package/@nacelle/storefront-sdk) - Nacelle Storefront SDK, providing methods to query data from your Nacelle space.
- [`@nacelle/shopify-checkout`](https://github.com/getnacelle/nacelle-js/tree/main/packages/shopify-checkout) - Helpful utilities for handling Shopify checkouts.

### Nuxt.js

To learn more about Nuxt.js, take a look at the following resources:

- [Nuxt.js Documentation](https://nuxtjs.org/docs) - learn about Nuxt.js features and API.
- [Learn Nuxt.js](https://nuxtjs.org/tutorials) - a set of helpful Nuxt.js tutorials.

You can check out [the Nuxt.js GitHub repository](https://github.com/nuxt/nuxt.js)
