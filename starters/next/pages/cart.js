import Image from 'next/image';
import { useCart } from 'hooks/useCart';
import styles from 'styles/Cart.module.css';

function Cart() {
  const {
    cartItems,
    cartCount,
    cartSubtotal,
    isLoading,
    updateItem,
    removeItem,
    clearCart,
    checkout
  } = useCart();

  const filteredCartItems = cartItems.filter((cartItem) => cartItem.quantity);

  return (
    <div>
      <h1>Cart</h1>
      {cartCount > 0 && (
        <div>
          <ul>
            {filteredCartItems.map((lineItem, index) => (
              <li className={styles.item} key={`${lineItem.id}-${index}`}>
                <div className={styles.image}>
                  <Image
                    src={lineItem.featuredMedia.src}
                    alt={lineItem.featuredMedia.altText}
                    width={200}
                    height={200}
                  />
                </div>
                <div>
                  <h2 className={styles.title}>{lineItem.productTitle}</h2>
                  {lineItem.variantTitle !== 'Default Title' && (
                    <p className={styles.subtitle}>{lineItem.variantTitle}</p>
                  )}
                  <p className={styles.price}>${parseFloat(lineItem.price)}</p>
                  <div>
                    <strong>Quantity:</strong>
                    <select
                      onChange={(e) =>
                        updateItem({
                          id: lineItem.cartLineId,
                          quantity: parseInt(e.target.value)
                        })
                      }
                      value={lineItem.quantity}
                    >
                      {[...Array(10)].map((_, index) => (
                        <option key={index + 1} value={index + 1}>
                          {index + 1}
                        </option>
                      ))}
                      {lineItem.quantity > 10 && (
                        <option value={lineItem.quantity}>
                          {lineItem.quantity}
                        </option>
                      )}
                    </select>
                  </div>
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
