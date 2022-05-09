import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export const UiContext = createContext({});

export const UiProvider = ({ children }) => {
  const [navVisible, setNavVisible] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setNavVisible(false);
    setCartVisible(false);
  }, [router.asPath]);

  return (
    <UiContext.Provider
      value={{
        navVisible,
        cartVisible,
        setNavVisible,
        setCartVisible
      }}
    >
      {children}
    </UiContext.Provider>
  );
};
