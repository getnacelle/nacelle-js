<template>
  <transition name="fade">
    <div
      v-show="cartVisible"
      class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity ease-in-out duration-500"
      aria-hidden="true"
      @click="setCartVisibility(false)"
    ></div>
  </transition>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'CartOverlay',
  computed: {
    ...mapGetters('ui', ['cartVisible'])
  },
  methods: {
    ...mapMutations('ui', ['setCartVisibility'])
  }
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  opacity: 1;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
