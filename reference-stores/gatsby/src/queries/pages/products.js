const { PRODUCT_QUERY_FRAGMENT } = require('../fragments/product');
// const { SECTIONS_QUERY_FRAGMENT } = require('../fragments/sections');

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
            remoteFields {
              handle
              features
              sections {
                type
              }
            }
          }
        }
      }
    }
  `);

  const productNodes = products.edges.map(({ node }) => node);
  const pageNodes = pages.edges.map(({ node }) => node);

  let data = productNodes?.map((product) => ({
    product: product,
    page: pageNodes.find((page) => {
      return page?.remoteFields?.handle === `page-${product?.content.handle}`;
    })
  }));

  data = [...data];
  return data;
};

module.exports = ProductsQuery;
