<template>
  <div class="pt-12 lg:mt-0 lg:col-span-2 xl:col-span-3">
    <div
      v-if="results.length"
      class="
        grid grid-cols-2
        gap-x-4 gap-y-8
        sm:grid-cols-3 sm:gap-x-6
        lg:grid-cols-4
        xl:gap-x-8
      "
    >
      <product-card
        v-for="result in results"
        :key="result.nacelleEntryId"
        :product="result"
      />
    </div>
  </div>
</template>

<script>
import ProductCard from '~/components/product/ProductCard.vue';

export default {
  name: 'SearchResults',
  components: {
    ProductCard
  },
  props: {
    results: {
      type: Array,
      required: true
    }
  }
};
</script>
