<template>
  <div v-if="product" class="product">
    <nuxt-img :src="product.featuredMedia.src" class="product__image" />
    <div class="product__main">
      <h1 class="product__title">{{ product.title }}</h1>
      <!-- eslint-disable vue/no-v-html -->
      <p class="product__decription" v-html="product.description" />
      <!-- eslint-disable vue/no-v-html -->
      {{ variant }}
      <div class="product__price">{{ product.price }}</div>
    </div>
  </div>
</template>

<script>
import { useProductProvider } from '@nacelle/vue';

export default {
  setup() {
    const { product } = useProductProvider();
    return { product };
  }
};
</script>

<style lang="scss" scoped>
.product {
  display: flex;
  align-items: flex-start;
  gap: 40px;
}
.product__image,
.product__main {
  width: 50%;
}
</style>
