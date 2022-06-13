<script>
  import { cartCount, cartSubtotal } from '~/stores/cart'
</script>

<div class="cart">
  <h1 class="cart__heading">Cart</h1>
  {#if $cartCount}
    <div class="cart__contents">
      <ul class="cart__items">
        <!-- <li
          :key="lineItem.id"
          class="cart__item"
        >
          <div class="cart__item-media">
            <nuxt-img
              v-if="lineItem.variant.featuredMedia"
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
              <strong>Quantity:</strong> {{ lineItem.quantity }}
            </p>
            <button
              class="cart__item-action"
              @click="decrementItem(lineItem.id)"
            >
              -
            </button>
            <button
              class="cart__item-action"
              @click="incrementItem(lineItem.id)"
            >
              +
            </button>
            <button class="cart__item-action" @click="removeItem(lineItem.id)">
              Remove
            </button>
          </div>
        </li> -->
      </ul>
      <p class="cart__subtotal">
        <strong>Subtotal:</strong> {$cartSubtotal}
      </p>
      <!-- <button class="cart__action" @click="clearCart">Clear Cart</button> -->
      <!-- <button class="cart__action" @click="processCheckout">
        Proceed To Checkout
      </button> -->
    </div>
  {:else}
    <h2 class="cart__empty">Empty Cart</h2>
  {/if}
</div>

<style lang=scss>
  .cart__item {
    display: flex;
    margin-bottom: 10px;
  }
  .cart__item-image {
    margin-right: 10px;
  }
  .cart__item-title {
    margin: 0 0 10px;
  }
  .cart__item-subtitle,
  .cart__item-price {
    margin: 5px 0;
  }
  </style>