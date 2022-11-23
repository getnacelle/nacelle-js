# @nacelle/shopify-checkout

## 0.1.2

### Patch Changes

- f7ec109: Fixes an issue with Shopify global IDs. Shopify have updated their Storefront API to return plaintext global IDs, rather than Base64-encoded global IDs, as has been the norm for a very long time. Now, `@nacelle/shopify-checkout` will accept either plaintext or Base64-encoded global IDs in its methods.

## 0.1.1

### Patch Changes

- 3cf6e7b: Fixes an issue with the checkout `completed` value being returned as `false` when a checkout was in fact completed.

## 0.1.0

### Minor Changes

- 6309ebd: shopify checkout custom query

## 0.0.12

### Patch Changes

- 03f1992: apply/remove discount params

## 0.0.11

### Patch Changes

- 9b9a442: correctly include checkoutUserErrors in error handling on checkoutCreate

## 0.0.10

### Patch Changes

- e4a9321: accept checkout IDs that start with letter

## 0.0.9

### Patch Changes

- bc078b3: implement lineItems & discountApplications fragments in mutations and queries

## 0.0.8

### Patch Changes

- 52aeb42: support non GIDs for variantIds

## 0.0.7

### Patch Changes

- b9236ad: update devDependencies

## 0.0.6

### Patch Changes

- 1ab4909: Add `repository.directory` to package.json

## 0.0.5

### Patch Changes

- fef55f6: change build target to es2015 for portability

## 0.0.4

### Patch Changes

- 53b8444: Add type declarations & source maps

## 0.0.3

### Patch Changes

- 6e99f14: minimal homepage route on nuxt starter

## 0.0.2

### Patch Changes

- 58b2e1d: set @nacelle/shopify-checkout dist files

## 0.0.1

### Patch Changes

- 07b455f: configure package access scope

## 0.0.0

- f399788: initial release
