import Image from 'next/image';
import { useCart } from 'hooks/useCart';
import styles from 'styles/Cart.module.css';

function Cart() {
  const {
    cartItems,
    cartCount,
    cartSubtotal,
    isLoading,
    incrementItem,
    decrementItem,
    removeItem,
    clearCart,
    checkout
  } = useCart();

  return (
    <div>
      <h1>Cart</h1>
      {cartCount > 0 && (
        <div>
          <ul>
            {cartItems.map((lineItem, index) => (
              <li
                className={styles.item}
                key={`${lineItem.variant.id}-${index}`}
              >
                <div className={styles.image}>
                  <Image
                    src={lineItem.variant.featuredMedia.src}
                    alt={lineItem.variant.featuredMedia.altText}
                    width={200}
                    height={200}
                  />
                </div>
                <div>
                  <h2 className={styles.title}>{lineItem.title}</h2>
                  <p className={styles.subtitle}>{lineItem.variantTitle}</p>
                  <p className={styles.price}>${lineItem.variant.price}</p>
                  <p>
                    <strong>Quantity:</strong> {lineItem.quantity}
                  </p>
                  <button onClick={() => decrementItem(lineItem.cartLineId)}>
                    -
                  </button>
                  <button onClick={() => incrementItem(lineItem.cartLineId)}>
                    +
                  </button>
                  <button onClick={() => removeItem(lineItem.cartLineId)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <p>
            <strong>Subtotal:</strong> ${cartSubtotal}
          </p>
          <button onClick={clearCart}>Clear Cart</button>
          <button onClick={checkout}>Proceed to Checkout</button>
        </div>
      )}
      {isLoading && <h2>Loading...</h2>}
      {!cartCount && !isLoading && <h2>Empty Cart</h2>}
    </div>
  );
}

export default Cart;
