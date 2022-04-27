import { PRODUCTS_QUERY } from '~/queries/product';

export const resolveFeaturedProducts = async ({ client, section }) => {
  try {
    const productHandles = section?.fields?.products?.map(
      (product) => product.fields.handle?.split('::')[0]
    );
    let productList = [];
    if (Array.isArray(productHandles) && productHandles.length) {
      const { products } = await client.query({
        query: PRODUCTS_QUERY,
        variables: {
          handles: productHandles
        }
      });
      productList = products;
    }
    return {
      ...section,
      fields: {
        ...section?.fields,
        products: productList
      }
    };
  } catch {
    return section;
  }
};
