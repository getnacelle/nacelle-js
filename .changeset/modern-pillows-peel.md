---
'@nacelle/storefront-sdk': major
---

Adds an `exchanges` property to the Storefront SDK's initialization parameters. This new parameter allows Storefront SDK users to explicitly specify custom urql exchanges. All exchanges used by the Storefront SDK's urql client are now exported individually and as a pre-configured array of `defaultExchanges`. The `setConfig` parameter no longer allows APQ functionality to be changed on-the-fly. APQ can only be disabled by explicitly excluding the `persistedFetchExchange` in the exchanges array provided to the `exchanges` initialization parameter.
