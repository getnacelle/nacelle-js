<template>
  <section v-if="content" class="bg-white">
    <div class="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
      <div class="sm:flex sm:items-baseline sm:justify-between">
        <h2
          v-if="content.fields.heading"
          class="text-2xl font-extrabold tracking-tight text-gray-900"
        >
          {{ content.fields.heading }}
        </h2>
        <nuxt-link
          v-if="content.fields.linkUrl"
          :to="content.fields.linkUrl"
          class="
            hidden
            text-sm
            font-semibold
            text-indigo-600
            hover:text-indigo-500
            sm:block
          "
          >{{ content.fields.linkText
          }}<span aria-hidden="true"> &rarr;</span></nuxt-link
        >
      </div>
      <div
        class="
          mt-6
          grid grid-cols-1
          gap-y-10
          sm:grid-cols-2
          gap-x-6
          lg:grid-cols-4
          xl:grid-cols-4 xl:gap-x-8
        "
      >
        <product-card
          v-for="product in content.fields.products"
          :key="product.nacelleEntryId"
          :product="product"
        />
      </div>
      <div v-if="content.fields.linkUrl" class="mt-6 sm:hidden">
        <nuxt-link
          :to="content.fields.linkUrl"
          class="
            block
            text-sm
            font-semibold
            text-indigo-600
            hover:text-indigo-500
          "
        >
          {{ content.fields.linkText }}
          <span aria-hidden="true"> &rarr;</span></nuxt-link
        >
      </div>
    </div>
  </section>
</template>

<script>
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
  }
};
</script>
