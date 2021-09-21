<template>
  <space-provider
    :config="$config.nacelle"
    :space="initialSpace"
    :locale="$config.nacelle.locale"
  >
    <nuxt />
  </space-provider>
</template>

<script>
import { inject } from '@nuxtjs/composition-api';
import { SpaceProvider } from '@nacelle/vue';

export default {
  components: { SpaceProvider },
  setup() {
    const initialSpace = inject('initialSpace');
    return { initialSpace };
  }
};
</script>
