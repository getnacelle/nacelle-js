<template>
  <transition name="fade-up">
    <div
      v-if="show"
      class="
        w-full
        absolute
        top-11
        lg:right-0 lg:w-96 lg:top-10
        z-50
        bg-white
        overflow-hidden
        shadow
        rounded-lg
      "
    >
      <div class="px-2 py-5 lg:px-4">
        <h2
          v-if="content.heading"
          class="
            text-center text-2xl
            font-extrabold
            tracking-tight
            text-gray-900
          "
        >
          {{ content.heading }}
        </h2>
        <div v-if="query && results.length">
          <div v-for="item in results.slice(0, 3)" :key="item.nacelleEntryId">
            <search-autocomplete-item :item="item" />
          </div>
          <button
            v-if="content.all"
            type="button"
            class="
              w-full
              text-center
              inline-flex
              justify-center
              items-center
              px-4
              py-2
              border border-gray-300
              shadow-sm
              text-base
              font-medium
              rounded-md
              text-gray-700
              bg-white
              hover:bg-gray-50
              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-indigo-500
            "
            @click="handleSearchAll"
          >
            {{ content.all }}
          </button>
        </div>
        <div v-else class="text-center p-5">
          <p v-if="content.empty">{{ content.empty }}</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import SearchAutocompleteItem from './SearchAutocompleteItem.vue';

export default {
  name: 'SearchAutocomplete',
  components: {
    SearchAutocompleteItem
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    query: {
      type: String,
      default: ''
    },
    results: {
      type: Array,
      required: true
    },
    content: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleSearchAll() {
      this.$router.push({ path: `/search?q=${this.query}` });
    }
  }
};
</script>

<style lang="scss" scoped>
.fade-up-enter-active {
  transition: opacity 0.3s, transform 0.3s;
}
.fade-up-enter,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
