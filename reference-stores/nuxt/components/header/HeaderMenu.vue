<template>
  <button
    type="button"
    class="bg-white p-2 rounded-md text-gray-400 lg:hidden"
    @click="setNavVisibility(!navVisible)"
  >
    <span class="sr-only">Open menu</span>
    <span class="flex h-6 w-6 text-gray-400" v-html="menuIcon" />
  </button>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import menuIcon from '~/assets/svgs/menu';

export default {
  name: 'HeaderMenu',
  data: () => ({
    menuIcon
  }),
  computed: {
    ...mapGetters('ui', ['navVisible'])
  },
  methods: {
    ...mapMutations('ui', ['setNavVisibility'])
  }
};
</script>
