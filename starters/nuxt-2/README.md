# Nacelle Nuxt 2 Starter

Nacelle-powered Nuxt Starter project designed to get you up and running quickly.

## Build Setup

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

## Project Setup

### `components`

`ProductCard.vue`

Component for displaying a product with variant selectors and an add to cart button.

### `pages`

Static pages: `404.vue`, `cart.vue`, `index.vue`.

Dynamic pages: `/collections/_handle.vue`, `/products/_handle.vue`.

### `plugins`

nacelle-sdk.js

Plugin for injecting a global instance of the Nacelle Storefront SDK.

`nuxt-client-init.js`

Plugin for registering a `nuxtClientInit` Vuex action run once on the client when the app starts.

### `store`

`cart.js`

Vuex module containing all cart-related functionality.

`checkout.js`

Vuex module containing all checkout-related functionality.

`index.js`

Vuex module containing all global functionality - `nuxtServerInit`, `nuxtClientInit`

### `utils`

`buildRoutes.js`

Build an array of dynamic routes to generate.  By default, it generates all `/collections/` and `/products/` routes.

`getCartVariant.js`

Formats a variant for use in the cart.  Required parameters: `product`, `variant`.

`getSelectedVariant.js`

Finds the selected variant based on an array of selected options.  Required parameters: `product`, `options`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).
