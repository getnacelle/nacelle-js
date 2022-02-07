<template>
  <div class="homePage">
    <site-section
      v-for="section in sections"
      :key="section._key"
      :content="section"
    />
  </div>
</template>

<script>
import { CONTENT_PAGE_QUERY } from '~/queries/contentPage';
import { buildMeta } from '~/utils/buildMeta';

import SiteSection from '~/components/section/Section.vue';

export default {
  name: 'HomePage',
  components: { SiteSection },
  async asyncData({ app }) {
    const { pages } = await app.$nacelle.query({
      query: CONTENT_PAGE_QUERY,
      variables: { handle: 'page-homepage' }
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
