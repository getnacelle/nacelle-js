---
'@nacelle/storefront-sdk': patch
---

Fix `setConfig` leaving the client half in preview mode when called with `previewToken: undefined` or without a `previewToken`. Any falsy `previewToken` now disables preview mode, and the stored token, the `preview` query param and the `x-nacelle-preview-token` header are always derived from the same value.
