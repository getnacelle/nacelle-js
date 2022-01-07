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
import { inject, useContext, useAsync } from '@nuxtjs/composition-api';
import { ProductProvider } from '@nacelle/vue';
import Product from '~/components/Product';

export default {
  components: { ProductProvider, Product },
  setup() {
    const { route } = useContext();
    const nacelleSdk = inject('nacelleSdk');

    const handle = route.value.params.handle;
    const product = useAsync(() => nacelleSdk.data.product({ handle }));

    return { product };
  }
};
</script>
