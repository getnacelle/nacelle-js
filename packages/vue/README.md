# `@nacelle/vue`

Providers and composables for your Vue.js + Nacelle-powered eCommerce storefront.

[![npm version](https://img.shields.io/npm/v/@nacelle/vue?style=for-the-badge)](https://npmjs.org/package/@nacelle/vue)

## NOTICE

This package is deprecated. For up-to-date information and examples related to building frontend projects powered by Nacelle, please see [`docs.nacelle.com`](https://docs.nacelle.com/docs/heads).

## Features

- Supports Vue 2.7 projects
- Compatible with [`@nuxtjs/composition-api`](https://composition-api.nuxtjs.org/) version 0.33 or higher.

## Installation

```
npm i @nacelle/vue
```

`@nacelle/vue` also depends on [`@nacelle/client-js-sdk`](https://www.npmjs.com/package/@nacelle/client-js-sdk). Follow those package's installation instructions before using `@nacelle/vue` in your Vue.js + Nacelle-powered storefront.

## Usage with Nuxt

To use this with Nuxt you'll want to make sure you're using the latest version of Nuxt v2. You can use `npm i nuxt@2.x` to update to the latest version. You might also need to add this package to your [build transpilation config option](https://nuxtjs.org/docs/configuration-glossary/configuration-build#transpile) to make sure it works correctly. In your `nuxt.config.js` you'll want to add something similar to this:

```js
build: { transpile: [({ isLegacy }) => isLegacy && '@nacelle/vue'] },
```
