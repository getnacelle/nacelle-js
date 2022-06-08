<template>
  <div class="container">
    <h1 class="heading">Contentful Rich Text Example</h1>
    <p class="text">
      The rich text field below will be custom rendered as such:
    </p>
    <ul class="list">
      <li>All internal links will be rendered as &lt;nuxt-link&gt;</li>
      <li>All external links will be rendered as &lt;a target="_blank"&gt;</li>
      <li>All bold text will have class `bold`</li>
      <li>All italic text will be blue</li>
    </ul>
    <div class="main">
      <RichText :text="content.fields.richText" />
    </div>
  </div>
</template>

<script>
import RichText from '../components/RichText';

export default {
  name: 'HomePage',
  components: {
    RichText
  },
  async asyncData({ app }) {
    const content = await app.$nacelle.content({
      handles: ['homepage'],
      type: 'page'
    });
    return { content: content[0] };
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  max-width: 500px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.list {
  margin-bottom: 40px;
}
.main {
  width: 100%;
  border: 1px solid black;
  background: silver;
  padding: 10px;
}
</style>
