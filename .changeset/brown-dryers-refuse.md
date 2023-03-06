---
'@nacelle/storefront-sdk': patch
---

Updated the `query` method to always send variables as objects. Previously, the `query` method could send variables as a stringified object. This change circumvents issues related to using a combination of APQ and stringified variables in Nacelle's Storefront GraphQL.
