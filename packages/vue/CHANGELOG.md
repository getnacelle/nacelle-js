# @nacelle/vue

## 0.1.0

### Minor Changes

- bc70cfe: - Replaced `@vue/composition-api` with Vue 2.7. This breaks compatibility with `@nuxtjs/composition-api` versions `0.32.0` and below. Users of `@nuxtjs/composition-api` will need to make sure that they're using a version of `0.33.x` or above of that package.

  - Users using `@nacelle/vue` with Nuxt, may need to be add `@nacelle/vue` to the `transpile` key of their `nuxt.config.js` file.

  ```js
  build: { transpile: [({ isLegacy }) => isLegacy && '@nacelle/vue'] },
  ```

## 0.0.16

### Patch Changes

- 9b9a442: correctly include checkoutUserErrors in error handling on checkoutCreate in `shopify-checkout`

## 0.0.15

### Patch Changes

- d0d4f2c: add gatsby starter

## 0.0.14

### Patch Changes

- 7233750: add docs on commit squashing; reorganize

## 0.0.13

### Patch Changes

- b9236ad: update devDependencies

## 0.0.12

### Patch Changes

- c4c2ba8: add sdk override prop to space-provider

## 0.0.11

### Patch Changes

- 32ba08a: use latest version of sdk

## 0.0.10

### Patch Changes

- 78df6d1: adds cart provider requirements

## 0.0.9

### Patch Changes

- 1ab4909: add `repository.directory` to package.json on `shopify-checkout`

## 0.0.8

### Patch Changes

- fef55f6: change build target to es2015 for portability

## 0.0.7

### Patch Changes

- 53b8444: add type declarations & source maps

## 0.0.6

### Patch Changes

- 588bba5: set distribution files

## 0.0.5

### Patch Changes

- 58b2e1d: set @nacelle/shopify-checkout dist files

## 0.0.4

### Patch Changes

- 07b455f: configure package access scope

## 0.0.3

### Patch Changes

- 6f8869b: fixes bug in product provider get options

## 0.0.2

### Patch Changes

- 131fd21: add `useCartProvider` composable

## 0.0.1

- bcc60f0: initial release
