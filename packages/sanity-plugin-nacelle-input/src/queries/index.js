export const GET_PRODUCTS = `
query allProducts($first: Int, $after: String, $searchFilter: ProductSearchOptions) {
  allProducts(filter: {first: $first, after: $after, searchFilter: $searchFilter}) {
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
        nacelleEntryId
        content {
          title
          handle
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