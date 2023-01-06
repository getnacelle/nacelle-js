---
'@nacelle/storefront-sdk': minor
---

The `.after` method offers callback deletion and an improved TypeScript experience. Callbacks can now be registered with a `callbackId`. To delete a callback, provide `null` as the callback value, along with the `callbackId` of the callback you'd like to delete. In TypeScript projects, the `.after` method's `method` argument provides autocomplete with all of the possible values. After specifying the `method`, the `.after` method's `callback` argument is aware of the type signature that's specific to the `method` of interest.
