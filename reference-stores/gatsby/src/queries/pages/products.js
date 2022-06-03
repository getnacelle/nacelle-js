const { PRODUCT_QUERY } = require('../products/product');
const { SECTIONS_QUERY } = require('../sections/product');
const { resolvePageData } = require('../../utils/resolvers/resolvePageData');

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
  let pageNodes = pages.edges.map(({ node }) => node);
  pageNodes = await Promise.all(
    pageNodes.map((pageNode) => {
      return resolvePageData({
        graphql,
        page: pageNode
      });
    })
  );

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
