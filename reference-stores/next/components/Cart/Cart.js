import { CSSTransition } from 'react-transition-group';
import { useCart } from 'hooks/useCart';
import CartOverlay from './CartOverlay';
import CartDrawer from './CartDrawer';

const Cart = ({ content }) => {
  const { cartVisible } = useCart();

  return (
    content && (
      <div
        className={`
          fixed inset-0 overflow-hidden z-40
          ${!cartVisible && 'hidden'}
        `}
        aria-labelledby="slide-over-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="absolute inset-0 overflow-hidden">
          <CartOverlay />
          <CartDrawer content={content} />
        </div>
      </div>
    )
  );
};

export default Cart;
