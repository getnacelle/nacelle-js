<template>
  <div class="bg-white">
    <hero-banner :content="content" />
  </div>
</template>

<script>
import HeroBanner from '~/components/section/HeroBanner';
import { buildMeta } from '~/utils/buildMeta';

export default {
  name: 'ErrorPage',
  components: {
    HeroBanner
  },
  data: () => ({
    content: {
      fields: {
        heading: '404',
        text: 'Uh oh!  The page you are looking for does not exist.',
        linkText: 'Back to Homepage',
        linkUrl: '/'
      }
    }
  }),
  head() {
    return buildMeta({ route: this.$route });
  }
};
</script>

<style lang="scss" scoped></style>
