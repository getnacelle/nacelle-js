<template>
  <product-provider
    v-if="product && Object.keys(product).length"
    :product="product"
    class="product-page"
  >
    <product />
  </product-provider>
  <div v-else-if="fetchState.pending">Loading...</div>
  <div v-else-if="fetchState.error">Error</div>
</template>

<script>
import { inject, ref, useContext, useFetch } from '@nuxtjs/composition-api';
import { ProductProvider } from '@nacelle/vue';
import Product from '~/components/Product';

export default {
  components: { ProductProvider, Product },
  setup() {
    const product = ref({});
    const { route } = useContext();
    const nacelleSdk = inject('nacelleSdk');

    const handle = route.value.params.handle;
    const { fetchState } = useFetch(async () => {
      product.value = await nacelleSdk.data.product({ handle });
    });

    return { fetchState, product };
  }
};
</script>
