<template>
  <div v-if="product" class="bg-white">
    <div
      class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8"
    >
      <div class="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
        <product-gallery :product="product" />
        <product-form :product="product" :content="content" />
      </div>
    </div>
  </div>
</template>

<script>
import ProductGallery from './ProductGallery.vue';
import ProductForm from './ProductForm.vue';

export default {
  name: 'ProductDetails',
  components: {
    ProductGallery,
    ProductForm
  },
  props: {
    product: {
      type: Object,
      required: true
    },
    content: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>
