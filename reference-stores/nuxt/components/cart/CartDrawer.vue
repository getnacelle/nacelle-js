<template>
  <div class="fixed inset-y-0 right-0 pl-10 max-w-full flex">
    <transition name="slide">
      <div
        v-show="cartVisible"
        class="w-screen max-w-md transform transition ease-in-out duration-500"
      >
        <div class="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
          <div class="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
            <div class="flex items-start justify-between">
              <h2
                id="slide-over-title"
                class="text-lg font-medium text-gray-900"
              >
                {{ content.fields.drawer.heading }}
              </h2>
              <div class="ml-3 h-7 flex items-center">
                <button
                  type="button"
                  class="-m-2 p-2 text-gray-400 hover:text-gray-500"
                  @click="setCartVisibility(false)"
                >
                  <span class="sr-only">Close panel</span>
                  <svg
                    class="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
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
                      :content="content.fields.item"
                    />
                  </ul>
                </div>
                <p v-show="!cartItems.length" class="text-gray-400 text-center">
                  {{ content.fields.drawer.empty }}
                </p>
                <cart-cross-sells :content="content.fields.crosssells" />
              </div>
            </div>
          </div>
          <cart-total
            v-show="cartItems.length"
            :content="content.fields.total"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

import CartItem from './CartItem.vue';
import CartCrossSells from './CartCrossSells.vue';
import CartTotal from './CartTotal.vue';

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
  computed: {
    ...mapGetters('cart', ['cartItems']),
    ...mapGetters('ui', ['cartVisible'])
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
