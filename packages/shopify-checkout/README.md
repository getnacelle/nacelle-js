# `@nacelle/shopify-checkout`

A minimal Shopify checkout client for headless storefronts.

[![npm version](https://img.shields.io/npm/v/@nacelle/shopify-checkout?style=for-the-badge)](https://npmjs.org/package/@nacelle/shopify-checkout)

## Overview

`@nacelle/shopify-checkout` adds Shopify checkout functionality to headless commerce projects. While it's tailored to support the needs of [Nacelle](https://www.nacelle.com)-powered storefronts, it's possible for any headless Shopify storefront to use this package by following [the API described below](#usage).

## Features

- tiny, with zero dependencies
- full [TypeScript](https://www.typescriptlang.org) support
- ships in [tree-shakeable](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking) ESM, as well as UMD & IIFE formats for maximum portability
- high code coverage

## Usage

### Install

```
npm i @nacelle/shopify-checkout
```

### Prerequisites

To get started, you'll need:

- a Shopify Storefront API token with [`unauthenticated_read_checkouts` & `unauthenticated_write_checkouts` access scopes](https://shopify.dev/api/usage/access-scopes#unauthenticated-access-scopes)
- your `myshopify` domain / Shop ID
  - example: for `gamma-nova-jewelry.myshopify.com`, the domain / Shop ID is `gamma-nova-jewelry`

### Initializing the client

The checkout client can be initialized anywhere in your application. We recommend initializing it once. You can then import the initialized client wherever it's needed.

```js
import createShopifyCheckoutClient from '@nacelle/shopify-checkout';

const checkoutClient = createShopifyCheckoutClient({
  storefrontCheckoutToken: '<your-storefront-api-token>',
  myshopifyDomain: '<your-shop-id>'
});
```

### Common Types

When working with the checkout client, there are some common types that it will help to be familiar with:

| Type              | Description                                                                                                                                                                                                                                                                                              |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Metafield`       | A `Metafield` is an object that contains two properties: a `key` and a `value`, which both have `string` values.                                                                                                                                                                                         |
| `CartItem`        | A `CartItem` is an object with two required properties: `variantId` (a [Shopify global ID][shopify-scalars]) and a `quantity` (`number`). A `CartItem` may contain the optional property `metafields` (`Metafield[]`).                                                                                   |
| `ShopifyCheckout` | A `ShopifyCheckout` is an object that contains the following properties: `id` (`string`), `url` (`string`) the address of the Shopify checkout, `completed` (`boolean`), `lines` (`array`) the line items in the checkout, `discountApplications` (`array`) the discounts being applied to the checkout. |

#### Examples of Common Types:

##### `Metafield`

```js
{ key: 'forecast', value: 'sunshine' }
```

##### `CartItem`

```js
{
  variantId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xMjM0NQ==',
  quantity: 4
},
{
  variantId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC85ODc2NQ==',
  quantity: 2,
  metafields: [
    { key: 'care_instructions', value: 'hand wash; drip dry' }
  ]
},
```

### Checkout client API

The checkout client exposes two methods, `get` and `process`.

#### `get({ id })`

_Retrieves an existing Shopify checkout._

**Accepts**: params - an object containing the `id` (`string`) of interest.

**Returns**: a [`ShopifyCheckout`](#common-types).

##### Example

```js
const id = 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC85OTg4Nzc/a2V5PTEyMzEyMw==';
const checkout = await checkoutClient.get({ id });
```

#### `process(params)`

_Creates a new Shopify checkout, or updates an existing Shopify checkout._

**Accepts**: params (see examples below).

**Returns**: a [`ShopifyCheckout`](#common-types).

##### Creating a new Shopify checkout

| Parameter    | [Type](#common-types) | Required? | Description                                                                        |
| ------------ | --------------------- | --------- | ---------------------------------------------------------------------------------- |
| `cartItems`  | `CartItem[]`          | ✅        | An array of line items.                                                            |
| `metafields` | `Metafield[]`         | ⛔️       | Corresponds to a [Shopify Checkout][shopify-checkout-object]'s `customAttributes`. |
| `note`       | `string`              | ⛔️       | The [Shopify Checkout][shopify-checkout-object]'s `note`                           |

###### Example

```js
// create a new checkout with checkout-level `customAttributes` and `note`
const checkout = await checkoutClient.process({
  cartItems: [
    {
      variantId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xMjM0NQ==',
      quantity: 1
    }
  ],
  metafields: [{ key: 'gift_options', value: 'wrapped in gift paper' }],
  note: 'Thanks for taking care of the gift wrapping!'
});
```

##### Updating an existing Shopify checkout

| Parameter    | [Type](#common-types) | Required?          | Description                                                                        |
| ------------ | --------------------- | ------------------ | ---------------------------------------------------------------------------------- |
| `id`         | `string`              | ✅                 | An existing Shopify checkout's [global ID][shopify-scalars].                       |
| `cartItems`  | `CartItem[]`          | (only if updating) | An array of line items.                                                            |
| `metafields` | `Metafield[]`         | (only if updating) | Corresponds to a [Shopify Checkout][shopify-checkout-object]'s `customAttributes`. |
| `note`       | `string`              | (only if updating) | The [Shopify Checkout][shopify-checkout-object]'s `note`.                          |

##### Example

```js
// Update an existing checkout's line items, `customAttributes`, and `note`
const checkout = await checkoutClient.process({
  id: 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC85OTg4Nzc/a2V5PTEyMzEyMw==',
  cartItems: [
    {
      variantId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xMjM0NQ==',
      quantity: 1,
      metafields: [{ key: 'engrave_text', value: 'i ❤️ headless commerce' }]
    }
  ],
  metafields: [{ key: 'gift_options', value: 'in box with bow' }],
  note: 'Please use a red ribbon for the bow, if possible :)'
});
```

##### Applying a discount to checkout

| Parameter      | [Type](#common-types) | Required? | Description                                                  |
| -------------- | --------------------- | --------- | ------------------------------------------------------------ |
| `id`           | `string`              | ✅        | An existing Shopify checkout's [global ID][shopify-scalars]. |
| `discountCode` | `string`              | ✅        | A discount code                                              |

##### Example

```js
// Apply a discount code to checkout
const checkout = await checkoutClient.discountApply({
  id: 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC85OTg4Nzc/a2V5PTEyMzEyMw==',
  discountCode: 'BFCM'
});
```

##### Removing a discount from checkout

| Parameter | [Type](#common-types) | Required? | Description                                                  |
| --------- | --------------------- | --------- | ------------------------------------------------------------ |
| `id`      | `string`              | ✅        | An existing Shopify checkout's [global ID][shopify-scalars]. |

##### Example

```js
// Remove discount code from checkout
const checkout = await checkoutClient.discountRemove({
  id: 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC85OTg4Nzc/a2V5PTEyMzEyMw=='
});
```

### Advanced Usage

#### Using a custom `fetchClient`

By default, `@nacelle/shopify-checkout` makes GraphQL requests to Shopify's Storefront API with `window.fetch`. If `window.fetch` doesn't meet your project's requirements (e.g. if you need to support IE11), you can supply a `fetchClient` when initializing the checkout client. For example:

```js
import createShopifyCheckoutClient from '@nacelle/shopify-checkout';
import isoFetch from 'isomorphic-unfetch';

const checkoutClient = createShopifyCheckoutClient({
  storefrontCheckoutToken: '<your-storefront-api-token>',
  myshopifyDomain: '<your-shop-id>',
  fetchClient: isoFetch
});
```

The only requirement of the `fetchClient` is that it implements the [`Fetch API`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) (`axios`, for instance, won't work). We recommend checking out [`isomorphic-unfetch`](https://bundlephobia.com/package/isomorphic-unfetch), [`cross-fetch`](https://bundlephobia.com/package/cross-fetch), or similar.

#### Using a custom Shopify endpoint

If you'd prefer to specify a Shopify Storefront GraphQL API endpoint directly, without supplying a `myshopifyDomain` or `storefrontApiVersion`, you may do so by specifying a `customEndpoint` when initializing the checkout client. For example:

```js
const checkoutClient = createShopifyCheckoutClient({
  storefrontCheckoutToken: '<your-storefront-api-token>',
  customEndpoint: '<your-storefront-api-endpoint>'
});
```

<!-- LINKS -->

[shopify-checkout-object]: https://shopify.dev/api/storefront/2022-01/objects/checkout#fields
[shopify-scalars]: https://shopify.dev/api/storefront/2022-01/scalars/ID
