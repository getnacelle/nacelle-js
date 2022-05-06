<template>
  <button
    type="button"
    class="
      ml-0
      md:ml-2
      lg:ml-4
      bg-white
      p-2
      rounded-md
      text-gray-400
      p-2
      flex
      items-center
    "
    @click="setCartVisibility(!cartVisible)"
  >
    <span class="flex-shrink-0 h-6 w-6 text-gray-400" v-html="cartIcon" />
    <span class="ml-2 text-sm font-medium text-gray-700">{{ cartCount }}</span>
    <span class="sr-only">items in cart, view bag</span>
  </button>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import cartIcon from '~/assets/svgs/cart';

export default {
  name: 'HeaderCart',
  data: () => ({
    cartIcon
  }),
  computed: {
    ...mapGetters('cart', ['cartCount']),
    ...mapGetters('ui', ['cartVisible'])
  },
  methods: {
    ...mapMutations('ui', ['setCartVisibility'])
  }
};
</script>
