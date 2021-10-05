<template>
  <div>
    <h1>Cart</h1>
    <ul v-if="cart.lineItems.length" class="cart">
      <li v-for="item in cart.lineItems" :key="item.id" class="cart__item">
        <div class="cart__item-image">
          <nuxt-img
            v-if="item.variant.featuredMedia"
            :src="item.variant.featuredMedia.thumbnailSrc"
            :alt="item.variant.featuredMedia.altText"
          />
        </div>
        <div>
          <h2 class="cart__item-title">{{ item.product.title }}</h2>
          <p>{{ item.variant.title }}</p>
          <p>{{ formatPrice(item.variant.price) }}</p>
          <p>
            <strong>Quantity</strong>: {{ item.quantity }}
            <button type="button" @click="incrementItem(item.id)">+</button>
            <button type="button" @click="decrementItem(item.id)">-</button>
            <button type="button" @click="removeItem(item.id)">Remove</button>
          </p>
        </div>
      </li>
    </ul>
    <p v-else>Empty Cart</p>
    <p><strong>Subtotal:</strong> {{ subtotal }}</p>
    <p>
      <button type="button" @click="clearCart">Clear Cart</button>
    </p>
    <p>
      <button type="button" @click="processCheckout">
        Proceed to Checkout
      </button>
    </p>
  </div>
</template>

<script>
import { useContext } from '@nuxtjs/composition-api';
import { useCartProvider } from '@nacelle/vue';
import createShopifyCheckoutClient from '@nacelle/shopify-checkout';

export default {
  setup() {
    const {
      cart,
      removeItem,
      incrementItem,
      decrementItem,
      clearCart
    } = useCartProvider();
    const { $config } = useContext();
    const checkoutClient = createShopifyCheckoutClient($config.shopify);

    if (process.client) {
      // clear cart if checkout has been completed
      const checkoutId = window.localStorage.getItem('checkoutId');

      if (checkoutId) {
        checkoutClient.get({ id: checkoutId }).then((checkoutData) => {
          if (checkoutData?.completed) {
            window.localStorage.setItem('checkoutId', '');
            clearCart();
          }
        });
      }
    }

    return {
      cart,
      removeItem,
      incrementItem,
      decrementItem,
      clearCart,
      checkoutClient
    };
  },
  computed: {
    subtotal() {
      const value = this.cart.lineItems.reduce((sum, item) => {
        return sum + item.quantity * item.variant.price;
      }, 0);
      return this.formatPrice(value);
    }
  },
  methods: {
    formatPrice(price) {
      return Intl.NumberFormat('en-us', {
        style: 'currency',
        currency: 'USD'
      }).format(price);
    },
    async processCheckout() {
      // format cart items into the shape that's expected by the checkout client
      const cartItems = this.cart.lineItems.map((cartItem) => ({
        quantity: cartItem.quantity,
        variantId: cartItem.variant.id,
        metafields: [
          ...cartItem.product.metafields,
          ...cartItem.variant.metafields
        ]
      }));

      const checkoutData = await this.checkoutClient.process({ cartItems });
      window.localStorage.setItem('checkoutId', checkoutData.id);

      if (checkoutData.url) {
        window.location.href = checkoutData.url;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.cart {
  padding: 0;
}
.cart__item {
  display: flex;
  margin-bottom: 1rem;
}
.cart__item-image {
  margin-right: 1rem;
}
.cart__item-title {
  margin-top: 0;
}
</style>
