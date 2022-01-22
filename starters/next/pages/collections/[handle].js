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
  const { productCollections } = await nacelleClient.query({
    query: PAGE_QUERY,
    variables: { handle: params.handle }
  });

  if (!productCollections.length) {
    return {
      notFound: true
    };
  }

  const { products, ...rest } = productCollections[0];
  return {
    props: {
      collection: rest,
      products,
      canFetch: products?.length > 12
    }
  };
}

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

const HANDLES_QUERY = `
  {
    productCollections {
      content {
        handle
      }
    }
  }
`;

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
  }
`;

const PRODUCTS_QUERY = `
  query CollectionProducts($handle: String!, $after: String!){
    productCollections(filter: { handles: [$handle] }){
      products(first: 12, after: $after){
        ${PRODUCT_FRAGMENT}
      }
    }
  }
`;
