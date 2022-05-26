const { useStaticQuery, graphql } = require('gatsby');

const ProductsQuery = () =>
  useStaticQuery(graphql`
    {
      products: allNacelleProduct {
        edges {
          node {
            nacelleEntryId
            content {
              handle
              title
              featuredMedia {
                src
                thumbnailSrc
                altText
              }
            }
            variants {
              price
              compareAtPrice
            }
          }
        }
      }
    }
  `);

module.exports = ProductsQuery;
