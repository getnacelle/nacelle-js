<template>
  <div class="container">
    <h1 class="heading">Some Other Pgae</h1>
    <p class="text">
      Empty page for testing links. <nuxt-link to="/">Back Home</nuxt-link>
    </p>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
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
</style>
