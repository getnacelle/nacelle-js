---
'@nacelle/storefront-sdk': major
---

Improves the `.query` method.

- Adds support for tagged template literals via the `gql` helper function
- Adds support for `TypedDocumentNodes` for strongly typed queries/responses. [More info on `TypedDocumentNodes` and how to use them](https://github.com/dotansimha/graphql-typed-document-node#how-to-use).
- Returns `{data,error}` so errors can be handled in code instead of throwing on errors. For users wanting to get the data directly and throw on response errors, can use an `after` method like this: 
 ```js
 sdkClient.after('query', (response)  => {
    if(response.error) {
        throw new Error(response)
    } else {
        return response.data
    }
 })
 ```
