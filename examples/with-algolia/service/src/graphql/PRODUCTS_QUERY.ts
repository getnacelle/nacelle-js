import { gql } from '@urql/core'
export const PRODUCTS_QUERY = gql`
  query {
    allProducts(filter: { first: 1000 }) {
      edges {
        node {
          sourceEntryId
          productType
          content {
            title
            handle
            featuredMedia {
              src
            }
            options {
              values
            }
          }
          variants {
            price
          }
        }
      }
    }
  }
`
