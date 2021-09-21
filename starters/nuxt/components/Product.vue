<template>
  <div v-if="product && Object.keys(product).length" class="product">
    <nuxt-img :src="product.featuredMedia.src" class="product__image" />
    <div class="product__main">
      <h1 class="product__title">{{ product.title }}</h1>
      <div v-if="variant">
        {{ variant.id }}
      </div>
      <div
        v-for="(option, index) in product.options"
        :key="index"
        class="product__option"
      >
        <label class="product__label">{{ option.name }}</label>
        <select class="product__select">
          <option
            v-for="(value, index) in option.values"
            :key="index"
            :value="value"
          >
            {{ value }}
          </option>
        </select>
      </div>
      <!-- eslint-disable vue/no-v-html -->
      <div class="product__decription" v-html="product.description" />
      <!-- eslint-disable vue/no-v-html -->
      <input
        v-model="quantity"
        type="number"
        min="1"
        class="product__quantity"
      />
      <button class="product__button">
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<script>
import { computed, ref } from '@nuxtjs/composition-api';
import { useProductProvider } from '@nacelle/vue';

export default {
  setup() {
    const { product, setSelectedVariant } = useProductProvider();
    const quantity = ref(1);

    const defaultVariant = product?.value?.variants[0];
    if (defaultVariant) {
      setSelectedVariant({ variant: defaultVariant });
    }

    const variant = computed(() => {
      return product.selectedVariant || defaultVariant;
    });
    const buttonText = computed(() => 'Add To Cart');

    return { product, variant, quantity, buttonText };
  }
};
</script>

<style lang="scss" scoped>
.product {
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 40px;
}
.product__image,
.product__main {
  width: 50%;
  overflow: hidden;
}
.product__main {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}
</style>
