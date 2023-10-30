---
'@nacelle/shopify-cart': patch
---

Updated the `engines.node` setting in `package.json` to remove the upper bound for a project's Node.js version. This removes superficial warnings related to Node.js versions when installing `@nacelle/shopify-cart` in a project that uses Node.js 19+.
