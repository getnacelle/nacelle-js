<template>
  <div>
    <div>
      <button @click="clearFilters">Clear Filters</button>
      <h3>Sort By</h3>
      <select @change="setSortBy($event.target.value)">
        <option>Sort By</option>
        <option value="price-asc">Low to High</option>
        <option value="price-desc">High to Low</option>
      </select>
      <h3>Price</h3>
      <select @change="selectPriceHandler($event.target.value)">
        <option>All</option>
        <option
          v-for="priceRange in priceRanges"
          :key="priceRange.label"
          :value="priceRange.label"
        >
          {{ priceRange.label }}
        </option>
      </select>
      <div v-for="filter in filters" :key="filter.property.field">
        <h3>{{ filter.property.label }}</h3>
        <button
          v-for="value in filter.values"
          :key="value"
          :class="[
            activeFilters.some((activeFilter) =>
              activeFilter.values.includes(value)
            ) && 'button--state-active'
          ]"
          @click="
            toggleActiveFilter({ property: filter.property.field, value })
          "
        >
          {{ value }}
        </button>
      </div>
    </div>
    <h3>Products</h3>
    <div v-if="filteredData" class="refinement-data">
      <product-provider
        v-for="product in filteredData"
        :key="product.handle"
        :product="product"
        class="refinement-data__item"
      >
        <product />
      </product-provider>
    </div>
  </div>
</template>

<script>
import { useRefinementProvider, ProductProvider } from '@nacelle/vue';
import Product from '~/components/Product';

export default {
  components: { ProductProvider, Product },
  setup() {
    const {
      filters,
      activeFilters,
      filteredData,
      clearFilters,
      toggleActiveFilter,
      setActivePriceRange,
      setSortBy
    } = useRefinementProvider();
    const priceRanges = [
      { range: [0, 50], label: '< $50' },
      { range: [50, 100], label: '$50 - 100' },
      { range: [100, 0], label: '> $100' }
    ];
    const selectPriceHandler = (label) => {
      const priceRange = priceRanges.find(
        (priceRange) => label === priceRange.label
      );
      setActivePriceRange(priceRange);
    };
    return {
      filters,
      activeFilters,
      filteredData,
      clearFilters,
      toggleActiveFilter,
      setSortBy,
      selectPriceHandler,
      priceRanges
    };
  }
};
</script>

<style lang="scss" scoped>
.button--state-active {
  background: #fff;
}
.refinement-data {
  display: flex;
  flex-wrap: wrap;
  gap: 30px 0;
}
.refinement-data__item {
  width: 25%;
  padding: 0 20px;
  &::v-deep {
    .product {
      flex-direction: column;
    }
    .product__image,
    .product__main {
      width: 100%;
    }
    .product__description {
      display: none;
    }
  }
}
</style>
