<div class="home">
  <div class="home__logo">
    <img src="/nacelle-logo.svg" alt="logo" />
  </div>
  <h1>Welcome to your Svelte Nacelle Storefront</h1>
  <p>Edit <code class="inline-code">pages/index.vue</code> to get started.</p>
  <p>
    For more information on Svelte
    
    <a href="https://svelte.dev/docs" target="_blank"
      >visit the Svelte documentation.</a
    >
  </p>
</div>

<style lang=scss>
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

  img {
    max-width: 100%;
  }
}
.inline-code {
  background: lightgrey;
  border-radius: 4px;
  padding: 0.25rem;
}
</style>
