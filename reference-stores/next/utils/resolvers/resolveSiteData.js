import { PRODUCTS_QUERY } from 'queries/product';

export const resolveSiteData = async ({ client, site }) => {
  try {
    let { cart, header, newsletter, footer } = site;
    let cartObject = cart.edges[0].node;
    if (cartObject) {
      const crossSellHandles = cartObject?.fields?.crosssellItems?.map(
        (crosssell) => crosssell.fields.handle?.split('::')[0]
      );
      let productList = [];
      if (Array.isArray(crossSellHandles) && crossSellHandles.length) {
        const { data } = await client.query({
          query: PRODUCTS_QUERY,
          variables: {
            handles: crossSellHandles
          }
        });
        productList = data.products.edges.map((product) => product.node);
      }
      cartObject = {
        ...cartObject,
        fields: {
          ...cartObject?.fields,
          crosssellItems: productList
        }
      };
    }
    if (header) {
      header = [header.edges[0].node];
    }
    if (newsletter) {
      newsletter = [newsletter.edges[0].node];
    }
    if (footer) {
      footer = [footer.edges[0].node];
    }

    return {
      ...site,
      header,
      newsletter,
      footer,
      cart: [cartObject]
    };
  } catch {
    return site;
  }
};
