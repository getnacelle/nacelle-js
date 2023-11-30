import { Storefront } from '@nacelle/storefront-sdk';

export const buildRoutes = async () => {
  const client = new Storefront({
    storefrontEndpoint: process.env.NACELLE_STOREFRONT_ENDPOINT,
    token: process.env.NACELLE_STOREFRONT_TOKEN
  });
  const QUERY = /* GraphQL */ `
    {
      allProducts {
        edges {
          node {
            content {
              handle
            }
          }
        }
      }
      allProductCollections {
        edges {
          node {
            content {
              handle
            }
          }
        }
      }
    }
  `;

  const response = await client.query({ query: QUERY });
  return [
    ...response?.allProducts.edges.map(
      (edge) => `/products/${edge.node.content.handle}`
    ),
    ...response?.allProductCollections.edges.map(
      (edge) => `/collections/${edge.node.content.handle}`
    )
  ];
};
