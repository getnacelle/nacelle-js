import { PRODUCTS_QUERY } from '~/queries/product';

export const resolveSiteData = async ({ client, site }) => {
  try {
    const { cart } = site;
    let cartObject = cart.edges[0].node;
    if (cartObject) {
      const crossSellHandles = cartObject?.fields?.crosssellItems?.map(
        (crosssell) => crosssell.fields.handle?.split('::')[0]
      );
      let productList = [];
      if (Array.isArray(crossSellHandles) && crossSellHandles.length) {
        const { products } = await client.query({
          query: PRODUCTS_QUERY,
          variables: {
            handles: crossSellHandles
          }
        });
        productList = products.edges.map((product) => product.node);
      }
      cartObject = {
        ...cartObject,
        fields: {
          ...cartObject?.fields,
          crosssellItems: productList
        }
      };
    }
    return {
      ...site,
      cart: cartObject
    };
  } catch (err) {
    return site;
  }
};
