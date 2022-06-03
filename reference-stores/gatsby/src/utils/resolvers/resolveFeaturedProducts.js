const { PRODUCT_QUERY } = require('../../queries/products/product');

const resolveFeaturedProducts = async ({ graphql, section }) => {
  try {
    const productHandles = section?.remoteFields?.products?.map(
      (product) => product.remoteFields.handle?.split('::')[0]
    );
    let productList = [];
    if (Array.isArray(productHandles) && productHandles.length) {
      const handles = JSON.stringify(productHandles);
      const {
        data: { products }
      } = await graphql(`
        {
          products: allNacelleProduct(
            filter: {content: {handle: {in: ${handles}}}}
          ){
            edges {
              node {
                ${PRODUCT_QUERY}
              }
            }
          }
        }
      `);
      productList = products.edges.map(({ node }) => node);
    }
    return {
      ...section,
      remoteFields: {
        ...section?.remoteFields,
        products: productList
      }
    };
  } catch (err) {
    console.log('err', err);
    return section;
  }
};

exports.resolveFeaturedProducts = resolveFeaturedProducts;
