import { CSSTransition } from 'react-transition-group';
import { useCart } from 'hooks/useCart';

const CartOverlay = () => {
  const { cartVisible, setCartVisible } = useCart();

  return (
    <CSSTransition in={cartVisible} timeout={0} classNames="fade">
      <div
        className="fixed inset-0 bg-black bg-opacity-25 CSSTransition-opacity ease-linear duration-300"
        aria-hidden="true"
        onClick={() => setCartVisible(false)}
      >
        <style jsx>{`
          .fade-enter-active,
          .fade-exit-active {
            opacity: 1;
          }
          .fade-enter,
          .fade-exit {
            opacity: 0;
          }
        `}</style>
      </div>
    </CSSTransition>
  );
};

export default CartOverlay;
