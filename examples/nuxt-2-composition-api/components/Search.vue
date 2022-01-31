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
import { onMounted, ref, useRoute, useRouter } from '@nuxtjs/composition-api';
import { useSearchProvider, RefinementProvider } from '@nacelle/vue';
import Refinement from '~/components/Refinement';
export default {
  components: { RefinementProvider, Refinement },
  setup() {
    const query = ref('');
    const route = useRoute();
    const router = useRouter();
    const { search, results } = useSearchProvider();
    const refinedData = ref([]);
    onMounted(() => {
      if (route.value.query.q) {
        query.value = route.value.query.q;
        search({ query: query.value });
      }
    });
    const submitSearch = () => {
      router.push({ path: `/search?q=${query.value}` });
      search({ query: query.value });
    };
    return { query, submitSearch, results, refinedData };
  }
};
</script>

<style></style>
