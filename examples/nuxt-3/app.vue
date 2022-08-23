<template>
  <div>
    <header>
      <nav class="site-nav">
        <ul role="list">
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li>
            <NuxtLink to="/cart" class="cart-link">
              Cart<sup v-if="cartQuantity" class="cart__quantity">
                {{ cartQuantity }}
              </sup>
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </header>
    <NuxtPage />
  </div>
</template>
<script setup>
// This is the site-wide meta configuration. Can override this on individual pages
const pageTitle = ref('Nuxt 3 Example');
const pageDescription = ref('A Nuxt 3 site built with Nacelle');

onMounted(async () => {
  await initCart();
  await initCheckout();
});
const cart = useCart();
const cartQuantity = computed(() =>
  cart.lineItems.reduce((totalQuantity, item) => {
    return totalQuantity + unref(item.quantity);
  }, 0)
);
useHead({
  title: pageTitle,
  titleTemplate: (theTitle) => `${theTitle} | Nacelle Nuxt 3 example`,
  htmlAttrs: {
    lang: 'en'
  },
  meta: [
    { name: 'description', content: pageDescription },
    { name: 'format-detection', content: 'telephone=no' }
  ],
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
});
</script>
<style lang="css">
.cart__quantity {
  text-align: center;
  font-size: small;
  background-color: #60a5fa;
  clip-path: circle(35%);
  padding: 1ch;
  text-decoration: none !important;
  text-decoration-style: none;
}
.cart-link {
  height: 2rem;
}

nav.site-nav ul {
  display: flex;
  gap: 1.5rem;
  list-style: none;
}

/** source: https://www.scottohara.me/blog/2017/04/14/inclusively-hidden.html#hiding-content-visually */
.visually-hidden:not(:focus):not(:active) {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
</style>
