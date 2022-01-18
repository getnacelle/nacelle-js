<template>
  <div v-if="collection" class="collection">
    <div v-if="products.length > 0" class="collection__list">
      <product-card
        v-for="product in products"
        :key="product.nacelleEntryId"
        :product="product"
        class="collection__item"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CollectionPage',
  async asyncData({ app, params }) {
    const [collections, products] = await Promise.all([
      app.$nacelle.productCollections({ handles: [params.handle] }),
      app.$nacelle.productCollectionEntries({
        handle: params.handle,
        maxReturnedEntries: 12
      })
    ]);
    return {
      collection: collections[0],
      products
    };
  },
  data: () => ({
    collection: null,
    products: null
  })
};
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
</style>
