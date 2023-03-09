---
'@nacelle/storefront-sdk': patch
---

Refactored the `after` method to make it agnostic to the return types of methods defined by Storefront SDK plugins. TypeScript users must provide `after` method callbacks as generic functions.
