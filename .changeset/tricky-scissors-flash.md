---
'@nacelle/shopify-checkout': patch
---

Fixes an issue with Shopify global IDs. Shopify have updated their Storefront API to return plaintext global IDs, rather than Base64-encoded global IDs, as has been the norm for a very long time. Now, `@nacelle/shopify-checkout` will accept either plaintext or Base64-encoded global IDs in its methods.
