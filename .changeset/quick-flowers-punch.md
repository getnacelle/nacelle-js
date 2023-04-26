---
'@nacelle/storefront-sdk': major
---

Breaking change: `advancedOptions` and `enableAPQ` are removed from the `StorefrontClientParams`, and will be replaced with the ability for the SDK users to pass their own exchanges as params instead, including the `@urql/exchange-persisted` exchange which enables APQ. See `urql` documentation for more information about the persisted query exchange: https://formidable.com/open-source/urql/docs/advanced/persistence-and-uploads/
