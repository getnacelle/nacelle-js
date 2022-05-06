<template>
  <div
    v-if="content"
    class="flex items-center justify-center px-2 lg:ml-6 lg:justify-end"
  >
    <div class="max-w-lg w-full lg:max-w-xs">
      <label for="search" class="sr-only">Search</label>
      <div class="relative">
        <div
          class="
            absolute
            inset-y-0
            left-0
            pl-3
            flex
            items-center
            pointer-events-none
          "
        >
          <span class="h-5 w-5 text-gray-400" v-html="searchIcon" />
        </div>
        <input
          :id="`search-header-${uniqueId}`"
          v-model="query"
          name="search-header"
          class="
            block
            w-full
            pl-10
            pr-3
            py-2
            border border-gray-300
            rounded-md
            leading-5
            bg-white
            placeholder-gray-500
            focus:outline-none
            focus:placeholder-gray-400
            focus:ring-1
            focus:ring-indigo-500
            focus:border-indigo-500
            sm:text-sm
          "
          :placeholder="content.placeholder"
          type="search"
          @keyup="handleKeyup"
          @keyup.enter="handleEnter"
          @focus="handleFocus(true)"
          @click.stop
        />
        <search-autocomplete
          :show="isFocussed && query.trim() !== ''"
          :results="results"
          :query="query"
          :content="content"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { v4 as uuid } from 'uuid';
import SearchAutocomplete from '../search/SearchAutocomplete.vue';
import { searchProducts } from '~/utils/searchProducts';
import searchIcon from '~/assets/svgs/search';

export default {
  name: 'HeaderSearch',
  components: {
    SearchAutocomplete
  },
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    query: '',
    results: [],
    isFocussed: false,
    searchIcon,
    uniqueId: uuid()
  }),
  computed: {
    ...mapGetters('site', ['siteProducts'])
  },
  created() {
    this.results = [...this.siteProducts];
  },
  mounted() {
    document.body.addEventListener('click', this.handleClick);
  },
  beforeDestroy() {
    document.body.removeEventListener('click', this.handleClick);
  },
  methods: {
    handleClick() {
      this.isFocussed = false;
    },
    handleFocus(value) {
      this.isFocussed = value;
    },
    handleKeyup() {
      this.results = searchProducts({
        products: [...this.siteProducts],
        query: this.query
      });
    },
    handleEnter(event) {
      this.isFocussed = false;
      this.$router.push({ path: `/search?q=${this.query}` });
      event.target.blur();
    }
  }
};
</script>
