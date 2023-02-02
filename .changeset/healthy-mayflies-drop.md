---
'nuxt-2-composition-api': minor
'@nacelle/vue': minor
---

- Replaced `@vue/composition-api` with Vue 2.7. This breaks compatibility with `@nuxtjs/composition-api` versions `0.32.0` and below. Users of `@nuxtjs/composition-api` will need to make sure that they're using a version of `0.33.x` or above of that package. 

- Users using `@nacelle/vue` with Nuxt, may need to be add `@nacelle/vue` to the `transpile` key of their `nuxt.config.js` file. 

```js
build: { transpile: [({ isLegacy }) => isLegacy && '@nacelle/vue'] },
```
