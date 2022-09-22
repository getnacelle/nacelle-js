<template>
  <div class="cart">
    <h1 class="cart__heading">Cart</h1>
    <div v-show="cartCount" class="cart__contents">
      <ul class="cart__items">
        <li
          v-for="lineItem in cart.lineItems"
          :key="lineItem.variantId"
          class="cart__item"
        >
          <div class="cart__item-media">
            <nuxt-img
              v-if="lineItem.featuredMedia"
              :src="lineItem.featuredMedia.thumbnailSrc"
              :alt="lineItem.featuredMedia.altText"
              class="cart__item-image"
            />
          </div>
          <div class="cart__item-main">
            <h2 class="cart__item-title">
              {{ lineItem.title }}
            </h2>
            <p class="cart__item-subtitle">{{ lineItem.title }}</p>
            <p class="cart__item-price">${{ lineItem.price }}</p>
            <p class="cart__item-quantity">
              <strong>Quantity:</strong> {{ lineItem.quantity }}
            </p>
            <button
              class="cart__item-action"
              @click="decrementItem(lineItem.cartLineId)"
            >
              -
            </button>
            <button
              class="cart__item-action"
              @click="incrementItem(lineItem.cartLineId)"
            >
              +
            </button>
            <button
              class="cart__item-action"
              @click="removeItem(lineItem.cartLineId)"
            >
              Remove
            </button>
          </div>
        </li>
      </ul>
      <p class="cart__subtotal">
        <strong>Subtotal:</strong> ${{ cartSubtotal }}
      </p>
      <button class="cart__action" @click="clearCart">Clear Cart</button>
      <button class="cart__action" @click="checkout">
        Proceed To Checkout
      </button>
    </div>
    <h2 v-show="cart.isLoading" class="cart__empty">Loading...</h2>
    <h2 v-show="!cartCount && !cart.isLoading" class="cart__empty">
      Empty Cart
    </h2>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'CartPage',
  computed: {
    ...mapState(['cart']),
    ...mapGetters('cart', ['cartCount', 'cartSubtotal'])
  },
  methods: {
    ...mapActions('cart', [
      'checkout',
      'removeItem',
      'incrementItem',
      'decrementItem',
      'clearCart'
    ])
  }
};
</script>

<style lang="scss" scoped>
.cart__item {
  display: flex;
  margin-bottom: 10px;
}
.cart__item-image {
  margin-right: 10px;
  max-height: 200px;
}
.cart__item-title {
  margin: 0 0 10px;
}
.cart__item-subtitle,
.cart__item-price {
  margin: 5px 0;
}
</style>
