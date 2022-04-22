<template>
  <component
    :is="component"
    v-if="content"
    :content="content"
    :section="section"
  />
</template>

<script>
import { pascalCase } from 'pascal-case';

export default {
  name: 'SiteSection',
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    component: null
  }),
  computed: {
    section() {
      return (
        this.content?.type &&
        pascalCase(this.content?.type).replace('Section', '')
      );
    }
  },
  created() {
    try {
      this.component =
        require(`~/components/section/${this.section}.vue`).default;
    } catch {
      this.component = require(`~/components/section/Placeholder.vue`).default;
    }
  }
};
</script>
