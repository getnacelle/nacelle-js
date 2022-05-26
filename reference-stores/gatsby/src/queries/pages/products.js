const { PRODUCT_QUERY_FRAGMENT } = require('../fragments/product');

const ProductsQuery = async ({ graphql }) => {
  const {
    data: { products, pages }
  } = await graphql(`
    {
      products: allNacelleProduct {
        edges {
          node {
            ${PRODUCT_QUERY_FRAGMENT}
          }
        }
      }
      pages: allNacelleContentRemotePageProduct {
        edges {
          node {
            handle
          }
        }
      }
    }
  `);

  const productNodes = products.edges.map(({ node }) => node);
  const pageNodes = pages.edges.map(({ node }) => node);

  let data = productNodes?.map((product) => ({
    product: product,
    page: pageNodes.filter((page) => {
      return page?.handle === `page-${product?.content.handle}`;
    })
  }));

  data = [...data];

  return data;
};

module.exports = ProductsQuery;
