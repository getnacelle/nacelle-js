# @nacelle/storefront-sdk

## 2.0.4

### Patch Changes

- c874931: Disable automatic retries for errors with status code 400. This status code indicates a problem with the request, and retrying such errors is unnecessary as the outcome will likely be the same.

## 2.0.3

### Patch Changes

- 6f2e5f1: Updated the default request retry logic to retry in response to all network errors. To customize request retry logic, you can provide your own configured instance of `@urql/exchange-retry` to the Storefront SDK's [`exchanges`](https://docs.nacelle.com/docs/storefront-sdk-major-version-2#exchanges) parameter.

## 2.0.2

### Patch Changes

- 254f5b0: Fixes an internal issue with `@nacelle/storefront-sdk`'s build process, which was causing some external package code to be inadvertently bundled in the `@nacelle/storefront-sdk` package code. This issue both increased the package size and caused issues in Nuxt 2 projects.

## 2.0.1

### Patch Changes

- 9cdc2e2: Updates the Storefront SDK internals to rely on the most recent version of `@urql/exchange-persisted`. This should speed up the time it takes to install `@nacelle/storefront-sdk`, because we no longer have to patch `@urql/exchange-persisted` with `patch-package`.
- f3a05ca: Adds an `x-nacelle-sdk-version` header to all requests. This improves tracing and observability in the event of a support request.

## 2.0.0

### Major Changes

- 650c0ac: The Storefront SDK accepts a new `fetchClient` intialization parameter. You can use this to pass a custom [fetch](https://fetch.spec.whatwg.org) client to the Storefront SDK; it will be used in all Nacelle Storefront GraphQL requests.

  **BREAKING**: The Storefront SDK no longer accepts `token`, `currencyCode`, `connector`, `debugMode`, `onDataError`,`subscriptionEndpoint`, `subscriptionToken`, nor `subscriptionSpaceId` in the client initialization parameters. These properties are also no longer included in the return value of the `getConfig` method.

- 650c0ac: Adds an `exchanges` property to the Storefront SDK's initialization parameters. This new parameter allows Storefront SDK users to explicitly specify custom urql exchanges. All exchanges used by the Storefront SDK's urql client are now exported individually and as a pre-configured array of `defaultExchanges`. The `setConfig` parameter no longer allows APQ functionality to be changed on-the-fly. APQ can only be disabled by explicitly excluding the `persistedFetchExchange` in the exchanges array provided to the `exchanges` initialization parameter.
- 650c0ac: Generate TypeScript types from the Nacelle Storefront GraphQL schema.
- 650c0ac: **BREAKING**: Storefront SDK methods other than `.query`, `.after`, `.getConfig` and `.setConfig` are no longer included in `@nacelle/storefront-sdk`. Other methods from `@nacelle/storefront-sdk@1.x` such as `.products`, `.content` etc. will be provided by a Storefront SDK plugin.
- 650c0ac: Breaking change: `advancedOptions` and `enableAPQ` are removed from the `StorefrontClientParams`, and will be replaced with the ability for the SDK users to pass their own exchanges as params instead, including the `@urql/exchange-persisted` exchange which enables APQ. See `urql` documentation for more information about the persisted query exchange: https://formidable.com/open-source/urql/docs/advanced/persistence-and-uploads/
- 650c0ac: Improves the `.query` method.

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

- 650c0ac: Adds persisted query support for all queries. This sends all requests as hashed `get` requests to take advantage of server-side caching in Nacelle's v2 infrastructure.

### Minor Changes

- 650c0ac: Exposes new withConfig type that plugin authors can take advantage of to get access to the `getConfig` method of the sdk.
- 650c0ac: The `.after` method offers callback deletion and an improved TypeScript experience. Callbacks can now be registered with a `callbackId`. To delete a callback, provide `null` as the callback value, along with the `callbackId` of the callback you'd like to delete. In TypeScript projects, the `.after` method's `method` argument provides autocomplete with all of the possible values. After specifying the `method`, the `.after` method's `callback` argument is aware of the type signature that's specific to the `method` of interest.
- 650c0ac: Adds a trace id to the `error` key in the response. This trace id should be included in any support requests.

### Patch Changes

- 650c0ac: Updated the `query` method to always send variables to the Storefront GraphQL API as objects, even if they are supplied to the `query` method as a stringified object. This change circumvents issues related to using a combination of APQ and stringified variables in Nacelle's Storefront GraphQL.
- 650c0ac: Removed the `Storefront` function that initialized the Storefront SDK. Instead, the SDK is initialized by creating a new instance of the `StorefrontClient` class.
- 650c0ac: Updated the README to advertise features and link to the Nacelle docs
- 650c0ac: Refactored the `after` method to make it agnostic to the return types of methods defined by Storefront SDK plugins.
- 650c0ac: Fixes Storefront SDK type definition resolution in native ESM projects
- 650c0ac: Fixed an issue that prevented the Storefront SDK from entering preview mode when initializing the client with a `previewToken`.
- 650c0ac: Fixed a TypeScript issue that was creating an undesirable coupling between the Storefront SDK and Commerce Queries plugin.
- 650c0ac: Fixed an issue with header names that was preventing the Storefront SDK from entering preview mode.
- 650c0ac: Upgraded the package internals to use `@urql/core` major version 4. This removes the dependency on the `graphql` package.
- 74bbbaf: Patches the internals of `@urql/exchange-persisted` to prevent issues with large queries.

## 2.0.0-beta.10

### Patch Changes

- 6388dbf: Updated the README to advertise features and link to the Nacelle docs
- 092c20f: Upgraded the package internals to use `@urql/core` major version 4. This removes the dependency on the `graphql` package.

## 2.0.0-beta.9

### Major Changes

- 3dc75b3: Adds an `exchanges` property to the Storefront SDK's initialization parameters. This new parameter allows Storefront SDK users to explicitly specify custom urql exchanges. All exchanges used by the Storefront SDK's urql client are now exported individually and as a pre-configured array of `defaultExchanges`. **BREAKING** The `setConfig` parameter no longer allows APQ functionality to be changed on-the-fly. APQ can only be disabled by explicitly excluding the `persistedFetchExchange` in the exchanges array provided to the `exchanges` initialization parameter.
- a5347d7 **BREAKING**: `advancedOptions` and `enableAPQ` are removed from the `StorefrontClientParams`, and will be replaced with the ability for the SDK users to pass their own exchanges as params instead, including the `@urql/exchange-persisted` exchange which enables APQ. See `urql` documentation for more information about the persisted query exchange: https://formidable.com/open-source/urql/docs/advanced/persistence-and-uploads/

## 2.0.0-beta.8

### Patch Changes

- e4f1944: Fixed an issue with header names that was preventing the Storefront SDK from entering preview mode.

## 2.0.0-beta.7

### Patch Changes

- 8e4273f: Fixed an issue that prevented the Storefront SDK from entering preview mode when initializing the client with a `previewToken`.

## 2.0.0-beta.6

### Patch Changes

- 526702d: Refactored the `after` method to make it agnostic to the return types of methods defined by Storefront SDK plugins.

## 2.0.0-beta.5

### Patch Changes

- e62c21a: Updated the `query` method to always send variables to the Storefront GraphQL API as objects, even if they are supplied to the `query` method as a stringified object. This change circumvents issues related to using a combination of APQ and stringified variables in Nacelle's Storefront GraphQL.

## 2.0.0-beta.4

### Patch Changes

- b166f21: Fixed a TypeScript issue that was creating an undesirable coupling between the Storefront SDK and Commerce Queries plugin.

## 2.0.0-beta.3

### Patch Changes

- 7338444: Removed the `Storefront` function that initialized the Storefront SDK. Instead, the SDK is initialized by creating a new instance of the `StorefrontClient` class.

## 2.0.0-beta.2

### Minor Changes

- 5ae2891: Adds a trace id to the `error` key in the response. This trace id should be included in any support requests.

## 2.0.0-beta.1

### Major Changes

- f2f221b: The Storefront SDK accepts a new `fetchClient` intialization parameter. You can use this to pass a custom [fetch](https://fetch.spec.whatwg.org) client to the Storefront SDK; it will be used in all Nacelle Storefront GraphQL requests. **BREAKING**: The Storefront SDK no longer accepts `token`, `currencyCode`, `connector`, `debugMode`, `onDataError`,`subscriptionEndpoint`, `subscriptionToken`, nor `subscriptionSpaceId` in the client initialization parameters. These properties are also no longer included in the return value of the `getConfig` method.

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
