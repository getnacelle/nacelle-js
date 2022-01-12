<template>
  <div v-if="product" class="product">
    <div v-if="product.content.featuredMedia" class="product__media">
      <nuxt-img
        :src="product.content.featuredMedia.src"
        class="product__image"
      />
    </div>
    <div class="product__main">
      <h1 v-if="product.content.title" class="product__title">
        {{ product.content.title }}
      </h1>
      <div class="product__prices">
        <div v-if="selectedVariant.compareAtPrice" class="product__compare">
          ${{ selectedVariant.compareAtPrice }}
        </div>
        <div class="product__price">${{ selectedVariant.price }}</div>
      </div>
      <div
        v-for="(option, oIndex) in options"
        :key="oIndex"
        class="product__option"
      >
        <label class="product__label">{{ option.name }}</label>
        <select class="product__select">
          <option
            v-for="(value, vIndex) in option.values"
            :key="vIndex"
            :value="value"
          >
            {{ value }}
          </option>
        </select>
      </div>
      <!-- eslint-disable vue/no-v-html -->
      <div
        v-if="product.content.description"
        class="product__description"
        v-html="product.content.description"
      />
      <div class="product__quantity">
        <label class="product__label">Quantity:</label>
        <input
          v-model="quantity"
          type="number"
          min="1"
          class="product__input"
        />
      </div>
      <button
        class="product__button"
        :disabled="!selectedVariant.availableForSale"
        @click="handleAddItem"
      >
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<script>
import { Storefront } from '@nacelle/storefront-sdk';

export default {
  name: 'ProductPage',
  async asyncData({ $config, params }) {
    const client = new Storefront($config.nacelle);
    const products = await client.products({ handles: [params.handle] });
    return {
      product: products[0]
    };
  },
  data: () => ({
    product: null,
    selectedVariant: null,
    quantity: 1
  }),
  computed: {
    options() {
      const optionsExist = this.product?.content?.options?.find((option) => {
        return option.values.length > 1;
      });
      return optionsExist ? this.product?.content?.options : null;
    },
    buttonText() {
      return this.selectedVariant?.availableForSale
        ? 'Add To cart'
        : 'Sold Out';
    }
  },
  created() {
    this.selectedVariant = this.product?.variants[0];
  },
  methods: {
    handleAddItem() {
      console.log('add the item');
    }
  }
};
</script>

<style lang="scss" scoped>
.product {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
  @media only screen and (min-width: 768px) {
    flex-direction: row;
  }
}
.product__media,
.product__main {
  width: 100%;
  overflow: hidden;
  @media only screen and (min-width: 768px) {
    width: 50%;
  }
}
.product__image {
  width: 100%;
}
.product__main {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}
.product__prices {
  display: flex;
  gap: 10px;
}
.product__compare {
  text-decoration: line-through;
}
</style>
