<template>
  <div v-if="product" class="product">
    <div v-if="product.content.featuredMedia" class="product__media">
      <nuxt-img
        :src="product.content.featuredMedia.src"
        :alt="product.content.featuredMedia.altText"
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
      <div v-for="option in options" :key="option.name" class="product__option">
        <label :for="`select-${uniqueId}`" class="product__label">{{
          option.name
        }}</label>
        <select
          :id="`select-${uniqueId}`"
          class="product__select"
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
        :disabled="!selectedVariant || !selectedVariant.availableForSale"
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
  name: 'ProductPage',
  async asyncData({ app, params }) {
    const { products } = await app.$nacelle.query({
      query: PAGE_QUERY,
      variables: { handle: params.handle }
    });
    return {
      product: products[0]
    };
  },
  data: () => ({
    product: null,
    selectedVariant: null,
    selectedOptions: [],
    quantity: 1,
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

const PAGE_QUERY = `
  query ProductPage($handle: String!){
    products(filter: { handles: [$handle] }){
      nacelleEntryId
      sourceEntryId
      content{
        handle
        title
        description
        options{
          name
          values
        }
        featuredMedia{
          src
          thumbnailSrc
          altText
        }
			}
      variants{
        nacelleEntryId
        sourceEntryId
        sku
        availableForSale
        price
        compareAtPrice
        content{
          title
          selectedOptions{
            name
            value
          }
          featuredMedia{
            src
            thumbnailSrc
            altText
          }
        }
      }
    }
  }
`;
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
