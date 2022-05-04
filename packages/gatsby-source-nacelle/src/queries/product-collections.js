module.exports = `query allProductCollections(
  $filter: ProductCollectionFilterInput
) {
  allProductCollections(filter: $filter) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        createdAt
        indexedAt
        metafields {
          id
          key
          namespace
          value
        }
        nacelleEntryId
        sourceEntryId
        sourceId
        tags
        updatedAt
        content {
          collectionEntryId
          createdAt
          description
          featuredMedia {
            altText
            id
            mimeType
            src
            thumbnailSrc
            type
          }
          fields
          handle
          indexedAt
          locale
          metafields {
            id
            key
            namespace
            value
          }
          nacelleEntryId
          sourceEntryId
          sourceId
          title
          updatedAt
        }
        productConnection {
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              nacelleEntryId
            }
          }
        }
      }
    }
  }
}`;
