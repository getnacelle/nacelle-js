import Image from 'next/image';
import styles from 'styles/Cart.module.css';

const cart = [];

function Cart() {
  return (
    <div>
      <h1>Cart</h1>
      {cart.length ? (
        <div>
          <ul>
            {cart.map((lineItem, index) => (
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
                  <h2 className={styles.title}>
                    {lineItem.variant.productTitle}
                  </h2>
                  <p className={styles.subtitle}>{lineItem.variant.title}</p>
                  <p className={styles.price}>${lineItem.variant.price}</p>
                  <p>
                    <strong>Quantity:</strong> {lineItem.quantity}
                  </p>
                  <button onClick={() => decrementItem(lineItem)}>-</button>
                  <button onClick={() => incrementItem(lineItem)}>+</button>
                  <button onClick={() => removeFromCart(lineItem)}>
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
          <button onClick={handleProcessCheckout}>Proceed to Checkout</button>
        </div>
      ) : (
        <h2>Empty Cart</h2>
      )}
    </div>
  );
}

export default Cart;
