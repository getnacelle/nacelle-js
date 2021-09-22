<template>
  <div v-if="collection && Object.keys(collection).length" class="collection">
    <product-provider
      v-for="(product, index) in collection.products"
      :key="index"
      :product="product"
      class="collection__item"
    >
      <product />
    </product-provider>
  </div>
</template>

<script>
import { ProductProvider, useCollectionProvider } from '@nacelle/vue';
import Product from '~/components/Product';

export default {
  components: { ProductProvider, Product },
  setup() {
    const { collection } = useCollectionProvider();

    return {
      collection
    };
  }
};
</script>

<style lang="scss" scoped>
.collection {
  display: flex;
  flex-wrap: wrap;
  gap: 30px 0;
}
.collection__item {
  width: 25%;
  padding: 0 20px;
  &::v-deep {
    .product {
      flex-direction: column;
    }
    .product__image,
    .product__main {
      width: 100%;
    }
    .product__description {
      display: none;
    }
  }
}
</style>
