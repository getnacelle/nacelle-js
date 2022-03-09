import { Storefront } from '@nacelle/storefront-sdk';

export const buildRoutes = async () => {
  const clientOld = new Storefront({
    storefrontEndpoint: process.env.NACELLE_OLD_STOREFRONT_ENDPOINT,
    token: process.env.NACELLE_OLD_STOREFRONT_TOKEN,
    locale: process.env.NACELLE_OLD_STOREFRONT_LOCALE
  });
  const QUERY = `
  {
    products: products {
      content {
        handle
      }
    }
    collections: productCollections {
      content {
        handle
      }
    }
    pages: content(filter: { type: "pageSections"  }) {
      handle
    }
  }`;

  const { products, collections, pages } = await clientOld.query({
    query: QUERY
  });

  return [
    ...products.map((product) => `/products/${product.content.handle}`),
    ...collections.map(
      (collection) => `/collections/${collection.content.handle}`
    ),
    ...pages
      .filter((page) => page.handle !== 'page-homepage')
      .map((page) => `/pages/${page.handle.replace('page-', '')}`)
  ];
};
