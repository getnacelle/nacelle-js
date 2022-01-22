import Image from 'next/image';
import { useCart, useCheckout } from '@nacelle/react-hooks';
import styles from 'styles/Cart.module.css';

function Cart() {
  const [
    { cart },
    { incrementItem, decrementItem, removeFromCart, clearCart }
  ] = useCart();
  const [, { processCheckout }] = useCheckout();

  const cartSubtotal = cart.reduce((sum, lineItem) => {
    return sum + lineItem.variant.price * lineItem.quantity;
  }, 0);

  const handleProcessCheckout = async () => {
    const cartItems = cart.map((lineItem) => ({
      variantId: `gid://shopify/ProductVariant/${lineItem.variant.id}`,
      quantity: lineItem.quantity
    }));
    await processCheckout({ cartItems })
      .then(({ url, completed }) => {
        if (url && !completed) {
          window.location = url;
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

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
                <div>
                  <Image
                    src={lineItem.variant.featuredMedia.src}
                    alt={lineItem.variant.featuredMedia.altText}
                    width={200}
                    height={200}
                    className={styles.itemImage}
                  />
                </div>
                <div>
                  <h2 className={styles.itemTitle}>
                    {lineItem.variant.productTitle}
                  </h2>
                  <p className={styles.itemSubtitle}>
                    {lineItem.variant.title}
                  </p>
                  <p className={styles.itemPrice}>${lineItem.variant.price}</p>
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
