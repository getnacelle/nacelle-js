<template>
  <product-provider
    v-if="product && Object.keys(product).length"
    :product="product"
    class="product-page"
  >
    <product />
  </product-provider>
</template>

<script>
import { ProductProvider, useSpaceProvider } from '@nacelle/vue';
import Product from '~/components/Product';

export default {
  components: { ProductProvider, Product },
  setup() {
    const { nacelleSdk } = useSpaceProvider();
    return {
      nacelleSdk
    };
  },
  data: () => ({
    product: null
  }),
  async fetch() {
    this.product = await this.nacelleSdk.data.product({
      handle: this.$route.params.handle
    });
  }
};
</script>
