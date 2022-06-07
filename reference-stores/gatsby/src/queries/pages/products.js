const { PRODUCT_QUERY } = require('../products/product');
const { SECTIONS_QUERY } = require('../sections/product');

const ProductsQuery = async ({ graphql }) => {
  const {
    data: { products, pages }
  } = await graphql(`
    {
      products: allNacelleProduct {
        edges {
          node {
            ${PRODUCT_QUERY}
          }
        }
      }
      pages: allNacelleContentRemotePageProduct {
        edges {
          node {
            remoteFields {
              handle
              features
              sections {
                ${SECTIONS_QUERY}
              }
            }
          }
        }
      }
    }
  `);

  const productNodes = products.edges.map(({ node }) => node);
  const pageNodes = pages.edges.map(({ node }) => node);

  const data = productNodes?.map((product) => ({
    product: product,
    page: pageNodes.find((page) => {
      return page?.remoteFields?.handle === `page-${product?.content.handle}`;
    })
  }));

  return [...data];
};

module.exports = ProductsQuery;
