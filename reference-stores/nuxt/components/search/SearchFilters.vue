<template>
  <div v-if="catalog.length">
    <h2 class="sr-only">Filters</h2>
    <form class="hidden lg:block divide-y divide-gray-200 space-y-10">
      <div
        v-for="(filter, index) in availableFilters"
        :key="`${filter.type}-${filter.name}`"
        :class="index > 0 && 'pt-10'"
      >
        <fieldset>
          <legend class="block text-sm font-medium text-gray-900">
            {{ filter.name }}
          </legend>
          <div
            v-for="value in filter.values"
            :key="value"
            class="pt-6 space-y-3"
          >
            <div class="flex items-center">
              <input
                :id="`${filter.type}-${filter.name}-${value}`"
                :value="value"
                type="checkbox"
                class="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                :checked="
                  isFilterActive({
                    type: filter.type,
                    name: filter.name,
                    value
                  })
                "
              />
              <!-- @change="handleProductTypeClick(productType)" -->
              <label
                :for="`${filter.type}-${filter.name}-${value}`"
                class="ml-3 text-sm text-gray-600"
              >
                {{ value }}
              </label>
            </div>
          </div>
        </fieldset>
      </div>
    </form>
  </div>
</template>

<script>
import { getCatalogFilters } from '~/utils/getCatalogFilters';
// import { filterCatalog } from '~/utils/filterCatalog';

export default {
  name: 'SearchFilters',
  props: {
    catalog: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    filteredResults: [],
    availableFilters: [],
    activeFilters: []
  }),
  watch: {
    catalog: {
      immediate: true,
      handler() {
        this.handleCatalog();
      }
    }
  },
  methods: {
    handleCatalog() {
      this.availableFilters = getCatalogFilters({ catalog: this.catalog });
      // see which ones need to be removed
      this.activeFilters = [];
    },
    handleProductTypeClick(productType) {
      // const productTypes = this.activeFilters.productTypes;
      // const activeIndex = productTypes.findIndex(
      //   (activeFilter) => activeFilter === productType
      // );
      // if (activeIndex > -1) {
      //   this.activeFilters.productTypes = [
      //     ...productTypes.slice(0, activeIndex)
      //   ];
      // } else {
      //   this.activeFilters.productTypes = [...productTypes, productType];
      // }
    },
    isFilterActive(filter) {
      return this.activeFilters.find(
        ({ type, name, values }) =>
          type === filter.type &&
          name === filter.name &&
          values.includes(filter.value)
      );
    }
  }
};
</script>
