# Nacelle Next Starter

This is a [Next.js](https://nextjs.org/) Starter project enhanced with [`@nacelle/storefront-sdk`](https://www.npmjs.com/package/@nacelle/storefront-sdk) and [`@nacelle/react-hooks`](https://github.com/getnacelle/nacelle-react/tree/main/packages/react-hooks).

Please note that this starter supports Nacelle's [v2 backend](https://dashboard.nacelle.com) only.

## Getting Started

First, pull down a fresh copy of the Next.js Starter:

```
npx degit https://github.com/getnacelle/nacelle-js/starters/next
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
```

## Project Directory

### `components`

- `Layout.js` - Clears cart and checkout data after a successful checkout. Can be expanded to contain global components such as a header and footer.
- `ProductCard.js` - A product component to be added to a grid of products, such as a collections page. Provides an option selector (if available) and add to cart functionality.

### `pages`

- `_app.js` - Sets up the `CartProvider` and `CheckoutProvider` from `@nacelle/react-hooks`, allowing for `useCart` and `useCheckout` to be used throughout the project. Also creates the Shopify Checkout client, which is used by the `CheckoutProvider` to create Shopify checkouts.
- `cart.js` - A cart page using both `useCart` and `useCheckout` hooks from `@nacelle/react-hooks`.
- `index.js` - A simple homepage to get you started.
- `collections/[handle.js]` - A dynamic collections page, with data being queried using the Nacelle Storefront SDK.
- `products/[handle.js]` - A dynamic products page, with data being queried using the Nacelle Storefront SDK.

### `services`

- `nacelleClient.js` - Initializes the Nacelle Storefront SDK and can be imported where Nacelle data needs to be queried, such as the collection and product pages.

### `utils`

- `getCartVariant.js` - Formats a variant for use in the cart.
- `getSelectedVariant.js` - Finds the selected variant based on an array of selected options.

## Learn More

### Nacelle

To learn more about Nacelle, check out our [Documentation](https://nacelle.com/docs).

For more information on querying data from Nacelle, check out our documentation on Nacelle's [Storefront SDK](https://nacelle.com/docs/querying-data/storefront-sdk) and [Storefront API](https://nacelle.com/docs/querying-data/storefront-api).

Finally, here's where you can find the Nacelle packages used in this project:

- [`@nacelle/storefront-sdk`](https://www.npmjs.com/package/@nacelle/storefront-sdk) - Nacelle Storefront SDK, providing methods to query data from your Nacelle space.
- [`@nacelle/react-hooks`](https://github.com/getnacelle/nacelle-react/tree/main/packages/react-hooks) - Helpful React hooks for managing cart and checkout.

### Next.js

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
