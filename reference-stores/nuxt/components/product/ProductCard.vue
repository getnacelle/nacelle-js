<template>
  <div
    tabindex="0"
    @mouseenter="handleHover(true)"
    @mouseleave="handleHover(false)"
    @focus="handleHover(true)"
    @blur="handleHover(false)"
  >
    <div
      class="
        w-full
        aspect-w-1 aspect-h-1
        bg-gray-200
        rounded-lg
        overflow-hidden
        xl:aspect-w-7 xl:aspect-h-8
      "
    >
      <nuxt-link
        :to="`/products/${product.content.handle}`"
        class="hover:opacity-75 focus:opacity-75"
      >
        <span class="sr-only">{{ product.content.title }}</span>
        <nuxt-picture
          :src="product.content.featuredMedia.src"
          :alt="product.content.featuredMedia.altText"
          quality="80"
          sizes="sm:100vw lg:50vw xl:25vw"
          :img-attrs="{
            class: 'w-full h-full object-center object-cover'
          }"
        />
      </nuxt-link>
    </div>
    <div v-show="isHovered">
      <div v-for="option in options" :key="option.name">
        <select
          class="
            block
            w-full
            pl-3
            pr-10
            py-2
            text-base
            border-gray-300
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
            sm:text-sm
            rounded-md
            mt-3
          "
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
        type="button"
        :disabled="!selectedVariant.availableForSale"
        class="
          relative
          flex
          bg-gray-100
          border border-transparent
          rounded-md
          py-2
          px-8
          items-center
          justify-center
          text-sm
          font-medium
          text-gray-900
          hover:bg-gray-200
          w-full
          mt-3
        "
        @click="handleAddItem"
      >
        <div v-if="selectedVariant.availableForSale">Add to Cart</div>
        <div v-else>Out of Stock</div>
      </button>
    </div>
    <div v-show="!isHovered">
      <h3 class="mt-4 text-sm text-gray-700">
        {{ product.content.title }}
      </h3>
      <p class="mt-1 text-lg font-medium text-gray-900">
        <span v-if="price" :class="compareAtPrice && 'text-red-600'">
          {{ price }}
        </span>
        <span v-if="compareAtPrice" class="ml-2 line-through">
          {{ compareAtPrice }}
        </span>
      </p>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

import { formatPrice } from '~/utils/formatPrice';
import { getSelectedVariant } from '~/utils/getSelectedVariant';
import { getCartVariant } from '~/utils/getCartVariant';

export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    selectedVariant: null,
    selectedOptions: null,
    isHovered: false
  }),
  computed: {
    options() {
      const optionsExist = this.product?.content?.options?.find((option) => {
        return option.values.length > 1;
      });
      return optionsExist ? this.product?.content?.options : null;
    },
    price() {
      return formatPrice({ price: this.selectedVariant.price });
    },
    compareAtPrice() {
      return formatPrice({ price: this.selectedVariant.compareAtPrice });
    }
  },
  created() {
    this.selectedVariant = { ...this.product.variants[0] };
    this.selectedOptions = [
      ...(this.selectedVariant?.content?.selectedOptions ?? [])
    ];
  },
  methods: {
    ...mapMutations('cart', ['addItem']),
    handleHover(value) {
      this.isHovered = value;
    },
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
      this.addItem({
        ...getCartVariant({
          product: this.product,
          variant: this.selectedVariant
        }),
        quantity: 1
      });
    }
  }
};
</script>
