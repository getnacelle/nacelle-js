<template>
  <transition name="slide">
    <div
      v-show="cartVisible"
      class="
        fixed
        top-0
        right-0
        bottom-0
        w-screen
        bg-white
        max-w-md
        transition-transform
        ease-in-out
        duration-500
      "
    >
      <div class="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
        <div class="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
          <div class="flex items-start justify-between">
            <h2
              v-if="content.fields.heading"
              id="slide-over-title"
              class="text-lg font-medium text-gray-900"
            >
              {{ content.fields.heading }}
            </h2>
            <div class="ml-3 h-7 flex items-center">
              <button
                type="button"
                class="-m-2 p-2 text-gray-400 hover:text-gray-500"
                @click="setCartVisibility(false)"
              >
                <span class="sr-only">Close panel</span>
                <span class="h-6 w-6 flex" v-html="closeIcon" />
              </button>
            </div>
          </div>

          <div class="mt-8">
            <div class="flow-root">
              <div v-show="cartItems.length">
                <ul role="list" class="-my-6 divide-y divide-gray-200">
                  <cart-item
                    v-for="item in cartItems"
                    :key="item.id"
                    :item="item"
                    :content="itemContent"
                  />
                </ul>
              </div>
              <p v-show="!cartItems.length" class="text-gray-400 text-center">
                {{ content.fields.emptyText }}
              </p>
              <cart-cross-sells
                v-if="crossSellContent"
                :content="crossSellContent"
              />
            </div>
          </div>
        </div>
        <cart-total v-show="cartItems.length" :content="totalContent" />
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

import CartItem from './CartItem.vue';
import CartCrossSells from './CartCrossSells.vue';
import CartTotal from './CartTotal.vue';
import closeIcon from '~/assets/svgs/close';

export default {
  name: 'CartDrawer',
  components: {
    CartItem,
    CartCrossSells,
    CartTotal
  },
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  data: () => ({ closeIcon }),
  computed: {
    ...mapGetters('cart', ['cartItems']),
    ...mapGetters('ui', ['cartVisible']),
    itemContent() {
      const { itemQuantity, itemRemove } = this.content?.fields;
      return { itemQuantity, itemRemove };
    },
    crossSellContent() {
      const { crosssellHeading, crosssellItems, crosssellAdd } =
        this.content?.fields;
      return {
        heading: crosssellHeading,
        items: crosssellItems,
        add: crosssellAdd
      };
    },
    totalContent() {
      const { subtotalLabel, subtotalText, checkoutText, continueText } =
        this.content?.fields;
      return { subtotalLabel, subtotalText, checkoutText, continueText };
    }
  },
  methods: {
    ...mapMutations('ui', ['setCartVisibility'])
  }
};
</script>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transform: translateX(0%);
}
.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
