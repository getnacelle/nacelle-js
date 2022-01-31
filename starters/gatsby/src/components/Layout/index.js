import React, { useEffect } from 'react';
import { useCart, useCheckout } from '@nacelle/react-hooks';

// This component utilizes `useCart` and `useCheckout` hooks from
// `@nacelle/react-hooks` to clear cart and checkout data if the
// checkout is completed.
// https://github.com/getnacelle/nacelle-react/tree/main/packages/react-hooks

export default function Layout({ children }) {
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
