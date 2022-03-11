<template>
  <footer
    v-if="content"
    class="bg-white border-t border-gray-200"
    aria-labelledby="footer-heading"
  >
    <h2 class="sr-only">Footer</h2>
    <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:py-6 lg:px-8">
      <footer-primary :content="primaryContent" />
      <footer-secondary :content="secondaryContent" />
    </div>
  </footer>
</template>

<script>
import FooterPrimary from './FooterPrimary.vue';
import FooterSecondary from './FooterSecondary.vue';

export default {
  name: 'SiteFooter',
  components: {
    FooterPrimary,
    FooterSecondary
  },
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  computed: {
    primaryContent() {
      return {
        navigation: this.content?.fields?.navigationGroups
      };
    },
    secondaryContent() {
      const { navigationGroups, ...rest } = this.content?.fields;
      return rest;
    }
  }
};
</script>
