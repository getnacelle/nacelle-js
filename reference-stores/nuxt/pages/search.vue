<template>
  <div class="bg-white">
    <div class="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
      <div
        class="border-b border-gray-200 pb-10 flex flex-wrap items-center gap-4 md:gap-8"
      >
        <h1 class="text-4xl font-extrabold tracking-tight text-gray-900">
          Search
        </h1>
        <div class="w-full md:w-auto">
          <label for="search-page" class="sr-only">Search</label>
          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <svg
                class="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <input
              v-model="query"
              name="search-page"
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search"
              type="search"
            />
          </div>
        </div>
      </div>
      <search-results :catalog="products" :query="query" />
    </div>
  </div>
</template>

<script>
import { SEARCH_PAGE_QUERY } from '~/queries/searchPage';
import { buildMeta } from '~/utils/buildMeta';

import SearchResults from '~/components/search/SearchResults.vue';

export default {
  name: 'SearchPage',
  components: {
    SearchResults
  },
  async asyncData({ app }) {
    const { products } = await app.$nacelle.query({
      query: SEARCH_PAGE_QUERY
    });
    return {
      products
    };
  },
  data: () => ({
    query: ''
  }),
  head() {
    return buildMeta({ route: this.$route });
  },
  watch: {
    query: {
      handler(value) {
        this.$router.push({ path: `/search?q=${value}` });
      }
    }
  },
  created() {
    this.query = this.$route.query.q || '';
  }
};
</script>

<style lang="scss" scoped></style>
