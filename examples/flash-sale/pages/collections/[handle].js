import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { nacelleClient } from 'services';
import ProductCard from 'components/ProductCard';
import styles from 'styles/Collection.module.css';
import Countdown, { formatTimeDelta, zeroPad } from 'react-countdown';

function Collection(props) {
  const router = useRouter();
  const { collection, flashSale } = props;
  const [products, setProducts] = useState(props.products);
  const [canFetch, setCanFetch] = useState(props.canFetch);
  const [isFetching, setIsFetching] = useState(false);
  const [showCountdown, setShowCountdown] = useState();

  useEffect(() => {
    setShowCountdown(true);
  }, []);

  const activeProducts = canFetch
    ? products?.slice(0, products.length - 1)
    : products;

  let flashSaleText = false;
  const flashSaleRenderer = (timeDelta) => {
    const formattedDate = formatTimeDelta(timeDelta, {
      daysInHours: true
    });
    const { hours, minutes, seconds, completed } = formattedDate;
    if (completed || !showCountdown) {
      return <></>;
    } else {
      return (
        <p>
          <strong>Sale Ends</strong> {zeroPad(hours)}:{zeroPad(minutes)}:
          {zeroPad(seconds)}
        </p>
      );
    }
  };
  if (flashSale?.fields?.endDate) {
    const now = new Date();
    let endDate = new Date(flashSale.fields.endDate);

    // The following code ensure that a timer is always present
    // for demo purposes. It would typically not be included in
    // production code.
    if (now > endDate) {
      endDate = new Date();
      endDate.setDate(now.getDate() + 1);
      endDate.setHours(0, 0, 0, 0);
    }
    // End of demo code.

    if (now < endDate) {
      flashSaleText = <Countdown date={endDate} renderer={flashSaleRenderer} />;
    }
  }

  // Performs a GraphQL query to Nacelle to get paginated products
  // from a collection, using the last `nacelleEntryId` as a cursor.
  // (https://nacelle.com/docs/querying-data/storefront-sdk)
  const handleFetch = async () => {
    setIsFetching(true);
    const after = products[products?.length - 1].nacelleEntryId;
    const { productCollections } = await nacelleClient.query({
      query: PRODUCTS_QUERY,
      variables: { handle: router.query.handle, after }
    });
    const newProducts = productCollections[0]?.products;
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
        {flashSaleText}
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
  const handles = results.productCollections
    .filter((collection) => collection.content?.handle)
    .map((collection) => ({ params: { handle: collection.content.handle } }));

  return {
    paths: handles,
    fallback: 'blocking'
  };
}

export async function getStaticProps({ params }) {
  // Performs a GraphQL query to Nacelle to get product collection data,
  // using the handle of the current page.
  // (https://nacelle.com/docs/querying-data/storefront-sdk)
  const { productCollections, flashSales } = await nacelleClient.query({
    query: PAGE_QUERY,
    variables: { handle: params.handle }
  });

  if (!productCollections.length) {
    return {
      notFound: true
    };
  }

  const flashSale =
    flashSales.find((flashSale) => {
      if (
        params.handle !== flashSale.fields.collectionHandle ||
        !flashSale.fields.endDate
      ) {
        return false;
      }
      // Typically an expired flash sale would be filtered out.
      // But for the purpose of this demo, and to ensure that
      // the timer is always available, expired flash sales
      // are returned, and the date will be updated to be the
      // next day. Uncomment the code below to filter out
      // expired flash sales.
      // const now = new Date();
      // let endDate = new Date(flashSale.fields.endDate);
      // if (now > endDate) return false;
      return true;
    }) || false;

  const { products, ...rest } = productCollections[0];
  return {
    props: {
      collection: rest,
      products,
      canFetch: products?.length > 12,
      flashSale
    },
    revalidate: 60
  };
}

// GraphQL fragment of necessary product data.
// (https://nacelle.com/docs/querying-data/storefront-api)
const PRODUCT_FRAGMENT = `
  nacelleEntryId
  sourceEntryId
  content{
    handle
    title
    options{
      name
      values
    }
    featuredMedia{
      src
      thumbnailSrc
      altText
    }
  }
  variants{
    nacelleEntryId
    sourceEntryId
    sku
    availableForSale
    price
    compareAtPrice
    content{
      title
      selectedOptions{
        name
        value
      }
      featuredMedia{
        src
        thumbnailSrc
        altText
      }
    }
  }
`;

// GraphQL query for the handles of product collections.
// Used in `getStaticPaths`.
// (https://nacelle.com/docs/querying-data/storefront-api)
const HANDLES_QUERY = `
  {
    productCollections {
      content {
        handle
      }
    }
  }
`;

// GraphQL query for product collection content and initial products.
// Used in `getStaticProps`.
// (https://nacelle.com/docs/querying-data/storefront-api)
const PAGE_QUERY = `
  query CollectionPage($handle: String!){
    productCollections(filter: { handles: [$handle] }){
      nacelleEntryId
      sourceEntryId
      content{
        title
      }
      products(first: 13){
        ${PRODUCT_FRAGMENT}
      }
    }

    flashSales: content(filter: { type: "flashSale" }){
      fields
    }
  }
`;

// GraphQL query for paginated products within a collection.
// Used in `handleFetch`.
// (https://nacelle.com/docs/querying-data/storefront-api)
const PRODUCTS_QUERY = `
  query CollectionProducts($handle: String!, $after: String!){
    productCollections(filter: { handles: [$handle] }){
      products(first: 12, after: $after){
        ${PRODUCT_FRAGMENT}
      }
    }
  }
`;
