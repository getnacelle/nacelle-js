<template>
  <div v-if="collection" class="collection">
    <h1 class="collection__heading">{{ collection.content.title }}</h1>
    <!-- <div v-if="products.length > 0" class="collection__main">
      <div class="collection__list">
        <product-card
          v-for="product in products"
          :key="product.nacelleEntryId"
          :product="product"
          class="collection__item"
        />
      </div>
      <button v-if="canFetch" class="collection__action" @click="handleFetch">
        Load More
      </button>
    </div>
    <div v-else class="collection__empty">No Products Found</div> -->
  </div>
</template>

<script>
export default {
  name: 'CollectionPage',
  async asyncData({ app, params }) {
    const { productCollections } = await app.$nacelle.query({
      query: PAGE_QUERY,
      variables: { handle: params.handle }
    });
    return {
      collection: productCollections[0]
    };
  },
  data: () => ({
    collection: null
  })
  // computed: {
  //   canFetch() {
  //     return this.collection?.products.length > this.products?.length;
  //   }
  // },
  // methods: {
  //   handleFetch() {
  //     this.products = [
  //       ...this.products,
  //       ...this.collection.products.slice(
  //         this.products.length,
  //         this.products.length + 12
  //       )
  //     ];
  //   }
  // }
};

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
</script>

<style lang="scss" scoped>
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
