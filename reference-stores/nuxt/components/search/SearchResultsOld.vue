<template>
  <div v-if="catalog" class="py-6">
    <div v-if="searchResults.length">
      <p class="text-lg leading-6">
        {{ searchResults.length }} result(s) found
      </p>
      <div class="pt-12 lg:mt-0 lg:col-span-2 xl:col-span-3">
        <div
          class="
            grid grid-cols-2
            gap-x-4 gap-y-8
            sm:grid-cols-3 sm:gap-x-6
            lg:grid-cols-4
            xl:gap-x-8
          "
        >
          <product-card
            v-for="result in searchResults"
            :key="result.nacelleEntryId"
            :product="result"
          />
        </div>
      </div>
    </div>
    <p v-else class="text-lg leading-6"></p>
  </div>
</template>

<script>
import { searchCatalog } from '~/utils/searchCatalog';

import ProductCard from '~/components/product/ProductCard.vue';

export default {
  name: 'SearchResults',
  components: {
    ProductCard
  },
  props: {
    catalog: {
      type: Array,
      required: true
    },
    query: {
      type: String,
      required: true
    }
  },
  data: () => ({
    searchResults: []
  }),
  watch: {
    query: {
      immediate: true,
      handler() {
        this.handleSearch();
      }
    }
  },
  methods: {
    handleSearch() {
      this.searchResults = searchCatalog({
        catalog: [...this.catalog],
        query: this.query
      });
    }
  }
};
</script>
