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
import NacelleClient from '@nacelle/client-js-sdk';
import { SpaceProvider, EventProvider, CartProvider } from '@nacelle/vue';

export default {
  components: { SpaceProvider, EventProvider, CartProvider },
  data: () => ({
    initialSpace: null
  }),
  async fetch() {
    const client = new NacelleClient({
      id: this.$config.nacelle?.id,
      token: this.$config.nacelle?.token,
      nacelleEndpoint: this.$config.nacelle?.nacelleEndpoint,
      locale: this.$config.nacelle?.locale,
      useStatic: false
    });

    this.initialSpace = await client.data.space();
  }
};
</script>

<style lang="scss" scoped>
.app::v-deep * {
  box-sizing: border-box;
}
</style>
