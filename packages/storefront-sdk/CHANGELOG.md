# @nacelle/storefront-sdk

## 2.0.0-beta.1

### Major Changes

- f2f221b: The Storefront SDK accepts a new `fetchClient` intialization parameter. You can use this to pass a custom [fetch](https://fetch.spec.whatwg.org) client to the Storefront SDK; it will be used in all Nacelle Storefront GraphQL requests.

  **BREAKING**: The Storefront SDK no longer accepts `token`, `currencyCode`, `connector`, `debugMode`, `onDataError`,`subscriptionEndpoint`, `subscriptionToken`, nor `subscriptionSpaceId` in the client initialization parameters. These properties are also no longer included in the return value of the `getConfig` method.

- dd081ef: **BREAKING**: Storefront SDK methods other than `.query`, `.after`, `.getConfig` and `.setConfig` are no longer included in `@nacelle/storefront-sdk`. Other methods from `@nacelle/storefront-sdk@1.x` such as `.products`, `.content` etc. will be provided by a Storefront SDK plugin.
- a8b3a65: Improves the `.query` method.

  - Adds support for tagged template literals via the `gql` helper function
  - Adds support for `TypedDocumentNodes` for strongly typed queries/responses. [More info on `TypedDocumentNodes` and how to use them](https://github.com/dotansimha/graphql-typed-document-node#how-to-use).
  - Returns `{data,error}` so errors can be handled in code instead of throwing on errors. For users wanting to get the data directly and throw on response errors, can use an `after` method like this:

  ```js
  sdkClient.after('query', (response) => {
  	if (response.error) {
  		throw new Error(response);
  	} else {
  		return response.data;
  	}
  });
  ```

- 81e498b: Adds persisted query support for all queries. This sends all requests as hashed `get` requests to take advantage of server-side caching in Nacelle's v2 infrastructure.

### Minor Changes

- 02f15db: Exposes new withConfig type that plugin authors can take advantage of to get access to the `getConfig` method of the sdk.
- 53dd06c: The `.after` method offers callback deletion and an improved TypeScript experience. Callbacks can now be registered with a `callbackId`. To delete a callback, provide `null` as the callback value, along with the `callbackId` of the callback you'd like to delete. In TypeScript projects, the `.after` method's `method` argument provides autocomplete with all of the possible values. After specifying the `method`, the `.after` method's `callback` argument is aware of the type signature that's specific to the `method` of interest.

### Patch Changes

- dd081ef: Fixes Storefront SDK type definition resolution in native ESM projects

## 2.0.0-beta.0

### Major Changes

- c0e3aee: Generate TypeScript types from the Nacelle Storefront GraphQL schema.