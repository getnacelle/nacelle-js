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
import { inject, useContext, useAsync } from '@nuxtjs/composition-api';
import { CollectionProvider } from '@nacelle/vue';
import Collection from '~/components/Collection';
export default {
  components: { CollectionProvider, Collection },
  setup() {
    const { route } = useContext();
    const nacelleSdk = inject('nacelleSdk');

    const handle = route.value.params.handle;

    const collection = useAsync(async () => {
      const [collection, products] = await Promise.all([
        nacelleSdk.data.collection({ handle }),
        nacelleSdk.data.collectionPage({
          handle,
          paginate: true,
          itemsPerPage: 12
        })
      ]);
      if (collection) {
        return { ...collection, products };
      }
    });

    return { collection };
  }
};
</script>
