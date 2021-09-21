<template>
  <product-provider
    v-if="product && Object.keys(product).length"
    :product="product"
    class="product-page"
  />
  <div v-else-if="fetchState.pending">Loading...</div>
  <div v-else-if="fetchState.error">Error</div>
</template>

<script>
import { inject, ref, useContext, useFetch } from '@nuxtjs/composition-api';
import { ProductProvider } from '@nacelle/vue';

/// shevonne-bag

export default {
  components: { ProductProvider },
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
