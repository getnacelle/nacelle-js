---
'@nacelle/storefront-sdk': patch
---

Disable automatic retries for errors with status code 400. This status code indicates a problem with the request, and retrying such errors is unnecessary as the outcome will likely be the same.
