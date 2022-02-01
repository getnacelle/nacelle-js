<template>
  <div
    v-if="content"
    v-show="cartVisible"
    class="fixed inset-0 overflow-hidden z-20"
    aria-labelledby="slide-over-title"
    role="dialog"
    aria-modal="true"
  >
    <div class="absolute inset-0 overflow-hidden">
      <cart-overlay />
      <cart-drawer :content="content" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

import CartOverlay from './CartOverlay.vue';
import CartDrawer from './CartDrawer.vue';

export default {
  name: 'SiteCart',
  components: {
    CartOverlay,
    CartDrawer
  },
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters('ui', ['cartVisible']),
    ...mapGetters('cart', ['cartItems'])
  },
  watch: {
    cartItems: {
      handler() {
        if (!this.cartVisible) {
          this.setCartVisibility(true);
        }
      }
    }
  },
  methods: {
    ...mapMutations('ui', ['setCartVisibility'])
  }
};
</script>
