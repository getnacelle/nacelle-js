<template>
  <div class="cart">
    <h1 class="cart__heading">Your Cart</h1>
    <div v-if="cartCount" class="cart__contents">
      <ul class="cart__items">
        <li
          v-for="lineItem in cart.lineItems"
          :key="lineItem.id"
          class="cart__item"
        >
          <div v-if="lineItem.variant.featuredMedia" class="cart__item-media">
            <img
              :src="lineItem.variant.featuredMedia.thumbnailSrc"
              :alt="lineItem.variant.featuredMedia.altText"
              class="cart__item-image"
            />
          </div>
          <div class="cart__item-main">
            <h2 class="cart__item-title">
              {{ lineItem.variant.productTitle }}
            </h2>
            <p class="cart__item-subtitle">{{ lineItem.variant.title }}</p>
            <p class="cart__item-price">${{ lineItem.variant.price }}</p>
            <p class="cart__item-quantity">
              <b>Quantity:</b> {{ lineItem.quantity }}
            </p>
            <button
              class="cart__item-action"
              :aria-label="`Add 1 ${lineItem.variant.title}`"
              type="button"
              @click="incrementCartItemQuantity(lineItem.id)"
            >
              +
            </button>
            <button
              class="cart__item-action"
              :aria-label="`Remove 1 ${lineItem.variant.title}`"
              type="button"
              @click="decrementCartItemQuantity(lineItem.id)"
            >
              -
            </button>
            <button
              class="cart__item-action"
              type="button"
              @click="removeItemFromCart(lineItem.id)"
            >
              Remove
              <span class="visually-hidden">{{
                lineItem.variant.productTitle
              }}</span>
            </button>
          </div>
        </li>
      </ul>
      <p class="cart__subtotal"><b>Subtotal:</b> ${{ cart.subtotal }}</p>
      <button class="cart__action" @click="clearCart">Clear Cart</button>
      <button class="cart__action" @click="processCheckout">
        Proceed To Checkout
      </button>
    </div>
    <p v-else class="cart__empty-state">There's nothing in your cart</p>
  </div>
</template>
<script setup>
import {
  decrementCartItemQuantity,
  incrementCartItemQuantity,
  clearCart,
  removeItemFromCart,
  processCheckout
} from '#imports';
const cart = useCart();
const cartCount = computed(() => cart.lineItems.length);
</script>
<style>
.cart__empty-state {
  font-size: 1.5rem;
}
</style>
