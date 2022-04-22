<template>
  <div class="bg-white">
    <site-section
      v-for="(section, index) in sections"
      :key="`${section.type}-${index}`"
      :content="section"
    />
  </div>
</template>

<script>
import { CONTENT_PAGE_QUERY } from '~/queries/contentPage';
import { buildMeta } from '~/utils/buildMeta';

import SiteSection from '~/components/section/Section.vue';

export default {
  name: 'ContentPage',
  components: { SiteSection },
  async asyncData({ app, params }) {
    const { pages } = await app.$nacelle.query({
      query: CONTENT_PAGE_QUERY,
      variables: { handle: `page-${params.handle}` }
    });
    return {
      page: pages[0]
    };
  },
  head() {
    return buildMeta({ route: this.$route });
  },
  computed: {
    sections() {
      return this.page?.fields.sections;
    }
  }
};
</script>

<style lang="scss" scoped></style>
