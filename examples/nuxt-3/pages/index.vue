<template>
  <main class="home">
    <div class="home__logo">
      <img src="/nacelle-logo.svg" />
    </div>
    <h1>Welcome to your Nacelle Storefront</h1>
    <p>Edit <code class="inline-code">pages/index.vue</code> to get started.</p>
    <p>
      For help on how to build your storefront,
      <a href="https://docs.getnacelle.com/nuxt/intro-nuxt.html" target="none"
        >visit the Nacelle documentation.</a
      >
    </p>
  </main>
</template>

<script setup>
useHead({
  title: 'Home'
});
</script>

<style lang="css" scoped>
.home {
  align-items: center;
  display: flex;
  flex-direction: column;
  font-family: Arial, Helvetica, sans-serif;
  height: 100vh;
  justify-content: center;
  text-align: center;
}
.home__logo {
  max-width: 320px;
}
.home__logo img {
  max-width: 100%;
}
.inline-code {
  background: lightgrey;
  border-radius: 4px;
  padding: 0.25rem;
}
</style>
