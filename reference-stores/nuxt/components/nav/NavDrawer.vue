<template>
  <transition name="slide">
    <div
      v-show="navVisible"
      class="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto transition ease-in-out duration-300 transform"
    >
      <div class="px-4 pt-5 pb-2 flex">
        <button
          type="button"
          class="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
          @click="setNavVisibility(false)"
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
      <search-input />
      <nav-tabs :content="content" />
      <nav-menu :content="content" />
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

import NavTabs from './NavTabs.vue';
import NavMenu from './NavMenu.vue';
import SearchInput from '~/components/search/SearchInput.vue';

export default {
  name: 'NavDrawer',
  components: {
    NavTabs,
    NavMenu,
    SearchInput
  },
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters('ui', ['navVisible'])
  },
  methods: {
    ...mapMutations('ui', ['setNavVisibility'])
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
  transform: translateX(-100%);
}
</style>
