<template>
  <div v-if="content" v-show="crossSells.length" class="mt-12">
    <h2 class="text-lg font-medium text-gray-900">
      {{ content.heading }}
    </h2>
    <ul>
      <li
        v-for="crossSell in crossSells"
        :key="crossSell.nacelleEntryId"
        class="py-6 flex"
      >
        <div
          class="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden"
        >
          <nuxt-img
            :src="crossSell.content.featuredMedia.src"
            :alt="crossSell.content.featuredMedia.altText"
            class="w-full h-full object-center object-cover"
          />
        </div>

        <div class="ml-4 flex-1 flex flex-col">
          <div>
            <div
              class="flex justify-between text-base font-medium text-gray-900"
            >
              <h3>
                <nuxt-link :to="`/products/${crossSell.content.handle}`">
                  {{ crossSell.content.title }}
                </nuxt-link>
              </h3>
              <p class="ml-4">
                <span>{{ crossSell.price }}</span>
              </p>
            </div>
          </div>
          <div class="flex-1 flex items-end text-sm">
            <div class="flex w-full">
              <button
                type="button"
                class="relative flex bg-gray-100 border border-transparent rounded-md py-2 px-8 items-center justify-center text-sm font-medium text-gray-900 hover:bg-gray-200 w-full"
                :disabled="checkoutProcessing"
                @click="handleAdd(crossSell)"
              >
                {{ content.add }}
                <span class="sr-only">, {{ crossSell.content.title }}</span>
              </button>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

import { PRODUCTS_QUERY } from '~/queries/product';
import { formatPrice } from '~/utils/formatPrice';
import { getCartVariant } from '~/utils/getCartVariant';

export default {
  name: 'CartCrossSells',
  components: {},
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    products: []
  }),
  async fetch() {
    const { products } = await this.$nacelle.query({
      query: PRODUCTS_QUERY,
      variables: { handles: this.content.products }
    });
    this.products = products;
  },
  computed: {
    ...mapGetters('cart', ['cartItems']),
    ...mapGetters('checkout', ['checkoutProcessing']),
    crossSells() {
      return this.products
        .filter((product) => {
          return (
            product.availableForSale &&
            !this.cartItems.some((cartItem) => {
              return cartItem.productHandle === product.content.handle;
            })
          );
        })
        .map((product) => ({
          ...product,
          price: formatPrice({ price: product.variants[0].price })
        }))
        .slice(0, 3);
    }
  },
  methods: {
    ...mapMutations('cart', ['addItem']),
    handleAdd(item) {
      this.addItem({
        ...getCartVariant({
          product: item,
          variant: item.variants[0]
        }),
        quantity: 1
      });
    }
  }
};
</script>
