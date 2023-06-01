<template>
  <div v-if="collection" class="bg-white">
    <collection-grid :collection="collection" />
    <site-section
      v-for="section in sections"
      :key="section._key"
      :content="section"
    />
  </div>
</template>

<script>
import { COLLECTION_PAGE_QUERY } from '~/queries/collectionPage';
import { buildMeta } from '~/utils/buildMeta';
import { resolvePageData } from '~/utils/resolvers';

import CollectionGrid from '~/components/collection/CollectionGrid.vue';
import SiteSection from '~/components/section/Section.vue';

export default {
  name: 'CollectionPage',
  components: {
    CollectionGrid,
    SiteSection
  },
  async asyncData({ app, params }) {
    const { data } = await app.$nacelle.query({
      query: COLLECTION_PAGE_QUERY,
      variables: {
        handle: params.handle,
        pageHandle: `page-${params.handle}`
      }
    });
    const { page } = await resolvePageData({
      client: app.$nacelle,
      page: data.pages.edges.at(0)?.node
    });
    return {
      collection: data.collections.edges.at(0)?.node,
      page
    };
  },
  head() {
    return buildMeta({ collection: this.collection });
  },
  computed: {
    sections() {
      return this.page?.fields.sections;
    },
    content() {
      const fields = this.page?.fields || {};
      const { sections, ...rest } = fields;
      return { fields: rest };
    }
  }
};
</script>

<style lang="scss" scoped></style>
