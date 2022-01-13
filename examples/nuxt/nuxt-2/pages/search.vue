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
import { Storefront } from '@nacelle/storefront-sdk';
import Fuse from 'fuse.js';
import { getSearchData } from '~/utils/getSearchData';

export default {
  name: 'SearchPage',
  async asyncData({ $config }) {
    const client = new Storefront($config.nacelle);
    const catalog = await client.products();
    return {
      catalog
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
        { range: [0, 50], label: '< $50' },
        { range: [50, 100], label: '< $50 - $100' },
        { range: [100, 0], label: '> $100' }
      ]
    }
  }),
  computed() {},
  mounted() {
    const query = this.$route.query.q;
    if (query) {
      this.query = query;
      this.searchCatalog(query);
    }
  },
  methods: {
    searchCatalog(query) {
      const results = new Fuse(this.catalog, this.options.search)
        .search(query)
        .filter((result) => typeof result.item !== 'undefined')
        .map((result) => result.item);
      this.results = getSearchData(results);
    },
    sortResults() {
      this.results = this.results.sort((a, b) => {
        const priceA = a.priceRange.min;
        const priceB = b.priceRange.min;
        if (priceA < priceB) return this.sort === 'price-asc' ? -1 : 1;
        if (priceA > priceB) return this.sort === 'price-asc' ? 1 : -1;
        return 0;
      });
    },
    handleSearch() {
      this.$router.push({ path: `/search?q=${this.query}` });
      this.searchCatalog(this.query);
    },
    handleClear() {
      this.filters = [];
    },
    handleSort(val) {
      this.sort = val;
      this.sortResults(this.sort);
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
