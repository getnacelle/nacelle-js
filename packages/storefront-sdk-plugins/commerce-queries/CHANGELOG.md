# @nacelle/commerce-queries-plugin

## 1.0.0-beta.1

### Minor Changes

- 02f15db: Adds a `content` method to fetch the `allContent` data. Unlike the `content` method in the `@nacelle/storefront-sdk@1.x`, this returns a result object with the signature `{ error, data }` similar to how the `query` method works in `@nacelle/storefront-sdk@2.x` to allow users more control over error handling.
- f503c29: Adds the products method to fetch products from your Nacelle index
- 66b14da: Added the `productCollections` method, which fetches data from a Nacelle space's collections index.

### Patch Changes

- e572eec: Added the `productCollectionEntries` method, which fetches product entries from a Nacelle space's collection.
- e839564: Add `navigation` method to fetch navigation data from a Nacelle space.
- f7031c4: Add `spaceProperties` method to fetch space properties from a Nacelle space.
- Updated dependencies [f2f221b]
- Updated dependencies [dd081ef]
- Updated dependencies [dd081ef]
- Updated dependencies [02f15db]
- Updated dependencies [53dd06c]
- Updated dependencies [a8b3a65]
- Updated dependencies [81e498b]
  - @nacelle/storefront-sdk@2.0.0-beta.1
