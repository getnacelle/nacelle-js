<template>
  <div v-if="product" class="bg-white">
    <div
      class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8"
    >
      <div class="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
        <div class="flex flex-col-reverse">
          <div
            class="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none"
          >
            <div
              class="grid grid-cols-4 gap-6"
              aria-orientation="horizontal"
              role="tablist"
            >
              <button
                v-for="(image, index) in images"
                :id="`tabs-1-tab-${index}`"
                :key="image.src"
                class="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
                :aria-controls="`tabs-1-panel-${index}`"
                role="tab"
                type="button"
                @click="handleImageClick(index)"
              >
                <span class="sr-only">
                  {{ image.altText }}
                </span>
                <span class="absolute inset-0 rounded-md overflow-hidden">
                  <nuxt-picture
                    :src="image.src"
                    :alt="image.altText"
                    class="thumbnail"
                    quality="80"
                    sizes="xl:128px"
                  />
                </span>
                <span
                  :class="`${
                    activeImageIndex === index
                      ? 'ring-indigo-500'
                      : 'ring-transparent'
                  } absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none`"
                  aria-hidden="true"
                ></span>
              </button>
            </div>
          </div>

          <div class="w-full aspect-w-1 aspect-h-1">
            <div
              v-for="(image, index) in images"
              :id="`tabs-1-panel-${index}`"
              :key="image.src"
              :aria-labelledby="`tabs-1-panel-${index}`"
              role="tabpanel"
              tabindex="0"
              :class="index !== activeImageIndex ? 'hidden' : ''"
            >
              <nuxt-picture
                :src="image.src"
                :alt="image.altText"
                class="picture"
                sizes="md:100vw lg:624px xl:592px"
                quality="80"
              />
            </div>
          </div>
        </div>

        <div class="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <h1 class="text-3xl font-extrabold tracking-tight text-gray-900">
            {{ product.content.title }}
          </h1>

          <div class="mt-3">
            <h2 class="sr-only">Product information</h2>
            <p class="text-3xl text-gray-900">
              <span v-if="price" :class="compareAtPrice && 'text-red-600'">
                {{ price }}
              </span>
              <span v-if="compareAtPrice" class="line-through">
                {{ compareAtPrice }}
              </span>
            </p>
          </div>

          <div v-if="product.content.description" class="mt-6">
            <h3 class="sr-only">Description</h3>

            <!-- eslint-disable vue/no-v-html -->
            <div
              class="text-base text-gray-700 space-y-6"
              v-html="product.content.description"
            ></div>
            <!-- eslint-enable vue/no-v-html -->
          </div>

          <form class="mt-6">
            <div v-for="option in options" :key="option.name" class="max-w-xs">
              <h3 class="font-medium text-sm text-gray-700">
                {{ option.name }}
              </h3>

              <fieldset class="mt-2">
                <legend class="sr-only">Choose a {{ option.name }}</legend>
                <select
                  class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
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
              </fieldset>
            </div>

            <div class="mt-10 flex">
              <button
                type="button"
                :disabled="!selectedVariant.availableForSale"
                class="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
                @click="handleAddItem"
              >
                <span v-if="selectedVariant.availableForSale">Add to bag</span>
                <span v-else>Out of stock</span>
              </button>
            </div>
          </form>

          <section aria-labelledby="details-heading" class="mt-12">
            <h2 id="details-heading" class="sr-only">Additional details</h2>

            <div class="border-t divide-y divide-gray-200">
              <product-expandable v-if="features" :features="features" />
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

import ProductExpandable from './ProductExpandable.vue';
import { formatPrice } from '~/utils/formatPrice';
import { getSelectedVariant } from '~/utils/getSelectedVariant';
import { getCartVariant } from '~/utils/getCartVariant';

export default {
  name: 'ProductBuyBox',
  components: {
    ProductExpandable
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
  },
  data: () => ({
    activeImageIndex: 0,
    selectedVariant: null,
    selectedOptions: null
  }),
  computed: {
    images() {
      return this.product?.content.media.filter(
        (media) => media.type === 'IMAGE'
      );
    },
    price() {
      return formatPrice({ price: this.selectedVariant.price });
    },
    compareAtPrice() {
      return formatPrice({ price: this.selectedVariant.compareAtPrice });
    },
    options() {
      const optionsExist = this.product?.content?.options?.find((option) => {
        return option.values.length > 1;
      });
      return optionsExist ? this.product?.content?.options : null;
    },
    features() {
      return this.content?.fields?.features;
    }
  },
  created() {
    this.selectedVariant = { ...this.product.variants[0] };
    this.selectedOptions = [...this.selectedVariant.content.selectedOptions];
  },
  methods: {
    ...mapMutations('cart', ['addItem']),
    handleImageClick(index) {
      this.activeImageIndex = index;
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

<style lang="scss" scoped>
::v-deep .thumbnail img {
  @apply w-full h-full object-center object-cover;
}

::v-deep .picture img {
  @apply w-full h-full object-center object-cover sm:rounded-lg;
}
</style>
