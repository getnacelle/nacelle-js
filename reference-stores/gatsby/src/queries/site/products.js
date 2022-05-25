import { useStaticQuery, graphql } from 'gatsby';

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

export default ProductsQuery;
