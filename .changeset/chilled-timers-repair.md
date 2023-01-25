---
'@nacelle/storefront-sdk-plugin-commerce-queries': minor
---

Adds a `content` method to fetch the `allContent` data. Unlike the `content` method in the v1 sdk, this returns a result object with the signature `{error, data}` similar to how the `query` method works in the v2 sdk to allow users more control over error handling.
