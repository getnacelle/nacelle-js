<template>
  <div v-if="content && hasCrossSells" class="mt-12">
    <h2 v-if="content.heading" class="text-lg font-medium text-gray-900">
      {{ content.heading }}
    </h2>
    <ul>
      <li
        v-for="crossSell in crossSellItems"
        :key="crossSell.nacelleEntryId"
        class="py-6 flex"
      >
        <div
          class="
            flex-shrink-0
            w-24
            h-24
            border border-gray-200
            rounded-md
            overflow-hidden
          "
        >
          <nuxt-picture
            v-if="crossSell.image"
            :src="crossSell.image.src"
            :alt="crossSell.image.altText"
            quality="80"
            :img-attrs="{ class: 'w-full h-full object-center object-cover' }"
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
                "
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
  computed: {
    ...mapGetters('cart', ['cartItems']),
    ...mapGetters('checkout', ['checkoutProcessing']),
    crossSellItems() {
      return this.content?.items
        ?.filter((item) => {
          return (
            item.availableForSale &&
            !this.cartItems.some((cartItem) => {
              return cartItem.productHandle === item.content.handle;
            })
          );
        })
        .map((item) => ({
          ...item,
          image: item.content.featuredMedia,
          price: formatPrice({ price: item.variants[0].price })
        }))
        .slice(0, 3);
    },
    hasCrossSells() {
      return this.crossSellItems?.length;
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
