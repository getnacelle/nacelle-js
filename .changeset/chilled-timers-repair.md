---
'@nacelle/storefront-sdk-plugin-commerce-queries': minor
---

Adds a `content` method to fetch the `allContent` data. Unlike the `content` method in the `@nacelle/storefront-sdk@1.x`, this returns a result object with the signature `{ error, data }` similar to how the `query` method works in `@nacelle/storefront-sdk@2.x` to allow users more control over error handling.
