# @nacelle/shopify-cart

## 1.0.0-beta.3

### Patch Changes

- f2b2238: Reverts documentation to be included in the package README

## 1.0.0-beta.2

### Patch Changes

- 9ab1f63: Adds a new `cartSelectedDeliveryOptionsUpdate` method to the client. This method corresponds to the `cartSelectedDeliveryOptionsUpdate` mutation added in the `2022-10` version of the Shopify Storefront API.

## 1.0.0-beta.1

### Patch Changes

- c973886: Documentation for `@nacelle/shopify-cart` is now available at nacelle.com/docs.
- e081dd7: Updates the Shopify Storefront API version to `2022-10`.

## 1.0.0-beta.0

### Major Changes

- 3acc646: feat (breaking): Adds options for language and country codes to cart create.

  - Now defaults to setting the language to `EN` in all queries and mutations if no language is passed to the `createCart` function.

- 7eccb39: feat(breaking!): allows for nacelleEntryId's to be passed into cart methods.

  As part of this, renames merchandiseId to variantId to limit confusion of shopify merchandiseId and Nacelle's Variant Id.

- 78e4c27: feat: return `cart`, `userErrors` and `errors` from all client methods
- 901cbd9: - feat(breaking!): Exports `esm` builds as `nacelle-shopify-cart.mjs`
  - feat(breaking!): Uses `es2018` instead of `es2015`.
  - chore: removes some rollup `vite.config.js` configuration to use `vite 3.x` defaults
  - chore: uses `esbuild` for building/minifying
- 2cb52ae: Breaking!: Uses `cost` in query for `Cart` and `LineItems` instead of deprecated `estimatedCost`.

### Minor Changes

- eed734c: refactor: update how nacelleEntryIds get transformed

  - add additional `locale` parameter to client initialization & `setConfig`
  - remove `nacelleEntryId` from line item attributes

- 5e608c4: feat: adds `getConfig` and `setConfig` functions

  - `getConfig` allows for reviewing options set in the cart client such as the `language`, `country`, the Shopify Shop Id, and other options.
  - `setConfig` allows for updating some of the configuration options used to make requests to Shopify - namely `language` and `country` at this juncture.

- 0bad56c: Updates cartLine merchandise to include `nacelleEntryId` and `sourceEntryId`
- b60255b: fix: check existence of Shopify response keys before accessing children `cart` & `userErrors`
- 1a9d714: Added a mechanism for querying additional Cart properties. When initializing the cart client, supplying `customFragments` allows you to define GraphQL properties of interest. The `customFragments` are applied to all client methods.

### Patch Changes

- 6172f2a: feat: use `nodes` array instead of `edges` array for pagination.
- 18e042b: docs: support/release schedule
- dd6cdc0: Allow `cartCreate` mutation to accept no parameters
- 77ace03: docs: updated responses/errors
- e828b51: Added documentation for `customFragments` that can be supplied to the `cartClient`.
- b0c038f: Added pagination logic for cart line items. The `{ cart }` response will now contain all `cart.lines`, rather than just the first page of `cart.lines` results.

## 0.2.1

### Patch Changes

- Adds `title` and `code` to `CartLine.discountAllocations` in the `Cart` returned by the client methods.

## 0.2.0

### Minor Changes

- Added `onlineStoreUrl`, `vendor`, and `tags` to `cart.lines.merchandise.product`.

## 0.1.0

### Minor Changes

- Initial release.
