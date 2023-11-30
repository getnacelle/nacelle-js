<script context="module">
  import { nacelleClient } from '~/services'

  export const PRODUCT_FRAGMENT =  /* GraphQL */ `
  fragment CollectionProductFragment on Product {
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
  }
`;

const PAGE_QUERY =  /* GraphQL */ `
  query CollectionPage($handle: String!){
    allProductCollections(filter: { handles: [$handle] }){
      edges {
        node {
          nacelleEntryId
          sourceEntryId
          content{
            title
          }
          productConnection(first: 13){
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

  export async function load({ params }) {
    const { allProductCollections } = await nacelleClient.query({
      query: PAGE_QUERY,
      variables: { handle: params.handle }
    });
    if (allProductCollections.edges.at(0)) {
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
  }
</script>

<script>
  import { page } from '$app/stores'
  import ProductCard from '~/components/ProductCard.svelte'

  let handle = ''
  page.subscribe(value => {
    handle = value.params.handle
  })

  const PRODUCTS_QUERY = /* GraphQL */ `
    query CollectionProducts($handle: String!, $after: String!){
      allProductCollections(filter: { handles: [$handle] }){
        edges {
          node {
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
    }
    ${PRODUCT_FRAGMENT}
  `;

  export let collection
  export let products
  export let canFetch
  export let isFetching = false

  const getActiveProducts = () => canFetch
    ? products?.slice(0, products.length - 1)
    : products

  export let activeProducts = getActiveProducts()

  export const handleFetch = async() => {
    isFetching = true
    const after = products[products?.length - 1].nacelleEntryId;
    const { allProductCollections } = await nacelleClient.query({
      query: PRODUCTS_QUERY,
      variables: { handle, after }
    });
    const fetchedProducts = allProductCollections.edges.at(0)?.node.productConnection.edges.map((edge) => edge.node);
    if (fetchedProducts) {
      canFetch = fetchedProducts.length === 12;
      products = [...products, ...fetchedProducts];
    }
    activeProducts = getActiveProducts()
    isFetching = false;
  }

</script>

<div>
  {#if collection}
    <div class="collection">
      {#if collection.content.title}
        <h1 class="collection__heading">
          {collection.content.title}
        </h1>
      {/if}
      {#if activeProducts.length > 0}
        <div class="collection__main">
          <div class="collection__list">
            {#each activeProducts as product (product.nacelleEntryId)}
              <div class="collection__item">
                <ProductCard product={product} />
              </div>
            {/each}
          </div>
          {#if canFetch}
            <button
              disabled={isFetching}
              class="collection__action"
              on:click={handleFetch}
            >
              Load More
            </button>
          {/if}
        </div>
      {:else}
        <div class="collection__empty">Empty Collection</div>
      {/if}
    </div>
  {/if}
</div>

<style lang=scss>
.collection {
  width: 100%;
}
.collection__list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20em, 1fr));
  gap: 30px 0;
}
.collection__item {
  padding: 0 20px;
}
.collection__action {
  display: block;
  margin: 30px auto 0;
}
</style>