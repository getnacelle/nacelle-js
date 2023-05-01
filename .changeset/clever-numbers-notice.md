---
'@nacelle/storefront-sdk': patch
'nacelle-next-reference-store': patch
---

Updates the Storefront SDK internals to rely on the most recent version of `@urql/exchange-persisted`. This should speed up the time it takes to install `@nacelle/storefront-sdk`, because we no longer have to patch `@urql/exchange-persisted` with `patch-package`.
