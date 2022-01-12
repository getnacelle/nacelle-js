<template>
  <div v-if="collection" class="collection">Collection Page</div>
</template>

<script>
import { Storefront } from '@nacelle/storefront-sdk';

export default {
  name: 'CollectionPage',
  async asyncData({ $config, params }) {
    const client = new Storefront($config.nacelle);
    const [collections, products] = await Promise.all([
      client.productCollections({ handles: [params.handle] }),
      client.productCollectionEntries({
        handle: params.handle,
        maxReturnedEntries: 15
      })
    ]);
    return {
      collection: collections[0],
      products
    };
  },
  data: () => ({
    collection: null,
    products: null
  })
};
</script>

<style lang="scss" scoped>
.collection {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
  @media only screen and (min-width: 768px) {
    flex-direction: row;
  }
}
.collection__list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20em, 1fr));
  gap: 30px 0;
}
</style>
