<template>
  <div v-if="catalog" class="search">
    <input v-model="query" class="search__input" />
    <button class="search__submit" @click="handleSearch">Search</button>
    <p class="search__count">{{ results.length }} result(s)</p>
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
    options: {
      threshold: 0.5,
      keys: ['content.title']
    }
  }),
  mounted() {
    const query = this.$route.query.q;
    if (query) {
      this.query = query;
      this.searchCatalog(query);
    }
  },
  methods: {
    searchCatalog(query) {
      this.results = new Fuse(this.catalog, this.options)
        .search(query)
        .filter((result) => typeof result.item !== 'undefined')
        .map((result) => result.item);
    },
    refineResults() {},
    handleSearch() {
      this.$router.push({ path: `/search?q=${this.query}` });
      this.searchCatalog(this.query);
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
}
.search__item {
  padding: 0 20px;
}
</style>
