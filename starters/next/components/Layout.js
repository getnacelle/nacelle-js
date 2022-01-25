import { useCart, useCheckout } from '@nacelle/react-hooks';
import { useEffect } from 'react';

// This component utilizes `useCart` and `useCheckout` hooks from
// `@nacelle/react-hooks` to clear cart and checkout data if the
// checkout is completed.
// https://github.com/getnacelle/nacelle-react/tree/main/packages/react-hooks

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
