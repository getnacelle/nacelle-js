<template>
  <space-provider
    v-if="nacelleSpace"
    :config="$config.nacelle"
    :space="nacelleSpace"
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

    const nacelleSpace = useAsync(() => nacelleClient.data.space());

    return { nacelleSpace };
  }
};
</script>

<style lang="scss" scoped>
.app::v-deep * {
  box-sizing: border-box;
}
</style>
