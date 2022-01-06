<template>
  <search-provider
    v-if="searchData && searchData.length"
    :search-data="searchData"
  >
    <search />
  </search-provider>
</template>

<script>
import { SearchProvider, useSpaceProvider } from '@nacelle/vue';
import Search from '~/components/Search';

export default {
  components: { SearchProvider, Search },
  setup() {
    const { nacelleSdk } = useSpaceProvider();
    return {
      nacelleSdk
    };
  },
  data: () => ({
    searchData: []
  }),
  async fetch() {
    this.searchData = await this.nacelleSdk.data.allProducts();
  }
};
</script>
