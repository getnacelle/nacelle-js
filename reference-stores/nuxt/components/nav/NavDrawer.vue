<template>
  <transition name="slide">
    <div
      v-show="navVisible"
      class="
        relative
        max-w-xs
        w-full
        bg-white
        shadow-xl
        pb-12
        flex flex-col
        overflow-y-auto
        transition
        ease-in-out
        duration-300
        transform
      "
    >
      <div class="px-4 pt-5 pb-2 flex">
        <button
          type="button"
          class="
            -m-2
            p-2
            rounded-md
            inline-flex
            items-center
            justify-center
            text-gray-400
          "
          @click="setNavVisibility(false)"
        >
          <span class="sr-only">Close menu</span>
          <span class="h-6 w-6 flex" v-html="closeIcon" />
        </button>
      </div>
      <search-input :content="searchContent" />
      <nav-tabs :content="primaryContent" />
      <nav-menu :content="primaryContent" />
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

import NavTabs from './NavTabs.vue';
import NavMenu from './NavMenu.vue';
import SearchInput from '~/components/search/SearchInput.vue';
import closeIcon from '~/assets/svgs/close';

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
  data: () => ({ closeIcon }),
  computed: {
    ...mapGetters('ui', ['navVisible']),
    primaryContent() {
      return {
        navigation: this.content?.navigation
      };
    },
    searchContent() {
      return {
        placeholder: this.content?.searchPlaceholder,
        heading: this.content?.searchHeading,
        all: this.content?.searchAll,
        empty: this.content?.searchEmpty
      };
    }
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
