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
                remoteImage {
                  childImageSharp {
                    gatsbyImageData(
                      width: 500
                      quality: 80
                      placeholder: TRACED_SVG
                    )
                  }
                }
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
