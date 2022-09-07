---
'@nacelle/shopify-cart': patch
---

Added pagination logic for cart line items. The `{ cart }` response will now contain all `cart.lines`, rather than just the first page of `cart.lines` results.
