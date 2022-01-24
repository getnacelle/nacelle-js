<template>
  <div v-if="product" class="product-card">
    <nuxt-link
      :to="`/products/${product.content.handle}`"
      class="product-card__media"
    >
      <nuxt-img
        v-if="product.content.featuredMedia"
        :src="product.content.featuredMedia.src"
        :alt="product.content.featuredMedia.altText"
        class="product-card__image"
      />
      <div v-else>No Image</div>
    </nuxt-link>
    <div class="product-card__main">
      <h2 v-if="product.content.title" class="product-card__title">
        {{ product.content.title }}
      </h2>
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
        v-for="option in options"
        :key="option.name"
        class="product-card__option"
      >
        <label :for="`select-${uniqueId}`" class="product-card__label">{{
          option.name
        }}</label>
        <select
          :id="`select-${uniqueId}`"
          class="product-card__select"
          @change="($event) => handleOptionChange($event, option)"
        >
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
import { v4 as uuid } from 'uuid';
import { getSelectedVariant } from '~/utils/getSelectedVariant';
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
    selectedVariant: null,
    selectedOptions: null,
    uniqueId: uuid()
  }),
  computed: {
    options() {
      const optionsExist = this.product?.content?.options?.find((option) => {
        return option.values.length > 1;
      });
      return optionsExist ? this.product?.content?.options : null;
    },
    buttonText() {
      return this.selectedVariant
        ? this.selectedVariant.availableForSale
          ? 'Add To cart'
          : 'Sold Out'
        : 'Select Option';
    }
  },
  created() {
    this.selectedVariant = { ...this.product.variants[0] };
    this.selectedOptions = [...this.selectedVariant.content.selectedOptions];
  },
  methods: {
    ...mapMutations('cart', ['addItem']),
    handleOptionChange($event, option) {
      const newOption = { name: option.name, value: $event.target.value };
      const optionIndex = this.selectedOptions.findIndex((selectedOption) => {
        return selectedOption.name === newOption.name;
      });
      if (optionIndex > -1)
        this.selectedOptions.splice(optionIndex, 1, newOption);
      else this.selectedOptions.push(newOption);
      const variant = getSelectedVariant({
        product: this.product,
        options: this.selectedOptions
      });
      this.selectedVariant = variant ? { ...variant } : null;
    },
    handleAddItem() {
      const variant = getCartVariant({
        product: this.product,
        variant: this.selectedVariant
      });
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
