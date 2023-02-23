---
'@nacelle/storefront-sdk-plugin-commerce-queries': patch
---

In TypeScript projects, the `.content`, `.products`, `.productCollections`, and `.productCollectionEntries` methods no longer require type assertions on their return values. The type will be inferred based on the value of `params.edgesToNodes`.
