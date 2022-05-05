<template>
  <div class="bg-white">
    <search-form v-if="products" :catalog="products" />
  </div>
</template>

<script>
import { SEARCH_PAGE_QUERY } from '~/queries/searchPage';
import { buildMeta } from '~/utils/buildMeta';
import SearchForm from '~/components/search/SearchForm';

export default {
  name: 'SearchPage',
  components: {
    SearchForm
  },
  async asyncData({ app }) {
    const { products } = await app.$nacelle.query({
      query: SEARCH_PAGE_QUERY
    });
    return {
      products
    };
  },
  head() {
    return buildMeta({ route: this.$route });
  }
};
</script>
