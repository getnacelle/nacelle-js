<template>
  <search-provider
    v-if="searchData && searchData.length"
    :search-data="searchData"
  >
    <search />
  </search-provider>
</template>

<script>
import { inject, useAsync } from '@nuxtjs/composition-api';
import { SearchProvider } from '@nacelle/vue';
import Search from '~/components/Search';

export default {
  components: { SearchProvider, Search },
  setup() {
    const nacelleSdk = inject('nacelleSdk');
    const searchData = useAsync(() => nacelleSdk.data.allProducts());
    return { searchData };
  }
};
</script>
