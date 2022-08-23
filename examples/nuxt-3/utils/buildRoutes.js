import { Storefront } from '@nacelle/storefront-sdk';

export const buildRoutes = async () => {
  const client = new Storefront({
    storefrontEndpoint: process.env.NUXT_PUBLIC_NACELLE_STOREFRONT_ENDPOINT,
    token: process.env.NUXT_PUBLIC_NACELLE_STOREFRONT_TOKEN
  });
  const QUERY = `
    {
      products {
        content {
          handle
        }
      }
      productCollections {
        content {
          handle
        }
      }
    }
  `;

  const response = await client.query({ query: QUERY });
  return [
    ...(response?.products.map(
      (product) => `/products/${product.content.handle}`
    ) ?? []),
    ...(response?.productCollections.map(
      (productCollection) => `/collections/${productCollection.content.handle}`
    ) ?? [])
  ];
};
