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
          v-for="price in settings.prices"
          :key="price.value"
          :value="price.value"
        >
          {{ price.label }}
        </option>
      </select>
      <div v-if="settings.tags.size" class="search__refine-filters">
        <h3 class="search__refine-heading">Tags</h3>
        <div class="search__refine-buttons">
          <button
            v-for="tag in settings.tags"
            :key="tag"
            :class="[
              'search__refine-button',
              tags.includes(tag) && 'search__refine-button--active'
            ]"
            @click="handleTags(tag)"
          >
            {{ tag }}
          </button>
        </div>
      </div>
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
    tags: [],
    settings: {
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
      ],
      tags: []
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
          settings: this.settings.search,
          value: this.query
        });
        this.updateTags(items);
      }
      if (this.sort) {
        items = sortCatalog({ items, value: this.sort });
      }
      if (this.prices || this.tags.length) {
        items = refineCatalog({
          items,
          prices: this.prices,
          tags: this.tags.length && this.tags
        });
      }
      this.results = items;
    },
    updateTags(catalog) {
      const tags = new Set(
        catalog.flatMap((item) => item.tags.filter((tag) => tag))
      );
      this.tags = this.tags.filter((tag) => {
        return tags.has(tag);
      });
      this.settings.tags = tags;
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
    handleTags(val) {
      const index = this.tags.findIndex((tag) => tag === val);
      if (index > -1) this.tags.splice(index, 1);
      else this.tags.push(val);
      this.updateResults();
    },
    handleClear() {
      this.tags = [];
      this.updateResults();
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
.search__refine-heading {
  width: 100%;
}
.search__refine-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.search__refine-button--active {
  background-color: white;
}
.search__item {
  padding: 0 20px;
}
</style>
