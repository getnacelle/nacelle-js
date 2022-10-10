const { PRODUCT_QUERY } = require('../products/product');

const SearchQuery = async ({ graphql }) => {
  const {
    data: { products }
  } = await graphql(`
    {
      products: allNacelleProduct {
        edges {
          node {
            ${PRODUCT_QUERY}
          }
        }
      }
    }
  `);

  const productNodes = products.edges.map(({ node }) => node);

  return { products: productNodes };
};

module.exports = SearchQuery;
