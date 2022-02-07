<template>
  <section v-if="content" class="bg-white">
    <div class="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
      <div class="sm:flex sm:items-baseline sm:justify-between">
        <h2 class="text-2xl font-extrabold tracking-tight text-gray-900">
          {{ content.heading }}
        </h2>
        <nuxt-link
          v-if="content.link"
          :to="content.link.url"
          class="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block"
          >{{ content.link.text
          }}<span aria-hidden="true"> &rarr;</span></nuxt-link
        >
      </div>

      <div
        class="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-4 xl:grid-cols-4 xl:gap-x-8"
      >
        <product-card
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>

      <div class="mt-6 sm:hidden">
        <nuxt-link
          v-if="content.link"
          :to="content.link.url"
          class="block text-sm font-semibold text-indigo-600 hover:text-indigo-500"
        >
          {{ content.link.text }}
          <span aria-hidden="true"> &rarr;</span></nuxt-link
        >
      </div>
    </div>
  </section>
</template>

<script>
import { PRODUCTS_QUERY } from '~/queries/product';
import ProductCard from '~/components/product/ProductCard.vue';

export default {
  name: 'FeaturedProducts',
  components: {
    ProductCard
  },
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    products: []
  }),
  async fetch() {
    const { products } = await this.$nacelle.query({
      query: PRODUCTS_QUERY,
      variables: { handles: this.content.products }
    });
    this.products = products;
  }
};
</script>
