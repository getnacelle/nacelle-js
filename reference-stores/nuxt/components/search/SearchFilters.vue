<template>
  <div>
    <h2 class="sr-only">Filters</h2>
    <search-filters-drawer
      :show="showFilterDrawer"
      :available-filters="availableFilters"
      :active-filters="activeFilters"
    />
    <button
      type="button"
      class="inline-flex items-center lg:hidden"
      @click="showFilterDrawer = true"
    >
      <span class="text-sm font-medium text-gray-700">Filters</span>
      <svg
        class="flex-shrink-0 ml-1 h-5 w-5 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
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
                class="
                  h-4
                  w-4
                  border-gray-300
                  rounded
                  text-indigo-600
                  focus:ring-indigo-500
                "
                :checked="activeFilter({ ...filter, value })"
                @click="handleClick({ ...filter, value })"
              />
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
      <button
        v-if="activeFilters.length"
        class="
          inline-flex
          items-center
          px-3
          py-2
          border border-gray-300
          shadow-sm
          text-sm
          leading-4
          font-medium
          rounded-md
          text-gray-700
          bg-white
          hover:bg-gray-50
          focus:outline-none
          focus:ring-2
          focus:ring-offset-2
          focus:ring-indigo-500
          mt-10
        "
        @click="handleClear"
      >
        Clear Filters
      </button>
    </form>
  </div>
</template>

<script>
import SearchFiltersDrawer from './SearchFiltersDrawer.vue';

export default {
  name: 'SearchFilters',
  components: { SearchFiltersDrawer },
  props: {
    availableFilters: {
      type: Array,
      required: true
    },
    activeFilters: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    showFilterDrawer: false
  }),
  methods: {
    activeFilter(filter) {
      return this.activeFilters.find(
        ({ type, name, value }) =>
          type === filter.type && name === filter.name && value === filter.value
      );
    },
    handleClick(filter) {
      const filters = [...this.activeFilters];
      const { values, ...rest } = filter;
      const activeIndex = filters.findIndex(
        ({ type, name, value }) =>
          type === rest.type && name === rest.name && rest.value === value
      );
      if (activeIndex < 0) filters.push(rest);
      else filters.splice(activeIndex, 1);
      this.$emit('change', filters);
    },
    handleClear() {
      this.$emit('change', []);
    }
  }
};
</script>
