<template>
  <div v-if="product" class="product-card">
    <div v-if="product.content.featuredMedia" class="product-card__media">
      <nuxt-img
        :src="product.content.featuredMedia.src"
        class="product-card__image"
      />
    </div>
    <div class="product-card__main">
      <h3 v-if="product.content.title" class="product-card__title">
        {{ product.content.title }}
      </h3>
      <div class="product-card__prices">
        <div
          v-if="selectedVariant.compareAtPrice"
          class="product-card__compare"
        >
          ${{ selectedVariant.compareAtPrice }}
        </div>
        <div class="product-card__price">${{ selectedVariant.price }}</div>
      </div>
      <div
        v-for="(option, oIndex) in options"
        :key="oIndex"
        class="product-card__option"
      >
        <label class="product-card__label">{{ option.name }}</label>
        <select class="product-card__select">
          <option
            v-for="(value, vIndex) in option.values"
            :key="vIndex"
            :value="value"
          >
            {{ value }}
          </option>
        </select>
      </div>
      <button
        class="product-card__button"
        :disabled="!selectedVariant.availableForSale"
        @click="handleAddItem"
      >
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { getCartVariant } from '~/utils/getCartVariant';

export default {
  name: 'ProductCart',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    selectedVariant: null
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
    ...mapMutations('cart', ['addItem']),
    handleAddItem() {
      const variant = getCartVariant(this.selectedVariant);
      if (variant) {
        this.addItem({
          variant,
          quantity: 1
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.product-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
}
.product-card__media,
.product-card__main {
  width: 100%;
  overflow: hidden;
}
.product-card__image {
  width: 100%;
}
.product-card__main {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}
.product-card__title {
  margin: 0;
}
.product-card__prices {
  display: flex;
  gap: 10px;
}
.product-card__compare {
  text-decoration: line-through;
}
</style>
