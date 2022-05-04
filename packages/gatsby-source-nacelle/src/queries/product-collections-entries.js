module.exports = `query allProductCollections(
  $filter: ProductCollectionFilterInput
  $after: String
) {
  allProductCollections(filter: $filter) {
    edges {
      node {
        nacelleEntryId
        productConnection(after: $after) {
          edges {
            node {
              nacelleEntryId
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    }
  }
}`;
