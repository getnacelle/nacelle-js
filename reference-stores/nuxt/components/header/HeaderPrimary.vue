<template>
  <div
    v-if="content"
    class="hidden lg:ml-8 lg:block lg:self-stretch"
    @click.stop
  >
    <div class="h-full flex space-x-8">
      <div
        v-for="(navigationItem, index) in content.navigation"
        :key="index"
        class="flex"
      >
        <div class="relative flex">
          <button
            v-if="navigationItem.type === 'partNavigationMega'"
            type="button"
            class="
              border-transparent
              text-gray-700
              hover:text-gray-800
              relative
              z-10
              flex
              items-center
              transition-colors
              ease-out
              duration-200
              text-sm
              font-medium
              border-b-2
              -mb-px
              pt-px
            "
            aria-expanded="false"
            @click="setActiveIndex(index)"
          >
            {{ navigationItem.fields.text }}
          </button>
          <nuxt-link
            v-else-if="navigationItem.type === 'partNavigationLink'"
            :to="navigationItem.fields.url"
            class="
              border-transparent
              text-gray-700
              hover:text-gray-800
              relative
              z-10
              flex
              items-center
              transition-colors
              ease-out
              duration-200
              text-sm
              font-medium
              border-b-2
              -mb-px
              pt-px
            "
          >
            {{ navigationItem.fields.text }}
          </nuxt-link>
        </div>
        <header-mega
          v-if="navigationItem.type === 'partNavigationMega'"
          :content="navigationItem"
          :active="activeIndex === index"
        />
      </div>
    </div>
  </div>
</template>

<script>
import HeaderMega from './HeaderMega.vue';

export default {
  name: 'HeaderPrimary',
  components: { HeaderMega },
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    activeIndex: null
  }),
  watch: {
    $route: {
      handler() {
        this.activeIndex = null;
      }
    }
  },
  mounted() {
    document.body.addEventListener('click', this.handleBodyClick);
  },
  beforeDestroy() {
    document.body.removeEventListener('click', this.handleBodyClick);
  },
  methods: {
    setActiveIndex(value) {
      if (this.activeIndex === value) this.activeIndex = null;
      else this.activeIndex = value;
    },
    handleBodyClick() {
      this.setActiveIndex(null);
    }
  }
};
</script>
