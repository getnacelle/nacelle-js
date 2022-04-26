import { PRODUCTS_QUERY } from '~/queries/product';

export const resolveFeaturedProducts = async({ client, section }) => {
  try {
    const productHandles = section?.fields?.products?.map(
      (product) => product.fields.handle?.split('::')[0]
    );
    const { products } = await client.query({
      query: PRODUCTS_QUERY,
      variables: {
        handles: productHandles
      }
    })
    return {
      ...section,
      fields: {
        ...section?.fields,
        products
      }
    }
  }
  catch {
    return section
  }
}