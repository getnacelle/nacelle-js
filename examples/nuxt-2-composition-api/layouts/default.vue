<template>
  <space-provider
    :config="$config.nacelle"
    :space="initialSpace"
    :locale="$config.nacelle.locale"
    class="app"
  >
    <event-provider>
      <cart-provider>
        <nuxt />
      </cart-provider>
    </event-provider>
  </space-provider>
</template>

<script>
import { inject } from '@nuxtjs/composition-api';
import { SpaceProvider, EventProvider, CartProvider } from '@nacelle/vue';

export default {
  components: { SpaceProvider, EventProvider, CartProvider },
  setup() {
    const initialSpace = inject('initialSpace');
    return { initialSpace };
  }
};
</script>

<style lang="scss" scoped>
.app::v-deep * {
  box-sizing: border-box;
}
</style>
