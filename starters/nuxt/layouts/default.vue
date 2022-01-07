<template>
  <space-provider
    v-if="initialSpace"
    :config="$config.nacelle"
    :space="initialSpace"
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
import NacelleClient from '@nacelle/client-js-sdk';
import { useContext, useAsync } from '@nuxtjs/composition-api';
import { SpaceProvider, EventProvider, CartProvider } from '@nacelle/vue';

export default {
  components: { SpaceProvider, EventProvider, CartProvider },
  setup() {
    const { $config } = useContext();
    const nacelleClient = new NacelleClient({
      ...$config.nacelle,
      useStatic: false
    });

    const initialSpace = useAsync(() => nacelleClient.data.space());

    return { initialSpace };
  }
};
</script>

<style lang="scss" scoped>
.app::v-deep * {
  box-sizing: border-box;
}
</style>
