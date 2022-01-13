<template>
  <div v-if="catalog" class="search">
    <input v-model="query" class="search__input" />
    <button class="search__submit">Search</button>
    <p class="search__count">{{ catalog.length }} result(s)</p>
  </div>
</template>

<script>
import { Storefront } from '@nacelle/storefront-sdk';

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
    query: ''
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
      // return catalog
    },
    handleSearch() {
      this.catalog = this.searchCatalog(this.query);
      this.$router.push({ path: `/search?q=${this.query}` });
      this.searchCatalog(this.query);
    }
  }
};
</script>
