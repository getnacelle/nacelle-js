---
'@nacelle/storefront-sdk': patch
---

Fixes an internal issue with `@nacelle/storefront-sdk`'s build process, which was causing some external package code to be inadvertently bundled in the `@nacelle/storefront-sdk` package code. This issue both increased the package size and caused issues in Nuxt 2 projects.
