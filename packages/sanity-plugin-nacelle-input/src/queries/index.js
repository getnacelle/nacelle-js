export const GET_PRODUCTS = `
  query allProducts($first: Int, $searchFilter: ProductSearchOptions) {
    allProducts(filter: { first: $first, searchFilter: $searchFilter }) {
      pageInfo {
        hasNextPage
        endCursor
      }
      totalCount
      edges {
        node {
          nacelleEntryId
          content {
            featuredMedia {
              thumbnailSrc
            }
            handle
            title
          }
          tags
          productType
          variants {
            content {
              title
            }
            sku
          }
        }
      }
    }
  }
`

export const GET_COLLECTIONS = `
  query allProductCollections(
    $first: Int
    $searchFilter: ProductSearchOptions
  ) {
    allProductCollections(
      filter: { first: $first, searchFilter: $searchFilter }
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      totalCount
      edges {
        node {
          nacelleEntryId
          content {
            title
            handle
          }
          products {
            nacelleEntryId
            content {
              title
              handle
              nacelleEntryId
              featuredMedia {
                id
                thumbnailSrc
              }
            }
          }
        }
      }
    }
  }
`
