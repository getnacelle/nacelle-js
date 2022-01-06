<template>
  <collection-provider
    v-if="collection && Object.keys(collection).length"
    :collection="collection"
    class="collection-page"
  >
    <collection />
  </collection-provider>
</template>

<script>
import { CollectionProvider, useSpaceProvider } from '@nacelle/vue';
import Collection from '~/components/Collection';

export default {
  components: { CollectionProvider, Collection },
  setup() {
    const { nacelleSdk } = useSpaceProvider();
    return {
      nacelleSdk
    };
  },
  data: () => ({
    collection: null
  }),
  async fetch() {
    const handle = this.$route.params.handle;
    const data = await Promise.all([
      this.nacelleSdk.data.collection({ handle }),
      this.nacelleSdk.data.collectionPage({
        handle,
        paginate: true,
        itemsPerPage: 12
      })
    ]);
    if (data) {
      this.collection = { ...data[0], products: data[1] };
    }
  }
};
</script>
