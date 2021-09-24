<template>
  <space-provider
    :config="$config.nacelle"
    :space="initialSpace"
    :locale="$config.nacelle.locale"
  >
    <event-provider>
      <cart-provider>
        <div>Error</div>
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
