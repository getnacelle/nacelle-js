<template>
  <div v-if="content" class="bg-white">
    <div
      v-show="navVisible"
      class="fixed inset-0 flex z-40 lg:hidden"
      role="dialog"
      aria-modal="true"
    >
      <nav-overlay />
      <nav-drawer :content="content.fields" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import NavOverlay from './NavOverlay.vue';
import NavDrawer from './NavDrawer.vue';

export default {
  name: 'SiteNav',
  components: {
    NavOverlay,
    NavDrawer
  },
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters('ui', ['navVisible'])
  }
};
</script>
