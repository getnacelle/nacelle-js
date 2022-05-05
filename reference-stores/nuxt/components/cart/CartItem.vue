<template>
  <li class="py-6 flex">
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
        :src="item.featuredMedia.src"
        :alt="item.featuredMedia.altText"
        quality="80"
        :img-attrs="{ class: 'w-full h-full object-center object-cover' }"
      />
    </div>

    <div class="ml-4 flex-1 flex flex-col">
      <div>
        <div class="flex justify-between text-base font-medium text-gray-900">
          <h3>
            <nuxt-link :to="`/products/${item.productHandle}`">
              {{ item.productTitle }}
            </nuxt-link>
          </h3>
          <p class="ml-4">
            <span v-if="price">
              {{ price }}
            </span>
          </p>
        </div>
        <p
          v-if="
            item.variantTitle &&
            item.variantTitle.toLowerCase() !== 'default title'
          "
          class="mt-1 text-sm text-gray-500"
        >
          {{ item.variantTitle }}
        </p>
      </div>
      <div class="flex-1 flex items-end justify-between text-sm">
        <p class="text-gray-500">
          {{ content.itemQuantity }} {{ item.quantity }}
        </p>

        <div class="flex">
          <button
            type="button"
            :disabled="checkoutProcessing"
            class="font-medium text-indigo-600 hover:text-indigo-500"
            @click="handleRemove"
          >
            {{ content.itemRemove }}
          </button>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

import { formatPrice } from '~/utils/formatPrice';

export default {
  name: 'CartItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    content: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters('checkout', ['checkoutProcessing']),
    price() {
      return formatPrice({ price: this.item.price });
    }
  },
  methods: {
    ...mapMutations('cart', ['removeItem']),
    handleRemove() {
      this.removeItem(this.item.id);
    }
  }
};
</script>
