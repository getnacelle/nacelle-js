<template>
  <div v-if="product && product.handle" class="product">
    <nuxt-img :src="product.featuredMedia.src" class="product__image" />
    {{ product }}
  </div>
  <div v-else-if="fetchState.pending">Loading...</div>
</template>

<script>
import { inject, ref, useContext, useFetch } from '@nuxtjs/composition-api';
import nuxtImg from '@nuxt/image';

export default {
  // components: { nuxtImg },
  /// shevonne-bag
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

<style lang="scss" scoped>
.product {
  display: flex;
}
</style>
