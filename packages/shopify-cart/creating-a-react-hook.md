# Creating a `useShopifyCart` React Hook

This document explains how `@nacelle/shopify-cart` can be integrated in a React Hook so that the cart state and associated cart actions are available anywhere in a React project.

## Install

For package installation and Shopify credential setup instructions, please review the "Install" and "Prerequisites" sections of the [README](./README.md).

## Creating the Provider

The provider will initialize the Shopify Cart client, manage cart state, and provide cart actions. This provider should accept the Shopify credentials as a prop. To initialize the Shopify Cart client, import `createShopifyCartClient` from `@nacelle/shopify-cart` and pass the credentials to it.

Example:

```js
import createShopifyCartClient from '@nacelle/shopify-cart';

function ShopifyCartProvider({ children, credentials }) {
  const cartClient = createShopifyCartClient({
    shopifyShopId: credentials.shopifyShopId,
    shopifyStorefrontAccessToken: credentials.shopifyStorefrontAccessToken
  });
}
```

### Handling State

How state is handled will depend on your project's needs. One approach is to present a loading state for every action that would trigger a client request, then updating the cart state with the response from the client. Another approach is to implement an optimistic UI, where the cart state is updated as the action takes place, and re-updated after the client request resolves.

Example:

```js
import React, { useState } from 'react';
import createShopifyCartClient from '@nacelle/shopify-cart';

function ShopifyCartProvider({ children, credentials }) {
  const [cartData, setCartData] = useState(null);

  const cartClient = createShopifyCartClient({
    shopifyShopId: credentials.shopifyShopId,
    shopifyStorefrontAccessToken: credentials.shopifyStorefrontAccessToken
  });

  const cartLinesAdd = (params) => {
    // Add loading state or update cart state here...

    return cartClient
      .cartLinesAdd(params) // Make a request with the client.
      .then((data) => {
        setCartData(data); // Update cart state with data from client response.
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
  // Other actions...
}
```

## Creating the Hook

Create two Context objects, passing the cart state to the cart state Context Provider and the cart actions as an object to the cart action Context Provider. Create a new hook that returns the values of these two Context objects.

Example:

```js
import React, { useContext, useState } from 'react';
import createShopifyCartClient from '@nacelle/shopify-cart';

const ShopifyCartDataContext = React.createContext(null);
const ShopifyCartActionContext = React.createContext(null);

export default function ShopifyCartProvider({ children, credentials }) {
  const [cartData, setCartData] = useState(null);

  const cartClient = createShopifyCartClient({
    shopifyShopId: credentials.shopifyShopId,
    shopifyStorefrontAccessToken: credentials.shopifyStorefrontAccessToken
  });

  const cartLinesAdd = (params) => {
    // Set loading state or update cart state.
    return cartClient
      .cartLinesAdd(params) // Make request with client.
      .then((data) => {
        setCartData(data); // Update cart state with data from client response.
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
  // Other actions...

  const shopifyCartActions = {
    cartLinesAdd
    // Add other actions...
  };

  return (
    <ShopifyCartActionContext.Provider value={shopifyCartActions}>
      <ShopifyCartDataContext.Provider value={cartData}>
        {children}
      </ShopifyCartDataContext.Provider>
    </ShopifyCartActionContext.Provider>
  );
}

export function useShopifyCart() {
  const cartState = useContext(ShopifyCartDataContext);
  const cartActions = useContext(ShopifyCartActionContext);
  return [cartState, cartActions];
}
```

## Using the Provider and Hook

The provider component should contain as much of the app as possible so the cart state and actions are useable in any component.

Example:

```js
import ShopifyCartProvider from 'path/to/file';

const credentials = {
  shopifyShopId: process.env.SHOPIFY_SHOP_ID,
  shopifyStorefrontAccessToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN
};

<ShopifyCartProvider credentials={credentials}>
  <App />
</ShopifyCartProvider>;
```

Now from any component, use the hook to get the state and actions.

Example:

```js
import { useShopifyCart } from 'path/to/file';

const [cartState, cartActions] = useShopifyCart();

// Example of using the cart state and actions.
async function addLines() {
  await cartActions.cartLinesAdd({
    cartId: cartState.id,
    lines: [
      {
        merchandiseId: 'item-id',
        quantity: 1
      }
    ]
  });
}
```
