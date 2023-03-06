---
'@nacelle/storefront-sdk': patch
---

Updated the `query` method to always send variables to the Storefront GraphQL API as objects, even if they are supplied to the `query` method as a stringified object. This change circumvents issues related to using a combination of APQ and stringified variables in Nacelle's Storefront GraphQL.
