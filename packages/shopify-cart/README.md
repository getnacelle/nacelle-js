# `@nacelle/shopify-cart`

A minimal Shopify cart client for headless storefronts.

[![npm version](https://img.shields.io/npm/v/@nacelle/shopify-cart?style=for-the-badge)](https://npmjs.org/package/@nacelle/shopify-cart)

⚠️ Warning ⚠️ this project is pre-`1.0.0`. We reserve the right to make any changes at any time. Please see [semver.org](https://semver.org) for details.

## Overview

`@nacelle/shopify-cart` adds Shopify cart functionality to headless commerce projects.

## Features

- tiny, with zero dependencies
- full [TypeScript](https://www.typescriptlang.org) support
- ships in [tree-shakeable](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking) ESM, as well as UMD & IIFE formats for maximum portability
- 100% code coverage

## Usage

### Install

```
npm i @nacelle/shopify-cart
```

### Prerequisites

To get started, you'll need:

- a Shopify Storefront API access token with [`unauthenticated_read_checkouts` & `unauthenticated_write_checkouts` access scopes][shopify-access-scopes]
- your `myshopify` domain / Shop ID
  - example: for `gamma-nova-jewelry.myshopify.com`, the domain / Shop ID is `gamma-nova-jewelry`

### Initializing the client

The cart client can be initialized anywhere in your application. We recommend initializing it once. You can then import the initialized client wherever it's needed.

The cart client accepts the following parameters:

- `shopifyShopId` (`string`) - optional Shopify shop id
- `shopifyStorefrontAccessToken` (`string`) - required Shopify Storefront API access token
- `shopifyCustomEndpoint` (`string`) - optional Shopify custom API endpoint
- `fetchClient` (`object`) - optional fetch API-compatible fetch client

_You must provide a `shopifyShopId` or a `shopifyCustomEndpoint`_

#### Example

```js
import createShopifyCartClient from '@nacelle/shopify-cart';

const cartClient = createShopifyCartClient({
  shopifyShopId: '<your-shop-id>',
  shopifyStorefrontAccessToken: '<your-storefront-api-access-token>'
});
```

### Cart client API

The cart client exposes the following methods:

- [`cart`](#cart)
- [`cartAttributesUpdate`](#cartAttributesUpdate)
- [`cartBuyerIdentityUpdate`](#cartBuyerIdentityUpdate)
- [`cartCreate`](#cartCreate)
- [`cartDiscountCodesUpdate`](#cartDiscountCodesUpdate)
- [`cartLinesAdd`](#cartLinesAdd)
- [`cartLinesRemove`](#cartLinesRemove)
- [`cartLinesUpdate`](#cartLinesUpdate)
- [`cartNoteUpdate`](#cartNoteUpdate)

#### <a id="cart">`cart({ cartId })`</a>

_Retrieves an existing Shopify cart._

**Accepts**: params - an object containing the `cartId` (`string`) of the cart of interest.

**Returns**: a Shopify [`Cart`][shopify-cart-object].

##### Example

```js
const cart = await cartClient.cart({
  cartId: 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC85OTg4Nzc/a2V5PTEyMzEyMw=='
});
```

#### <a id="cartAttributesUpdate">`cartAttributesUpdate({ cartId, attributes })`</a>

_Updates an existing Shopify cart's attributes._

**Accepts**: params - an object containing the `cartId` (`string`) of interest, and the `attributes` (`array`) to set. For more information on the cart `attributes`, checkout Shopify's [`AttributeInput`][shopify-attributes-input]

**Returns**: a Shopify [`Cart`][shopify-cart-object].

##### Example

```js
const cart = await cartClient.cartAttributesUpdate({
  cartId: 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC85OTg4Nzc/a2V5PTEyMzEyMw==',
  attributes: [{ key: 'gift_options', value: 'in box with bow' }]
});
```

#### <a id="cartBuyerIdentityUpdate">`cartBuyerIdentityUpdate({ cartId, buyerIdentity })`</a>

_Updates an existing Shopify cart's buyer identity._

**Accepts**: params - an object containing the `cartId` (`string`) of interest, and the `buyerIdentity` (`object`) to set. For more information on the cart `buyerIndentity`, checkout Shopify's [`CartBuyerIdentityInput`][shopify-buyer-identity-input]

**Returns**: a Shopify [`Cart`][shopify-cart-object].

##### Example

```js
const cart = await cartClient.cartBuyerIdentityUpdate({
  cartId: 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC85OTg4Nzc/a2V5PTEyMzEyMw==',
  buyerIdentity: { email: 'email@example.com' }
});
```

#### <a id="cartCreate">`cartCreate(cartInput)`</a>

_Creates a new Shopify cart._

**Accepts**: params - an object containing the following optional values: `attributes` (`array`), `buyerIdentity` (`object`), `discountCodes` (`array`), `lines` (`array`), `note` (`string`). For more information on the cart optional values, checkout Shopify's [`CartInput`][shopify-cart-input]

**Returns**: a Shopify [`Cart`][shopify-cart-object].

##### Example

```js
const cart = await cartClient.cartCreate({
  lines: [
    {
      merchandiseId:
        'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zMzg5NDEyMDcxODQ3MQ==',
      quantity: 1
    }
  ],
  attributes: [{ key: 'gift_options', value: 'in box with bow' }],
  note: 'Please use a red ribbon for the bow, if possible :)'
});
```

#### <a id="cartDiscountCodesUpdate">`cartDiscountCodesUpdate({ cartId, discountCodes })`</a>

_Updates an existing Shopify cart's discount codes._

**Accepts**: params - an object containing the `cartId` (`string`) of interest, and the `discountCodes` (`array`) to set.

**Returns**: a Shopify [`Cart`][shopify-cart-object].

##### Example

```js
const cart = await cartClient.cartDiscountCodesUpdate({
  cartId: 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC85OTg4Nzc/a2V5PTEyMzEyMw==',
  discountCodes: ['20OFF']
});
```

#### <a id="cartLinesAdd">`cartLinesAdd({ cartId, lines })`</a>

_Adds lines to an existing Shopify cart._

**Accepts**: params - an object containing the `cartId` (`string`) of interest, and the `lines` (`array`) to add. For more information on the cart `lines`, checkout Shopify's [`CartLineInput`][shopify-cart-line-input]

**Returns**: a Shopify [`Cart`][shopify-cart-object].

##### Example

```js
const cart = await cartClient.cartLinesAdd({
  cartId: 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC85OTg4Nzc/a2V5PTEyMzEyMw==',
  lines: [
    {
      merchandiseId:
        'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zMzg5NDEyMDcxODQ3MQ==',
      quantity: 1
    }
  ]
});
```

#### <a id="cartLinesRemove">`cartLinesRemove({ cartId, lineIds })`</a>

_Removes lines from an existing Shopify cart._

**Accepts**: params - an object containing the `cartId` (`string`) of interest, and the `lineIds` (`array`) to remove.

**Returns**: a Shopify [`Cart`][shopify-cart-object].

##### Example

```js
const cart = await cartClient.cartLinesRemove({
  cartId: 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC85OTg4Nzc/a2V5PTEyMzEyMw==',
  lineIds: [
    'Z2lkOi8vc2hvcGlmeS9DYXJ0TGluZS9lNTQzY2FmOTZmYTY0NWI1NGQwN2FiMjAzNWVmOWRiYT9jYXJ0PWE3YWFkMmZiMWU2NjExNDIyYzk0NmY2ODI3NzEwNTUw'
  ]
});
```

#### <a id="cartLinesUpdate">`cartLinesUpdate({ cartId, lines })`</a>

_Updates lines on an existing Shopify cart._

**Accepts**: params - an object containing the `cartId` (`string`) of interest, and the `lines` (`array`) to update. For more information on the cart `lines`, checkout Shopify's [`CartLineUpdateInput`][shopify-cart-line-update-input]

**Returns**: a Shopify [`Cart`][shopify-cart-object].

##### Example

```js
const cart = await cartClient.cartLinesAdd({
  cartId: 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC85OTg4Nzc/a2V5PTEyMzEyMw==',
  lines: [
    {
      id: 'Z2lkOi8vc2hvcGlmeS9DYXJ0TGluZS9lNTQzY2FmOTZmYTY0NWI1NGQwN2FiMjAzNWVmOWRiYT9jYXJ0PWE3YWFkMmZiMWU2NjExNDIyYzk0NmY2ODI3NzEwNTUw',
      quantity: 3
    }
  ]
});
```

#### <a id="cartNoteUpdate">`cartNoteUpdate({ cartId, note })`</a>

_Updates note on an existing Shopify cart._

**Accepts**: params - an object containing the `cartId` (`string`) of interest, and the `note` (`string`) to update.

**Returns**: a Shopify [`Cart`][shopify-cart-object].

##### Example

```js
const cart = await cartClient.cartNoteUpdate({
  cartId: 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC85OTg4Nzc/a2V5PTEyMzEyMw==',
  note: 'Please use a red ribbon for the bow, if possible :)'
});
```

<!-- LINKS -->

[shopify-access-scopes]: https://shopify.dev/api/usage/access-scopes#unauthenticated-access-scopes
[shopify-cart-object]: https://shopify.dev/api/storefront/2022-07/objects/Cart#top
[shopify-attributes-input]: https://shopify.dev/api/storefront/2022-07/input-objects/AttributeInput
[shopify-buyer-identity-input]: https://shopify.dev/api/storefront/2022-07/input-objects/CartBuyerIdentityInput
[shopify-cart-input]: https://shopify.dev/api/storefront/2022-07/input-objects/CartInput
[shopify-cart-line-input]: https://shopify.dev/api/storefront/2022-07/input-objects/CartLineInput
[shopify-cart-line-update-input]: https://shopify.dev/api/storefront/2022-07/input-objects/CartLineUpdateInput