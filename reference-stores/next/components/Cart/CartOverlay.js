import { CSSTransition } from 'react-transition-group';
import { useCart } from 'hooks/useCart';
import styles from './CartOverlay.module.css';

const CartOverlay = () => {
  const { cartVisible, setCartVisible } = useCart();

  return (
    <CSSTransition
      in={cartVisible}
      timeout={0}
      classNames={{
        enterActive: styles.enterActive,
        exitActive: styles.exitActive,
        enter: styles.enter,
        exit: styles.exit
      }}
    >
      <div
        className="fixed inset-0 bg-black bg-opacity-25 CSSTransition-opacity ease-linear duration-300"
        aria-hidden="true"
        onClick={() => setCartVisible(false)}
      />
    </CSSTransition>
  );
};

export default CartOverlay;
