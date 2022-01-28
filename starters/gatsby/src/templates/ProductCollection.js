import React from 'react';
import { graphql } from 'gatsby';
import ProductCard from '../components/ProductCard';
import PageNavigator from '../components/PageNavigator';
import * as styles from '../styles/Collection.module.css';

export default function Collection({ data, pageContext }) {
  const collection = data.nacelleProductCollection;
  const collectionProducts = data.allNacelleProduct?.edges.map(
    ({ node }) => node
  );

  return (
    collection && (
      <>
        <div className={styles.collection}>
          {collection.content?.title && <h1>{collection.content.title}</h1>}
          <div className={styles.list}>
            {collectionProducts?.map((product, index) => (
              <div className={styles.item} key={`${product.id}-${index}`}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
        <PageNavigator
          numPages={pageContext.numPages}
          basePath={`/collections/${pageContext.productCollectionHandle}`}
        />
      </>
    )
  );
}

export const query = graphql`
  query PaginatedProducts(
    $productCollectionHandle: String
    $productHandles: [String]
  ) {
    nacelleProductCollection(
      content: { handle: { eq: $productCollectionHandle } }
    ) {
      content {
        title
      }
    }
    allNacelleProduct(
      filter: { content: { handle: { in: $productHandles } } }
    ) {
      edges {
        node {
          nacelleEntryId
          content {
            handle
            title
            locale
            featuredMedia {
              remoteImage {
                childImageSharp {
                  gatsbyImageData(width: 800, placeholder: TRACED_SVG)
                }
              }
              src
              altText
            }
          }
          metafields {
            key
            namespace
            value
          }
          variants {
            nacelleEntryId
            sourceEntryId
            availableForSale
            compareAtPrice
            price
            priceCurrency
            metafields {
              key
              namespace
              value
            }
            sku
            content {
              swatchSrc
              title
              sourceEntryId
              featuredMedia {
                src
                thumbnailSrc
                altText
                remoteImage {
                  childImageSharp {
                    gatsbyImageData(width: 800, placeholder: TRACED_SVG)
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
