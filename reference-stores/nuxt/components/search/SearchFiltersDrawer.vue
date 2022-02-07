<template>
  <div class="flex">
    <transition name="fade">
      <div
        v-show="show"
        class="
          fixed
          inset-0
          z-40
          bg-gray-500 bg-opacity-75
          transition-opacity
          ease-in-out
          duration-500
        "
        aria-hidden="true"
        @click="handleClose"
      ></div>
    </transition>
    <transition name="slide">
      <div
        v-show="show"
        class="
          z-40
          fixed
          inset-y-0
          right-0
          pl-10
          w-80
          min-w-max
          flex
          transform
          transition
          ease-in-out
          duration-500
        "
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
              <svg
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <form class="mt-4">
            <div
              v-for="filter in availableFilters"
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
                >
                  <span class="text-sm font-medium text-gray-900">
                    {{ filter.name }}
                  </span>
                  <span class="ml-6 h-7 flex items-center">
                    <svg
                      class="rotate-0 h-5 w-5 transform"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                </button>
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
    </transition>
  </div>
</template>

<script>
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
  methods: {
    handleClose() {
      this.$parent.showFilterDrawer = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transform: translateX(0%);
}
.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
}
.fade-enter-active,
.fade-leave-active {
  opacity: 1;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
