<script context="module">
  import { nacelleClient } from '~/services'

  const PAGE_QUERY = `
    query ProductPage($handle: String!){
      products(filter: { handles: [$handle] }){
        nacelleEntryId
        sourceEntryId
        content{
          handle
          title
          description
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
    }
  `;

  export async function load({ params }) {
    const { products } = await nacelleClient.query({
      query: PAGE_QUERY,
      variables: { handle: params.handle }
    });
    return {
      props: { product: products[0] }
    };
  }
</script>

<script>
  export let product
</script>

<div>
  {#if product}
    <div class="product">
      {#if product.content.featuredMedia}
        <div class="product__media">
          <img
            src={product.content.featuredMedia.src}
            alt={product.content.featuredMedia.altText}
            class="product__image"
          />
        </div>
      {/if}
      <div class="product__main">
        {#if product.content.title}
          <h1 class="product__title">
            {product.content.title}
          </h1>
        {/if}
      </div>
    </div>
  {/if}
</div>

<style lang=scss>
  .product {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
  @media only screen and (min-width: 768px) {
    flex-direction: row;
  }
}
.product__media,
.product__main {
  width: 100%;
  overflow: hidden;
  @media only screen and (min-width: 768px) {
    width: 50%;
  }
}
.product__image {
  width: 100%;
}
.product__main {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}
.product__prices {
  display: flex;
  gap: 10px;
}
.product__compare {
  text-decoration: line-through;
}
</style>