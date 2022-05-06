<template>
  <div :class="`relative flex ${show ? 'z-40' : '-z-10'}`">
    <div
      class="
        fixed
        inset-0
        bg-gray-500 bg-opacity-75
        opacity-0
        transition-opacity
        ease-in-out
        duration-500
      "
      :class="show && 'opacity-100'"
      aria-hidden="true"
      @click="handleClose"
    ></div>
    <div
      class="
        z-40
        fixed
        inset-y-0
        right-0
        pl-10
        w-80
        min-w-max
        flex
        transition-transform
        translate-x-full
        ease-in-out
        duration-500
      "
      :class="show && 'translate-x-0'"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="
          ml-auto
          relative
          max-w-xs
          w-full
          h-full
          bg-white
          shadow-xl
          py-4
          pb-6
          flex flex-col
          overflow-y-auto
        "
      >
        <div class="px-4 flex items-center justify-between">
          <h2 class="text-lg font-medium text-gray-900">Filters</h2>
          <button
            type="button"
            class="
              -mr-2
              w-10
              h-10
              p-2
              flex
              items-center
              justify-center
              text-gray-400
              hover:text-gray-500
            "
            @click="handleClose"
          >
            <span class="sr-only">Close menu</span>
            <span class="h-6 w-6" v-html="closeIcon" />
          </button>
        </div>
        <form class="mt-4">
          <div
            v-for="(filter, index) in availableFilters"
            :key="`${filter.type}-${filter.name}`"
            class="border-t border-gray-200 pt-4 pb-4"
          >
            <fieldset>
              <legend class="w-full px-2"></legend>
              <button
                type="button"
                class="
                  w-full
                  p-2
                  flex
                  items-center
                  justify-between
                  text-gray-400
                  hover:text-gray-500
                "
                :aria-controls="`${filter.type}-${filter.name}`"
                aria-expanded="false"
                @click="handleClick(index)"
              >
                <span class="text-sm font-medium text-gray-900">
                  {{ filter.name }}
                </span>
                <span class="ml-6 h-7 flex items-center">
                  <span
                    class="rotate-0 h-5 w-5 transform"
                    v-html="chevronIcon"
                  />
                </span>
              </button>
              <div :class="!expandedFilters.includes(index) && 'hidden'">
                <div
                  v-for="value in filter.values"
                  :key="value"
                  class="pt-2 px-2 space-y-3"
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
                        cursor-pointer
                      "
                      :checked="$parent.activeFilter({ ...filter, value })"
                      @click="$parent.handleClick({ ...filter, value })"
                    />
                    <label
                      :for="`${filter.type}-${filter.name}-${value}`"
                      class="grow pl-3 text-sm text-gray-600 cursor-pointer"
                    >
                      {{ value }}
                    </label>
                  </div>
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
              mx-3
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
            @click="$parent.handleClear"
          >
            Clear Filters
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import closeIcon from '~/assets/svgs/close';
import chevronIcon from '~/assets/svgs/chevron';

export default {
  name: 'SearchFiltersDrawer',
  props: {
    show: {
      type: Boolean,
      required: true
    },
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
    closeIcon,
    chevronIcon,
    expandedFilters: []
  }),
  methods: {
    handleClick(index) {
      const itemIndex = this.expandedFilters.findIndex((expandedIndex) => {
        return index === expandedIndex;
      });
      if (itemIndex > -1) this.expandedFilters.splice(itemIndex, 1);
      else this.expandedFilters.push(index);
    },
    handleClose() {
      this.$parent.showFilterDrawer = false;
      this.expandedFilters = [];
    }
  }
};
</script>
