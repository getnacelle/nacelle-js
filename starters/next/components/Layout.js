import { useCart, useCheckout } from '@nacelle/react-hooks';
import { useEffect } from 'react';

function Layout({ children }) {
  const [, { clearCart }] = useCart();
  const [{ completed }, { clearCheckoutData }] = useCheckout();

  useEffect(() => {
    if (completed) {
      clearCheckoutData();
      clearCart();
    }
  }, [completed, clearCheckoutData, clearCart]);

  return <div>{children}</div>;
}

export default Layout;
