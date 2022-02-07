<template>
  <transition name="fade">
    <div
      v-show="navVisible"
      class="fixed inset-0 bg-black bg-opacity-25 transition-opacity ease-linear duration-300"
      aria-hidden="true"
      @click="setNavVisibility(false)"
    />
  </transition>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'NavOverlay',
  computed: {
    ...mapGetters('ui', ['navVisible'])
  },
  methods: {
    ...mapMutations('ui', ['setNavVisibility'])
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
