import { Product, ProductEdge } from '@nacelle/storefront-sdk'
import { graphQLClient } from './graphQLClient'
import { algoliaClient } from './algoliaClient'
import { PRODUCTS_QUERY } from './graphql/PRODUCTS_QUERY'

export const indexData = async () => {
  // Get products from Nacelle's Storefront API
  const products = await graphQLClient
    .query(PRODUCTS_QUERY)
    .toPromise()
    .then((res) =>
      res.data.allProducts.edges.map((edge: ProductEdge) => edge.node)
    )

  // Format Product data for Algolia
  const productsToIndex = products.map((product: Product) => {
    return {
      objectID: product.sourceEntryId,
      ...product
    }
  })

  // Index products in Algolia
  return algoliaClient.initIndex('nacelle').saveObjects(productsToIndex)
}
