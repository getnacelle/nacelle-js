<template>
  <div v-if="product" class="product">
    <nuxt-link :to="`/products/${product.handle}`" class="product__media">
      <nuxt-img :src="product.featuredMedia.src" class="product__image" />
    </nuxt-link>
    <div class="product__main">
      <h1 class="product__title">{{ product.title }}</h1>
      <div class="product__prices">
        <div
          v-if="product.selectedVariant.compareAtPrice"
          class="product__compare"
        >
          ${{ product.selectedVariant.compareAtPrice }}
        </div>
        <div class="product__price">${{ product.selectedVariant.price }}</div>
      </div>
      <div
        v-for="(option, oIndex) in options"
        :key="oIndex"
        class="product__option"
      >
        <label class="product__label">{{ option.name }}</label>
        <select
          class="product__select"
          @change="($event) => handleOptionChange($event, option)"
        >
          <option
            v-for="(value, vIndex) in option.values"
            :key="vIndex"
            :value="value"
            :selected="value === product.selectedOptions[oIndex].value"
          >
            {{ value }}
          </option>
        </select>
      </div>
      <!-- eslint-disable vue/no-v-html -->
      <div class="product__description" v-html="product.description" />
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
        :disabled="!product.selectedVariant.availableForSale"
        @click="handleAddItem"
      >
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<script>
import { computed, ref } from '@nuxtjs/composition-api';
import { useCartProvider, useProductProvider } from '@nacelle/vue';

export default {
  setup() {
    const { addItem } = useCartProvider();
    const { product, setSelectedOptions, setSelectedVariant } =
      useProductProvider();
    const quantity = ref(1);

    const defaultVariant = product?.value?.variants[0];
    if (defaultVariant) {
      setSelectedVariant({ variant: defaultVariant });
    }

    const options = computed(() => {
      const optionsExist = product?.value?.options?.find(
        (option) => option.values.length > 1
      );
      return optionsExist ? product?.value.options : null;
    });

    const buttonText = computed(() => {
      if (product?.value?.selectedVariant?.availableForSale) {
        return 'Add To Cart';
      }
      return 'Sold Out';
    });

    const handleOptionChange = ($event, option) => {
      const newOption = { name: option.name, value: $event.target.value };
      const selectedOptions = product?.value?.selectedOptions
        ? [...product.value.selectedOptions]
        : [];
      const optionIndex = selectedOptions?.findIndex((selectedOption) => {
        return option.name === selectedOption.name;
      });
      if (optionIndex >= 0) selectedOptions[optionIndex] = newOption;
      else selectedOptions.push(newOption);
      setSelectedOptions({ options: selectedOptions });
    };

    const handleAddItem = () => {
      if (product?.value?.selectedVariant) {
        addItem({
          product: product.value,
          variant: product.value.selectedVariant,
          quantity: parseInt(quantity.value)
        });
      }
    };

    return {
      product,
      options,
      quantity,
      buttonText,
      handleOptionChange,
      handleAddItem
    };
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
