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

## Versioning

`@nacelle/shopify-cart` will release quarterly updates that coincide with the Shopify Storefront API's [release schedule][shopify-release-schedule], such that the `@latest` version of `@nacelle/shopify-cart` uses the latest version of the Shopify Storefront API. Features in the Project Roadmap will be added in quarterly releases. Minor updates & patches will be released on an as-needed basis.

## Project Roadmap

We welcome [feature & enhancement suggestions](https://github.com/getnacelle/nacelle-js/issues/new?labels=enhancement%2Ctriage&template=feature_request.yml&title=%5BEnhancement%5D%3A+) via GitHub Issues.

### October 2022

- Update to use the `2022-10` version of the Shopify Storefront API.

### January 2023

- Update to use the `2023-01` version of the Shopify Storefront API.

## Usage

### Install

```
npm i @nacelle/shopify-cart
```

### Prerequisites

To get started, you'll need:

- A Shopify Storefront API access token with [`unauthenticated_read_checkouts` & `unauthenticated_write_checkouts` access scopes][shopify-access-scopes]
  - If you need access to Selling Plans data, you must also enable the `unauthenticated_read_selling_plans` access scope
- Your Shop ID (`myshopify` domain)
  - Example: for `gamma-nova-jewelry.myshopify.com`, the Shop ID is `gamma-nova-jewelry`

### Initializing the client

The cart client can be initialized anywhere in your application. We recommend initializing it once. You can then import the initialized client wherever it's needed.

The cart client accepts the following parameters:

- `shopifyShopId` (`string`) - optional Shopify shop id
- `shopifyStorefrontAccessToken` (`string`) - required Shopify Storefront API access token
- `shopifyCustomEndpoint` (`string`) - optional Shopify custom API endpoint
- `customFragments` (`object`) - optional GraphQL fragments for data customization (see the [Custom Fragments docs][custom-fragments-docs])
- `fetchClient` (`function`) - optional Fetch API-compatible request function

_You must provide a `shopifyShopId` or a `shopifyCustomEndpoint`_

#### Example

```js
import createShopifyCartClient from '@nacelle/shopify-cart';

const cartClient = createShopifyCartClient({
  shopifyShopId: '<your-shop-id>',
  shopifyStorefrontAccessToken: '<your-shopify-storefront-api-access-token>'
});
```

#### Querying additional fields with custom GraphQL fragments

If you'd like to query for additional fields on the [`Cart`][shopify-cart-object] object or its sub-properties, please see the [Custom Fragments docs][custom-fragments-docs] to learn how to supply `customFragments` to the `cartClient`.

### Response Data

Every method on the `cartClient` returns an object with the following keys.

1. `cart` - a Shopify [`Cart`][shopify-cart-object] object with the addition of `nacelleEntryIds`
2. `userErrors` - an array of Shopify [`CartUserError`][shopify-cart-user-error] objects.
3. `errors` - an array of top-level Shopify [API Errors][shopify-api-error]

## Cart client API

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

##### Example

```js
const { cart, userErrors, errors } = await cartClient.cart({
  cartId: 'gid://shopify/Cart/112233'
});
```

#### <a id="cartAttributesUpdate">`cartAttributesUpdate({ cartId, attributes })`</a>

_Updates an existing Shopify cart's attributes._

**Accepts**: params - an object containing the `cartId` (`string`) of interest, and the `attributes` (`array`) to set. For more information on the cart `attributes`, checkout Shopify's [`AttributeInput`][shopify-attributes-input]

##### Example

```js
const { cart, userErrors, errors } = await cartClient.cartAttributesUpdate({
  cartId: 'gid://shopify/Cart/112233',
  attributes: [{ key: 'gift_options', value: 'in box with bow' }]
});
```

#### <a id="cartBuyerIdentityUpdate">`cartBuyerIdentityUpdate({ cartId, buyerIdentity })`</a>

_Updates an existing Shopify cart's buyer identity._

**Accepts**: params - an object containing the `cartId` (`string`) of interest, and the `buyerIdentity` (`object`) to set. For more information on the cart `buyerIndentity`, checkout Shopify's [`CartBuyerIdentityInput`][shopify-buyer-identity-input]

##### Example

```js
const { cart, userErrors, errors } = await cartClient.cartBuyerIdentityUpdate({
  cartId: 'gid://shopify/Cart/112233',
  buyerIdentity: { email: 'email@example.com' }
});
```

#### <a id="cartCreate">`cartCreate(cartInput)`</a>

_Creates a new Shopify cart._

**Accepts**: params - an optional object containing the following optional values: `attributes` (`array`), `buyerIdentity` (`object`), `discountCodes` (`array`), `lines` (`array`), `note` (`string`). To initialize an empty cart, exclude all parameters. For more information on the cart optional values, checkout Shopify's [`CartInput`][shopify-cart-input]. Note that our lines parameter accepts a different value than Shopify's by accepting `nacelleEntryId`.

##### Example

```js
const { cart, userErrors, errors } = await cartClient.cartCreate({
  lines: [
    {
      nacelleEntryId: '<nacelle-entry-id>',
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

##### Example

```js
const { cart, userErrors, errors } = await cartClient.cartDiscountCodesUpdate({
  cartId: 'gid://shopify/Cart/112233',
  discountCodes: ['20OFF']
});
```

#### <a id="cartLinesAdd">`cartLinesAdd({ cartId, lines })`</a>

_Adds lines to an existing Shopify cart._

**Accepts**: params - an object containing the `cartId` (`string`) of interest, and the `lines` (`array`) to add. For more information on the cart `lines`, checkout Shopify's [`CartLineInput`][shopify-cart-line-input]. Note that our lines parameter accepts a different value than Shopify's by accepting `nacelleEntryId`.

##### Example

```js
const { cart, userErrors, errors } = await cartClient.cartLinesAdd({
  cartId: 'gid://shopify/Cart/112233',
  lines: [
    {
      nacelleEntryId: '<nacelle-entry-id>',
      quantity: 1
    }
  ]
});
```

#### <a id="cartLinesRemove">`cartLinesRemove({ cartId, lineIds })`</a>

_Removes lines from an existing Shopify cart._

**Accepts**: params - an object containing the `cartId` (`string`) of interest, and the `lineIds` (`array`) to remove.

##### Example

```js
const { cart, userErrors, errors } = await cartClient.cartLinesRemove({
  cartId: 'gid://shopify/Cart/112233',
  lineIds: [
    'gid://shopify/CartLine/e543caf96fa645b54d07ab2035ef9dba?cart=a7aad2fb1e6611422c946f6827710550'
  ]
});
```

#### <a id="cartLinesUpdate">`cartLinesUpdate({ cartId, lines })`</a>

_Updates lines on an existing Shopify cart._

**Accepts**: params - an object containing the `cartId` (`string`) of interest, and the `lines` (`array`) to update. For more information on the cart `lines`, checkout Shopify's [`CartLineUpdateInput`][shopify-cart-line-update-input]. Note that our lines parameter accepts a different value than Shopify's by accepting `nacelleEntryId`.

##### Example

```js
const { cart, userErrors, errors } = await cartClient.cartLinesUpdate({
  cartId: 'gid://shopify/Cart/112233',
  lines: [
    {
      id: 'gid://shopify/CartLine/e543caf96fa645b54d07ab2035ef9dba?cart=a7aad2fb1e6611422c946f6827710550'
      nacelleEntryId: '<nacelle-entry-id>',
      quantity: 3
    }
  ]
});
```

#### <a id="cartNoteUpdate">`cartNoteUpdate({ cartId, note })`</a>

_Updates note on an existing Shopify cart._

**Accepts**: params - an object containing the `cartId` (`string`) of interest, and the `note` (`string`) to update.

##### Example

```js
const { cart, userErrors, errors } = await cartClient.cartNoteUpdate({
  cartId: 'gid://shopify/Cart/112233',
  note: 'Please use a red ribbon for the bow, if possible :)'
});
```

<!-- LINKS -->

[custom-fragments-docs]: https://github.com/getnacelle/nacelle-js/tree/main/packages/shopify-cart/docs/custom-fragments.md
[shopify-access-scopes]: https://shopify.dev/api/usage/access-scopes#unauthenticated-access-scopes
[shopify-cart-object]: https://shopify.dev/api/storefront/2022-07/objects/Cart#top
[shopify-cart-user-error]: https://shopify.dev/api/storefront/2022-07/objects/CartUserError
[shopify-api-error]: https://shopify.dev/api/storefront#status_and_error_codes
[shopify-attributes-input]: https://shopify.dev/api/storefront/2022-07/input-objects/AttributeInput
[shopify-buyer-identity-input]: https://shopify.dev/api/storefront/2022-07/input-objects/CartBuyerIdentityInput
[shopify-cart-input]: https://shopify.dev/api/storefront/2022-07/input-objects/CartInput
[shopify-cart-line-input]: https://shopify.dev/api/storefront/2022-07/input-objects/CartLineInput
[shopify-cart-line-update-input]: https://shopify.dev/api/storefront/2022-07/input-objects/CartLineUpdateInput
[shopify-release-schedule]: https://shopify.dev/api/usage/versioning#release-schedule
