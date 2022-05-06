<template>
  <div class="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
    <div
      class="
        border-b border-gray-200
        pb-10
        flex flex-wrap
        items-center
        gap-4
        md:gap-8
      "
    >
      <h1 class="text-4xl font-extrabold tracking-tight text-gray-900">
        Search
      </h1>
      <div class="w-full md:w-auto">
        <label for="search-page" class="sr-only">Search</label>
        <div class="relative">
          <div
            class="
              absolute
              inset-y-0
              left-0
              pl-3
              flex
              items-center
              pointer-events-none
            "
          >
            <span class="h-5 w-5 text-gray-400" v-html="searchIcon" />
          </div>
          <input
            v-model="query"
            name="search-page"
            class="
              block
              w-full
              pl-10
              pr-3
              py-2
              border border-gray-300
              rounded-md
              leading-5
              bg-white
              placeholder-gray-500
              focus:outline-none
              focus:placeholder-gray-400
              focus:ring-1
              focus:ring-indigo-500
              focus:border-indigo-500
              sm:text-sm
            "
            placeholder="Search"
            type="search"
          />
        </div>
      </div>
    </div>
    <div v-show="query.trim() !== ''" class="py-6">
      <p class="text-lg leading-6">{{ resultsText }}</p>
      <div class="pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
        <search-filters
          :active-filters="activeFilters"
          :available-filters="availableFilters"
          @change="handleFilterChange"
        />
        <search-results :results="results" />
      </div>
    </div>
  </div>
</template>

<script>
import { searchProducts } from '~/utils/searchProducts';
import { getProductFilters } from '~/utils/getProductFilters';
import { filterProducts } from '~/utils/filterProducts';
import searchIcon from '~/assets/svgs/search';

import SearchFilters from '~/components/search/SearchFilters.vue';
import SearchResults from '~/components/search/SearchResults.vue';

export default {
  components: {
    SearchFilters,
    SearchResults
  },
  props: {
    catalog: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    query: '',
    searchResults: [],
    results: [],
    activeFilters: [],
    availableFilters: [],
    searchIcon
  }),
  computed: {
    resultsText() {
      return this.results.length
        ? `${this.results.length} results(s) found`
        : 'No results found...';
    }
  },
  watch: {
    '$route.query.q': {
      handler(value) {
        this.query = value;
      }
    },
    query: {
      handler(value) {
        this.$router.push({ path: `/search?q=${value}` });
        this.handleSearch();
      }
    },
    activeFilters: {
      handler() {
        this.handleFilter();
      }
    }
  },
  created() {
    this.query = this.$route.query.q || '';
  },
  methods: {
    handleSearch() {
      this.searchResults = searchProducts({
        products: this.catalog,
        query: this.query
      });
      this.updateFilters();
    },
    handleFilter() {
      this.results = filterProducts({
        products: this.searchResults,
        filters: this.activeFilters
      });
    },
    updateFilters() {
      this.availableFilters = getProductFilters({
        products: this.searchResults
      });
      this.activeFilters = this.activeFilters.filter((activeFilter) => {
        return this.availableFilters.find(
          (availableFilter) =>
            activeFilter.type === availableFilter.type &&
            activeFilter.name === availableFilter.name &&
            availableFilter.values.includes(activeFilter.value)
        );
      });
    },
    handleFilterChange(value) {
      this.activeFilters = [...value];
    }
  }
};
</script>
