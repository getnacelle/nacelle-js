import { useState } from 'react';
import { useRouter } from 'next/router';
import { nacelleClient } from 'services';
import ProductCard from 'components/ProductCard';
import styles from 'styles/Collection.module.css';

function Collection(props) {
  const router = useRouter();
  const { collection } = props;
  const [products, setProducts] = useState(props.products);
  const [canFetch, setCanFetch] = useState(props.canFetch);
  const [isFetching, setIsFetching] = useState(false);

  const activeProducts = canFetch
    ? products?.slice(0, products.length - 1)
    : products;

  // Performs a GraphQL query to Nacelle to get paginated products
  // from a collection, using the last `nacelleEntryId` as a cursor.
  // (https://nacelle.com/docs/querying-data/storefront-sdk)
  const handleFetch = async () => {
    setIsFetching(true);
    const after = products[products?.length - 1].nacelleEntryId;
    const { allProductCollections } = await nacelleClient.query({
      query: PRODUCTS_QUERY,
      variables: { handle: router.query.handle, after }
    });
    const newProducts = allProductCollections.edges
      .at(0)
      ?.node?.productConnection.edges.map((edge) => edge.node);
    if (newProducts) {
      setCanFetch(newProducts.length === 12);
      setProducts([...products, ...newProducts]);
    }
    setIsFetching(false);
  };

  return (
    collection && (
      <div className={styles.collection}>
        {collection.content?.title && <h1>{collection.content.title}</h1>}
        <div className={styles.list}>
          {activeProducts.map((product, index) => (
            <div className={styles.item} key={`${product.id}-${index}`}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        {canFetch && (
          <button
            className={styles.action}
            disabled={isFetching}
            onClick={handleFetch}
          >
            Load More
          </button>
        )}
      </div>
    )
  );
}

export default Collection;

export async function getStaticPaths() {
  // Performs a GraphQL query to Nacelle to get product collection handles.
  // (https://nacelle.com/docs/querying-data/storefront-sdk)
  const results = await nacelleClient.query({
    query: HANDLES_QUERY
  });
  const handles = results.allProductCollections.edges
    .filter((collection) => collection.node.content?.handle)
    .map((collection) => ({
      params: { handle: collection.node.content.handle }
    }));

  return {
    paths: handles,
    fallback: 'blocking'
  };
}

export async function getStaticProps({ params }) {
  // Performs a GraphQL query to Nacelle to get product collection data,
  // using the handle of the current page.
  // (https://nacelle.com/docs/querying-data/storefront-sdk)
  const { allProductCollections } = await nacelleClient.query({
    query: PAGE_QUERY,
    variables: { handle: params.handle }
  });

  if (!allProductCollections.edges.length) {
    return {
      notFound: true
    };
  }

  const { productConnection, ...rest } = allProductCollections.edges.at(0).node;
  const products = productConnection.edges.map((edge) => edge.node);
  return {
    props: {
      collection: rest,
      products,
      canFetch: products?.length > 12
    }
  };
}

// GraphQL fragment of necessary product data.
// (https://nacelle.com/docs/querying-data/storefront-api)
const PRODUCT_FRAGMENT = /* GraphQL */ `
  fragment CollectionProductFragment on Product {
    nacelleEntryId
    sourceEntryId
    content {
      handle
      title
      options {
        name
        values
      }
      featuredMedia {
        src
        thumbnailSrc
        altText
      }
    }
    variants {
      nacelleEntryId
      sourceEntryId
      sku
      availableForSale
      price
      compareAtPrice
      content {
        title
        selectedOptions {
          name
          value
        }
        featuredMedia {
          src
          thumbnailSrc
          altText
        }
      }
    }
  }
`;

// GraphQL query for the handles of product collections.
// Used in `getStaticPaths`.
// (https://nacelle.com/docs/querying-data/storefront-api)
const HANDLES_QUERY = /* GraphQL */ `
  {
    allProductCollections {
      edges {
        node {
          content {
            handle
          }
        }
      }
    }
  }
`;

// GraphQL query for product collection content and initial products.
// Used in `getStaticProps`.
// (https://nacelle.com/docs/querying-data/storefront-api)
const PAGE_QUERY = /* GraphQL */ `
  query CollectionPage($handle: String!) {
    allProductCollections(filter: { handles: [$handle] }) {
      edges {
        node {
          nacelleEntryId
          sourceEntryId
          content {
            title
          }
          productConnection(first: 13) {
            edges {
              node {
                ...CollectionProductFragment
              }
            }
          }
        }
      }
    }

    flashSales: allContent(filter: { type: "flashSale" }) {
      edges {
        node {
          fields
        }
      }
    }
  }
  ${PRODUCT_FRAGMENT}
`;

// GraphQL query for paginated products within a collection.
// Used in `handleFetch`.
// (https://nacelle.com/docs/querying-data/storefront-api)
const PRODUCTS_QUERY = /* GraphQL */ `
  query CollectionProducts($handle: String!, $after: String!) {
    allProductCollections(filter: { handles: [$handle] }) {
      edges {
        node {
          productConnection(first: 12, after: $after) {
            pageInfo {
              hasNextPage
              endCursor
            }
            edges {
              node {
                ...CollectionProductFragment
              }
            }
          }
        }
      }
    }
  }
  ${PRODUCT_FRAGMENT}
`;
