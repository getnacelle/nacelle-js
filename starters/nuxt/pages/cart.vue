<template>
  <div>
    <h1>Cart</h1>
    <ul v-if="cart.lineItems.length" class="cart">
      <li v-for="item in cart.lineItems" :key="item.id" class="cart__item">
        <div class="cart__item-image">
          <img
            v-if="item.variant.featuredMedia"
            :src="item.variant.featuredMedia.thumbnailSrc"
            :alt="item.variant.featuredMedia.alt"
          />
        </div>
        <div>
          <h2>{{ item.title }}</h2>
          <p>{{ item.variant.title }}</p>
          <p>{{ formatPrice(item.variant.price) }}</p>
          <p>
            <strong>Quantity</strong>: {{ item.quantity }}
            <button @click="incrementItem(item.id)">+</button>
            <button @click="decrementItem(item.id)">-</button>
            <button @click="removeItem(item.id)">Remove</button>
          </p>
        </div>
      </li>
    </ul>
    <p v-else>Empty Cart</p>
    <p><strong>Subtotal:</strong> {{ subtotal }}</p>
    <p>
      <button @click="clearCart()">Clear Cart</button>
    </p>
  </div>
</template>

<script>
import { useCartProvider } from '@nacelle/vue';

export default {
  setup() {
    const {
      cart,
      removeItem,
      incrementItem,
      decrementItem,
      clearCart
    } = useCartProvider();
    return {
      cart,
      removeItem,
      incrementItem,
      decrementItem,
      clearCart
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
}
.cart__item-image {
  align-items: center;
  display: flex;
  margin-right: 1rem;
}
</style>
