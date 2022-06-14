<script context="module">
  import { nacelleClient } from '~/services'

  export const PRODUCT_FRAGMENT = `
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

  export async function load({ params }) {
    const { productCollections } = await nacelleClient.query({
      query: PAGE_QUERY,
      variables: { handle: params.handle }
    });
    if (productCollections[0]) {
      const { products, ...rest } = productCollections[0];
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

  const PRODUCTS_QUERY = `
    query CollectionProducts($handle: String!, $after: String!){
      productCollections(filter: { handles: [$handle] }){
        products(first: 12, after: $after){
          ${PRODUCT_FRAGMENT}
        }
      }
    }
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
    const { productCollections } = await nacelleClient.query({
      query: PRODUCTS_QUERY,
      variables: { handle, after }
    });
    const fetchedProducts = productCollections[0]?.products;
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