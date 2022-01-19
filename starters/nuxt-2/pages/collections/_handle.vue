<template>
  <div v-if="collection" class="collection">
    <h1 class="collection__heading">{{ collection.content.title }}</h1>
    <div v-if="products.length > 0" class="collection__main">
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
    <div v-else class="collection__empty">No Products Found</div>
  </div>
</template>

<script>
export default {
  name: 'CollectionPage',
  async asyncData({ app, params }) {
    const collections = await app.$nacelle.productCollections({
      handles: [params.handle]
    });
    return {
      collection: collections[0],
      products: collections[0]?.products.slice(0, 12)
    };
  },
  data: () => ({
    collection: null,
    products: null
  }),
  computed: {
    canFetch() {
      return this.collection?.products.length > this.products?.length;
    }
  },
  methods: {
    handleFetch() {
      this.products = [
        ...this.products,
        ...this.collection.products.slice(
          this.products.length,
          this.products.length + 12
        )
      ];
    }
  }
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
.collection__action {
  display: block;
  margin: 30px auto 0;
}
</style>
