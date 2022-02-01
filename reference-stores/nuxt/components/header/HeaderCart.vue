<template>
  <button
    type="button"
    class="ml-0 md:ml-2 lg:ml-4 bg-white p-2 rounded-md text-gray-400 group p-2 flex items-center"
    @click="setCartVisibility(!cartVisible)"
  >
    <svg
      class="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
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
        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
      />
    </svg>
    <span
      class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800"
      >{{ cartCount }}</span
    >
    <span class="sr-only">items in cart, view bag</span>
  </button>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'HeaderCart',
  computed: {
    ...mapGetters('cart', ['cartCount']),
    ...mapGetters('ui', ['cartVisible'])
  },
  methods: {
    ...mapMutations('ui', ['setCartVisibility'])
  }
};
</script>
