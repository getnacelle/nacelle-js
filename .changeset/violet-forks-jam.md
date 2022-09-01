---
'@nacelle/shopify-cart': minor
---

Added a mechanism for querying additional Cart properties. When initializing the cart client, supplying `customFragments` allows you to define GraphQL properties of interest. The `customFragments` are applied to all client methods.
