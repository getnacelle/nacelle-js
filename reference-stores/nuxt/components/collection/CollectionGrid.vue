<template>
  <div v-if="collection" class="bg-white">
    <div class="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
      <div class="border-b border-gray-200 pb-10 flex">
        <h1 class="text-4xl font-extrabold tracking-tight text-gray-900 flex-1">
          {{ collection.content.title }}
        </h1>
      </div>
      <div v-if="activeProducts.length > 0" class="pt-12 text-center">
        <div
          class="
            grid grid-cols-2
            gap-x-4 gap-y-8
            sm:grid-cols-3 sm:gap-x-6
            lg:grid-cols-4
            xl:gap-x-8
            text-left
          "
        >
          <product-card
            v-for="product in activeProducts"
            :key="product.nacelleEntryId"
            :product="product"
          />
        </div>
        <button
          v-if="canFetch"
          type="button"
          :disabled="isFetching"
          class="
            inline-flex
            px-4
            py-2
            mt-8
            border border-transparent
            text-base
            font-medium
            rounded-md
            shadow-sm
            text-white
            bg-indigo-600
            hover:bg-indigo-700 hover:cursor-pointer
          "
          @click="handleFetch"
        >
          Load More
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { COLLECTION_PRODUCTS_QUERY } from '~/queries/collection';
import ProductCard from '~/components/product/ProductCard.vue';

export default {
  name: 'CollectionGrid',
  components: {
    ProductCard
  },
  props: {
    collection: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    products: null,
    after: null,
    canFetch: false,
    isFetching: false
  }),
  computed: {
    activeProducts() {
      return this.canFetch
        ? this.products?.slice(0, this.products.length - 1)
        : this.products;
    }
  },
  created() {
    const products =
      this.collection?.products?.edges.map((product) => product.node) || [];
    const pageInfo = this.collection?.products?.pageInfo;
    this.products = [...products];
    this.canFetch = pageInfo?.hasNextPage;
    this.after = pageInfo?.endCursor;
  },
  methods: {
    async handleFetch() {
      this.isFetching = true;
      const { collections } = await this.$nacelle.query({
        query: COLLECTION_PRODUCTS_QUERY,
        variables: { handle: this.$route.params.handle, after: this.after }
      });
      const products = collections.edges[0].node?.products?.edges.map(
        (product) => product.node
      );
      const pageInfo = collections.edges[0].node?.products?.pageInfo;
      if (products) {
        this.products = [...this.products, ...products];
        this.canFetch = pageInfo?.hasNextPage;
        this.after = pageInfo?.endCursor;
      }
      this.isFetching = false;
    }
  }
};
</script>
