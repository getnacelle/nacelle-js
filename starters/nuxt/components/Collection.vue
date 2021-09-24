<template>
  <div v-if="collection" class="collection">
    <product-provider
      v-for="(product, index) in collection.products"
      :key="index"
      :product="product"
      class="collection__item"
    >
      <product />
    </product-provider>
    <div v-if="!loaded" class="collection__footer">
      <button
        class="collection__more"
        :disabled="isFetching"
        @click="loadProducts"
      >
        Load More
      </button>
    </div>
  </div>
</template>

<script>
import { computed } from '@nuxtjs/composition-api';
import { ProductProvider, useCollectionProvider } from '@nacelle/vue';
import Product from '~/components/Product';

export default {
  components: { ProductProvider, Product },
  setup() {
    const { collection, isFetching, loadProducts } = useCollectionProvider();

    const loaded = computed(() => {
      const total = collection?.value?.productLists[0]?.handles?.length || 0;
      const current = collection?.value?.products?.length;
      return current >= total;
    });

    return {
      collection,
      isFetching,
      loadProducts,
      loaded
    };
  }
};
</script>

<style lang="scss" scoped>
.collection {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20em, 1fr));
  gap: 30px 0;
}
.collection__item {
  padding: 0 20px;
  &::v-deep {
    .product {
      flex-direction: column;
    }
    .product__media,
    .product__main {
      width: 100%;
    }
    .product__description {
      display: none;
    }
  }
}
.collection__footer {
  width: 100%;
  text-align: center;
}
</style>
