---
'@nacelle/storefront-sdk': major
---

The Storefront SDK accepts a new `fetchClient` intialization parameter. You can use this to pass a custom [fetch](https://fetch.spec.whatwg.org) client to the Storefront SDK; it will be used in all Nacelle Storefront GraphQL requests.

**BREAKING**: The Storefront SDK no longer accepts `token`, `currencyCode`, `connector`, `debugMode`, `onDataError`,`subscriptionEndpoint`, `subscriptionToken`, nor `subscriptionSpaceId` in the client initialization parameters. These properties are also no longer included in the return value of the `getConfig` method.
