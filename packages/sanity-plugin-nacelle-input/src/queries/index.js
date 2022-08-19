export const GET_PRODUCTS = `
query allProducts($first: Int, $after: String, $searchFilter: ProductSearchOptions) {
  allProducts(filter: {first: $first, after: $after, searchFilter: $searchFilter}) {
    edges {
      node {
        __typename
        nacelleEntryId
        content {
          featuredMedia {
            thumbnailSrc
          }
          handle
          locale
          title
        }
          tags
          productType
          variants{
            content {
              title
            }
            sku
        }
      }
    }
  }
}`

export const GET_COLLECTIONS = `
query allProductCollections($first: Int, $after: String, $searchFilter: ProductCollectionSearchOptions) {
  allProductCollections(filter: { first: $first, after: $after, searchFilter: $searchFilter }) {
    edges {
      node {
        __typename
        nacelleEntryId
        content {
          title
          handle
          locale
          featuredMedia {
            id
            thumbnailSrc
          }
        }
      }
    }
  }
}
`
