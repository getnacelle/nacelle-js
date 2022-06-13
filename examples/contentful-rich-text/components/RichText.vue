<template>
  <div class="rich">
    <RichTextRenderer
      :document="text"
      :mark-renderers="renderMarks()"
      :node-renderers="renderNodes()"
    />
  </div>
</template>

<script>
import { INLINES, MARKS } from '@contentful/rich-text-types';
import RichTextRenderer from 'contentful-rich-text-vue-renderer';

export default {
  name: 'RichText',
  components: {
    RichTextRenderer
  },
  props: {
    text: {
      type: Object,
      required: true
    }
  },
  methods: {
    renderMarks() {
      return {
        [MARKS.BOLD]: (text, key, h) =>
          h('strong', { key, class: 'bold' }, text),
        [MARKS.ITALIC]: (text, key, h) =>
          h('em', { key, style: 'color: blue;' }, text)
      };
    },
    renderNodes() {
      return {
        [INLINES.HYPERLINK]: (node, key, h, next) => {
          const url = node.data.uri;
          let linkTag = 'a';
          let linkAttrs = { href: url, target: '_blank' };
          if (url.startsWith('/')) {
            linkTag = 'nuxt-link';
            linkAttrs = { to: url };
          }
          return h(
            linkTag,
            { key, attrs: linkAttrs },
            next(node.content, { key }, h, next)
          );
        }
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.rich {
  background-color: white;
  padding: 5px 20px;
}
.bold {
  color: red;
}
</style>
