<template>
  <collection-provider
    v-if="collection && Object.keys(collection).length"
    :collection="collection"
    class="collection-page"
  >
    <collection />
  </collection-provider>
  <div v-else-if="fetchState.pending">Loading...</div>
  <div v-else-if="fetchState.error">Error</div>
</template>

<script>
import { inject, ref, useContext, useFetch } from '@nuxtjs/composition-api';
import { CollectionProvider } from '@nacelle/vue';
import Collection from '~/components/Collection';
export default {
  components: { CollectionProvider, Collection },
  setup() {
    const collection = ref({});
    const { route } = useContext();
    const nacelleSdk = inject('nacelleSdk');
    const handle = route.value.params.handle;
    const { fetchState } = useFetch(async () => {
      const data = await Promise.all([
        nacelleSdk.data.collection({ handle }),
        nacelleSdk.data.collectionPage({
          handle,
          paginate: true,
          itemsPerPage: 12
        })
      ]);
      if (data) {
        collection.value = { ...data[0], products: data[1] };
      }
    });
    return { fetchState, collection };
  }
};
</script>
