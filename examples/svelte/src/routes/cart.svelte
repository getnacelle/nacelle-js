<script>
import { 
  lineItems, 
  cartCount, 
  cartSubtotal,
  removeItem,
  incrementItem,
  decrementItem,
  clearCart
} from '~/stores/cart'
import { 
  processCheckout
} from '~/stores/checkout'
</script>

<div class="cart">
  <h1 class="cart__heading">Cart</h1>
  {#if $cartCount}
    <div class="cart__contents">
      <ul class="cart__items">
        {#each $lineItems as lineItem (lineItem.id)}
          <li
            class="cart__item"
          >
            <div class="cart__item-media">
              {#if lineItem.variant.featuredMedia}
                <img
                  src={lineItem.variant.featuredMedia.thumbnailSrc}
                  alt={lineItem.variant.featuredMedia.altText}
                  class="cart__item-image"
                />
              {/if}
            </div>
            <div class="cart__item-main">
              <h2 class="cart__item-title">
                {lineItem.variant.productTitle}
              </h2>
              <p class="cart__item-subtitle">{lineItem.variant.title}</p>
              <p class="cart__item-price">${lineItem.variant.price}</p>
              <p class="cart__item-quantity">
                <strong>Quantity:</strong> {lineItem.quantity}
              </p>
              <button
                class="cart__item-action"
                on:click={decrementItem(lineItem.id)}
              >
                -
              </button>
              <button
                class="cart__item-action"
                on:click={incrementItem(lineItem.id)}
              >
                +
              </button>
              <button 
                class="cart__item-action" 
                on:click={removeItem(lineItem.id)}
              >
                Remove
              </button>
            </div>
          </li>
        {/each}
      </ul>
      <p class="cart__subtotal">
        <strong>Subtotal:</strong> ${$cartSubtotal}
      </p>
      <button class="cart__action" on:click={clearCart}>Clear Cart</button>
      <button class="cart__action" on:click={processCheckout}>
        Proceed To Checkout
      </button>
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