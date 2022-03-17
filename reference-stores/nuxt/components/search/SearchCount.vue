<template>
  <p class="text-lg leading-6">{{ text }}</p>
</template>

<script>
export default {
  props: {
    results: {
      type: Array,
      required: true
    }
  },
  computed: {
    text() {
      return this.results.length
        ? `${this.results.length} results(s) found`
        : 'No results found...';
    }
  }
};
</script>
