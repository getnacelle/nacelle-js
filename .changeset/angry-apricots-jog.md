---
'@nacelle/storefront-sdk': patch
---

Updated the default request retry logic to retry in response to all network errors. To customize request retry logic, you can provide your own configured instance of `@urql/exchange-retry` to the Storefront SDK's [`exchanges`](https://docs.nacelle.com/docs/storefront-sdk-major-version-2#exchanges) parameter.
