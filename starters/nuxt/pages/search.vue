<template>
  <search-provider
    v-if="searchData && searchData.length"
    :search-data="searchData"
  >
    <search />
  </search-provider>
  <div v-else-if="fetchState.pending">Loading...</div>
  <div v-else-if="fetchState.error">Error</div>
</template>

<script>
import { inject, ref, useFetch } from '@nuxtjs/composition-api';
import { SearchProvider } from '@nacelle/vue';
import Search from '~/components/Search';

export default {
  components: { SearchProvider, Search },
  setup() {
    const searchData = ref([]);
    const nacelleSdk = inject('nacelleSdk');
    const { fetchState } = useFetch(async () => {
      searchData.value = await nacelleSdk.data.allProducts();
    });
    return { fetchState, searchData };
  }
};
</script>
