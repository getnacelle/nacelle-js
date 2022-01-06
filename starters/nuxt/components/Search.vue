<template>
  <div>
    <input v-model="query" />
    <button @click="submitSearch">Search</button>
    <p>{{ results.length }} result(s)</p>
    <refinement-provider
      :input-data="results"
      :property-filters="[
        { field: 'productType', label: 'Product Type' },
        { field: 'color', label: 'Color' },
        { field: 'material', label: 'Material' },
        { field: 'size', label: 'Size' }
      ]"
    >
      <refinement />
    </refinement-provider>
  </div>
</template>

<script>
import { useSearchProvider, RefinementProvider } from '@nacelle/vue';
import Refinement from '~/components/Refinement';

export default {
  components: { RefinementProvider, Refinement },
  setup() {
    const { search, results } = useSearchProvider();
    return {
      search,
      results
    };
  },
  data: () => ({
    query: ''
  }),
  mounted() {
    if (this.$route.query.q) {
      this.query = this.$route.query.q;
      this.search({ query: this.query });
    }
  },
  methods: {
    submitSearch() {
      this.$router.push({ path: `/search?q=${this.query}` });
      this.search({ query: this.query });
    }
  }
};
</script>

<style></style>
