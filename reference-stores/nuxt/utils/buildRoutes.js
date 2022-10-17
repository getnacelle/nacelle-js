import { Storefront } from '@nacelle/storefront-sdk';

export const buildRoutes = async () => {
  const client = new Storefront({
    storefrontEndpoint: process.env.NACELLE_STOREFRONT_ENDPOINT,
    token: process.env.NACELLE_STOREFRONT_TOKEN,
    locale: process.env.NACELLE_STOREFRONT_LOCALE
  });
  const QUERY = `
  {
    products: allProducts {
      edges {
        node {
          content {
            handle
          }    
        }
      }
    }
    collections: allProductCollections {
      edges {
        node {
          content {
            handle
          }    
        }
      }
    }
    pages: allContent(filter: { type: "pageSections"  }) {
      edges {
        node {
          handle
        }
      }
    }
  }`;
  const { products, collections, pages } = await client.query({
    query: QUERY
  });

  return [
    ...products.edges.map(
      (product) => `/products/${product.node.content.handle}`
    ),
    ...collections.edges.map(
      (collection) => `/collections/${collection.node.content.handle}`
    ),
    ...pages.edges
      .filter((page) => page.node.handle !== 'page-homepage')
      .map((page) => `/pages/${page.node.handle.replace('page-', '')}`)
  ];
};
