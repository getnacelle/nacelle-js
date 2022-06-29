# Nacelle Gatsby Starter

This is a [Gatsby][gatsby] Starter project enhanced with [`@nacelle/gatsby-source-nacelle`][@nacelle/gatsby-source-nacelle], [`@nacelle/storefront-sdk`][@nacelle/storefront-sdk], and [`@nacelle/react-hooks`][@nacelle/react-hooks].

Please note that this starter supports Nacelle's [v2 backend][nacelle-dashboard] only.

## Getting Started

First, pull down a fresh copy of the Gatsby Starter:

```
npx degit https://github.com/getnacelle/nacelle-js/starters/gatsby
```

Next, install dependencies and run the project.

```bash
# install dependencies
$ npm install
# start the development server with hot reloading at localhost:8000
$ npm run develop
# build for production
$ npm run build
```

## Data Fetching

To learn about data fetching patterns with [`@nacelle/gatsby-source-nacelle`][@nacelle/gatsby-source-nacelle], please see [nacelle.com/docs/building-your-store/using-gatsby][nacelle-gatsby-docs].

## Project Directory

### `gatsby-*.js`

- [`gatsby-browser.js`][gatsby-browser] - Configures the client-side application setup.
- [`gatsby-config.js`][gatsby-config] - Configures the project's metadata and plugins.
- [`gatsby-node.js`][gatsby-node] - Configures the build process, page creation, and more.
- [`gatsby-ssr.js`][gatsby-ssr] - Configures the server-side application setup.

### `src/components`

- `Layout` - Clears cart and checkout data after a successful checkout. Can be expanded to contain global components such as a header and footer.
- `PageNavigator` - Navigates between numbered collection pages.
- `ProductCard` - A product component to be added to a grid of products, such as a collections page. Provides an option selector (if available) and add to cart functionality.

### `src/pages`

- `products/{NacelleProduct.content__handle}.js` - A dynamic products page that leveragies Gatsby's [File System Route API][gatsby-filesystem-route-api].
- `cart.js` - A cart page using both `useCart` and `useCheckout` hooks from `@nacelle/react-hooks`.
- `index.js` - A simple homepage to get you started.

### `services`

- `nacelleClient.js` - Initializes the Nacelle Storefront SDK and can be imported where Nacelle data needs to be queried, such as the collection and product pages.

### `templates`

- `ProductCollection.js` - A collection page template. Generation of collection routes & payloads are handled in `gatsby-node.js` to provide finer-grained control over collection routes than product routes.

### `utils`

- `getCartVariant.js` - Formats a variant for use in the cart.
- `getSelectedVariant.js` - Finds the selected variant based on an array of selected options.

## Learn More

### Nacelle

To learn more about Nacelle, check out our [Documentation][nacelle-docs].

Finally, here's where you can find the Nacelle packages used in this project:

- [`@nacelle/gatsby-source-nacelle`][@nacelle/gatsby-source-nacelle] - A Gatsby plugin that sources product, collection, content, and Nacelle Space data from Nacelle's APIs.
- [`@nacelle/storefront-sdk`][@nacelle/storefront-sdk] - Nacelle Storefront SDK, providing methods to query data from your Nacelle space.
- [`@nacelle/react-hooks`][@nacelle/react-hooks] - Helpful React hooks for managing cart and checkout.

### Gatsby

To learn more about Gatsby, check out the [Gatsby Documentation][gatsby-docs].

<!-- LINKS -->

[@nacelle/gatsby-source-nacelle]: https://www.npmjs.com/package/@nacelle/gatsby-source-nacelle
[@nacelle/storefront-sdk]: https://www.npmjs.com/package/@nacelle/storefront-sdk
[@nacelle/react-hooks]: https://github.com/getnacelle/nacelle-react/tree/main/packages/react-hooks
[nacelle-docs]: https://nacelle.com/docs
[nacelle-gatsby-docs]: https://nacelle.com/docs/building-your-store/using-gatsby
[nacelle-dashboard]: https://dashboard.nacelle.com
[gatsby]: https://www.gatsbyjs.com
[gatsby-docs]: https://www.gatsbyjs.com/docs
[gatsby-browser]: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser
[gatsby-config]: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config
[gatsby-node]: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node
[gatsby-ssr]: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr
[gatsby-filesystem-route-api]: https://www.gatsbyjs.com/docs/reference/routing/file-system-route-api
