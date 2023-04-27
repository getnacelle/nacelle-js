# @nacelle/commerce-queries-plugin

## 1.0.0

### Minor Changes

- 650c0ac: Adds a `content` method to fetch the `allContent` data. Unlike the `content` method in the `@nacelle/storefront-sdk@1.x`, this returns a result object with the signature `{ error, data }` similar to how the `query` method works in `@nacelle/storefront-sdk@2.x` to allow users more control over error handling.
- 650c0ac: Adds the products method to fetch products from your Nacelle index
- 650c0ac: Added the `productCollections` method, which fetches data from a Nacelle space's collections index.
- 650c0ac: Exports the generated types from the Storefront GraphQL for use in Typescript projects

### Patch Changes

- 650c0ac: Added the `productCollectionEntries` method, which fetches product entries from a Nacelle space's collection.
- 650c0ac: Updated the README to advertise features and link to the Nacelle docs
- 650c0ac: In TypeScript projects, the `.content`, `.products`, `.productCollections`, and `.productCollectionEntries` methods no longer require type assertions on their return values. The type will be inferred based on the value of `params.edgesToNodes`.
- 650c0ac: Adds error handling to commerce queries & makes commerce queries return data directly instead of `{ data, error }`
- 650c0ac: Updates types to avoid TypeScript errors during the build process
- 650c0ac: Updated the name of the plugin (named export) from `commerceQueriesPlugin` to `CommerceQueries`.
- 650c0ac: Fixed a TypeScript issue that was creating an undesirable coupling between the Storefront SDK and Commerce Queries plugin.
- 650c0ac: Add `navigation` method to fetch navigation data from a Nacelle space.
- 650c0ac: Add `spaceProperties` method to fetch space properties from a Nacelle space.
- 650c0ac: Removes `graphql` as an explicit peer dependency.
- Updated dependencies [650c0ac]
- Updated dependencies [650c0ac]
- Updated dependencies [650c0ac]
- Updated dependencies [650c0ac]
- Updated dependencies [650c0ac]
- Updated dependencies [650c0ac]
- Updated dependencies [650c0ac]
- Updated dependencies [650c0ac]
- Updated dependencies [650c0ac]
- Updated dependencies [650c0ac]
- Updated dependencies [650c0ac]
- Updated dependencies [650c0ac]
- Updated dependencies [650c0ac]
- Updated dependencies [650c0ac]
- Updated dependencies [650c0ac]
- Updated dependencies [650c0ac]
- Updated dependencies [650c0ac]
- Updated dependencies [74bbbaf]
- Updated dependencies [650c0ac]
- Updated dependencies [650c0ac]
  - @nacelle/storefront-sdk@2.0.0

## 1.0.0-beta.7

### Patch Changes

- 9ee3670: Updates types to avoid TypeScript errors during the build process

## 1.0.0-beta.6

### Patch Changes

- 6388dbf: Updated the README to advertise features and link to the Nacelle docs
- 092c20f: Removes `graphql` as an explicit peer dependency.
- Updated dependencies [6388dbf]
- Updated dependencies [092c20f]
  - @nacelle/storefront-sdk@2.0.0-beta.10

## 1.0.0-beta.5

### Patch Changes

- Updated dependencies [3dc75b3]
- Updated dependencies [a5347d7]
  - @nacelle/storefront-sdk@2.0.0-beta.9

## 1.0.0-beta.4

### Minor Changes

- a231548: Exports the generated types from the Storefront GraphQL for use in Typescript projects

## 1.0.0-beta.3

### Patch Changes

- b166f21: Fixed a TypeScript issue that was creating an undesirable coupling between the Storefront SDK and Commerce Queries plugin.
- Updated dependencies [b166f21]
  - @nacelle/storefront-sdk@2.0.0-beta.4

## 1.0.0-beta.2

### Patch Changes

- cfb91d6: Updated the name of the plugin (named export) from `commerceQueriesPlugin` to `CommerceQueries`.

## 1.0.0-beta.1

### Patch Changes

- 0d3e3bd: In TypeScript projects, the `.content`, `.products`, `.productCollections`, and `.productCollectionEntries` methods no longer require type assertions on their return values. The type will be inferred based on the value of `params.edgesToNodes`.
- bd174e5: Adds error handling to commerce queries & makes commerce queries return data directly instead of `{ data, error }`
- Updated dependencies [5ae2891]
  - @nacelle/storefront-sdk@2.0.0-beta.2

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
