import Image from 'next/image';
import { useCart, useCheckout } from '@nacelle/react-hooks';
import styles from 'styles/Cart.module.css';

function Cart() {
  // A `cart` object, containing the line items of the cart,
  // and various cart methods that can be used to manipulate
  // the line items in the cart, are provided by the
  // `useCart` hook from `@nacelle/react-hooks`.
  // (https://github.com/getnacelle/nacelle-react/tree/main/packages/react-hooks)
  const [
    { cart },
    { incrementItem, decrementItem, removeFromCart, clearCart }
  ] = useCart();

  // The `processCheckout` method, which allows for cart data
  // to be passed to the checkout client, is provided by the
  // `useCheckout` hook from `@nacelle/react-hooks`.
  // (https://github.com/getnacelle/nacelle-react/tree/main/packages/react-hooks)
  const [, { processCheckout }] = useCheckout();

  const cartSubtotal = cart.reduce((sum, lineItem) => {
    return sum + lineItem.variant.price * lineItem.quantity;
  }, 0);

  const handleProcessCheckout = async () => {
    // Maps the cart line items into a new array with Shopify
    // required properties: `variantId` and `quantity`.
    const cartItems = cart.map((lineItem) => ({
      variantId: lineItem.variant.id,
      quantity: lineItem.quantity
    }));

    // `processCheckout` utilizes the Shopify Checkout client to create
    // a checkout using the provided `cartItems` array. If successful,
    // a URL and completed state are returned, which can then be used to
    // redirect the user to the Shopify checkout.
    // (https://github.com/getnacelle/nacelle-js/tree/main/packages/shopify-checkout)
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
