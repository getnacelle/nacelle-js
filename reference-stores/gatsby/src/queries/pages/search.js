const { PRODUCT_QUERY_FRAGMENT } = require('../fragments/product');

const SearchQuery = async ({ graphql }) => {
  const {
    data: { products }
  } = await graphql(`
    {
      products: allNacelleProduct {
        edges {
          node {
            ${PRODUCT_QUERY_FRAGMENT}
          }
        }
      }
    }
  `);

  const productNodes = products.edges.map(({ node }) => node);

  return { products: productNodes };
};

module.exports = SearchQuery;
