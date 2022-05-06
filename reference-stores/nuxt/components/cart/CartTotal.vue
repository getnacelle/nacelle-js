<template>
  <div v-if="content" class="border-t border-gray-200 py-6 px-4 sm:px-6">
    <div class="flex justify-between text-base font-medium text-gray-900">
      <p>{{ content.subtotalLabel }}</p>
      <p v-show="total">{{ total }}</p>
    </div>
    <p v-if="content.subtotalText" class="mt-0.5 text-sm text-gray-500">
      {{ content.subtotalText }}
    </p>
    <div class="mt-6">
      <button
        :disabled="checkoutProcessing"
        class="
          w-full
          flex
          justify-center
          items-center
          px-6
          py-3
          border border-transparent
          rounded-md
          shadow-sm
          text-base
          font-medium
          text-white
          bg-indigo-600
          hover:bg-indigo-700
          transition
          duration-300
          ease-in-out
        "
        :class="{ 'bg-gray-600': checkoutProcessing }"
        @click="processCheckout"
      >
        {{ checkoutButtonText }}
      </button>
    </div>
    <div
      v-if="content.continueText"
      class="mt-6 flex justify-center text-sm text-center text-gray-500"
    >
      <p>
        or
        <button
          type="button"
          class="text-indigo-600 font-medium hover:text-indigo-500"
          @click="setCartVisibility(false)"
        >
          {{ content.continueText }}<span aria-hidden="true"> &rarr;</span>
        </button>
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { formatPrice } from '~/utils/formatPrice';

export default {
  name: 'CartTotal',
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters('cart', ['cartSubtotal']),
    ...mapGetters('checkout', ['checkoutProcessing']),
    total() {
      return formatPrice({ price: this.cartSubtotal });
    },
    checkoutButtonText() {
      return this.checkoutProcessing
        ? 'Checking Out...'
        : this.content.checkoutText;
    }
  },
  methods: {
    ...mapMutations('ui', ['setCartVisibility']),
    ...mapActions('checkout', ['processCheckout'])
  }
};
</script>
