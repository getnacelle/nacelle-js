<template>
  <div v-if="catalog" class="search">
    <input v-model="query" class="search__input" />
    <button class="search__submit" @click="handleSearch">Search</button>
    <p class="search__count">{{ results.length }} result(s)</p>
    <button class="search__action" @click="handleClear">Clear Filters</button>
    <div class="search__refine">
      <h3 class="search__refine-heading">Sort By</h3>
      <select
        class="search__refine-select"
        @change="handleSort($event.target.value)"
      >
        <option>Sort By</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
      <h3 class="search__refine-heading">Price</h3>
      <select
        class="search__refine-select"
        @change="handlePrices($event.target.value)"
      >
        <option value="">All</option>
        <option
          v-for="price in options.prices"
          :key="price.value"
          :value="price.value"
        >
          {{ price.label }}
        </option>
      </select>
    </div>
    <div v-if="results.length" class="search__list">
      <product-card
        v-for="result in results"
        :key="result.nacelleEntryId"
        :product="result"
        class="search__item"
      />
    </div>
  </div>
</template>

<script>
import { getSearchData } from '~/utils/getSearchData';
import { searchCatalog } from '~/utils/searchCatalog';
import { sortCatalog } from '~/utils/sortCatalog';
import { refineCatalog } from '~/utils/refineCatalog';

export default {
  name: 'SearchPage',
  async asyncData({ app }) {
    const catalog = await app.$nacelle.products();
    return {
      catalog: getSearchData({ catalog })
    };
  },
  data: () => ({
    catalog: null,
    results: [],
    query: '',
    sort: '',
    prices: '',
    filters: [],
    options: {
      search: {
        threshold: 0.5,
        keys: ['content.title']
      },
      sort: [
        {
          value: 'price-asc',
          label: 'Price: High to Low'
        },
        {
          value: 'price-desc',
          label: 'Price: Low to High'
        }
      ],
      prices: [
        { value: '0, 50', label: '< $50' },
        { value: '50, 100', label: '< $50 - $100' },
        { value: '100, 0', label: '> $100' }
      ]
    }
  }),
  mounted() {
    const query = this.$route.query.q;
    if (query) {
      this.query = query;
      this.updateResults(query);
    }
  },
  methods: {
    updateResults() {
      let items = this.catalog;
      if (this.query) {
        items = searchCatalog({
          items,
          options: this.options.search,
          value: this.query
        });
      }
      if (this.sort) {
        items = sortCatalog({ items, value: this.sort });
      }
      if (this.prices || this.filters.length) {
        items = refineCatalog({
          items,
          prices: this.prices,
          filters: this.filters.length && this.filters
        });
      }
      this.results = items;
    },
    handleSearch() {
      this.$router.push({ path: `/search?q=${this.query}` });
      this.updateResults();
    },
    handleSort(val) {
      this.sort = val;
      this.updateResults();
    },
    handlePrices(val) {
      this.prices = val;
      this.updateResults();
    },
    handleClear() {
      this.filters = [];
    }
  }
};
</script>

<style lang="scss" scoped>
.search {
  width: 100%;
}
.search__list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20em, 1fr));
  gap: 30px 0;
  margin-top: 50px;
}
.search__item {
  padding: 0 20px;
}
</style>
