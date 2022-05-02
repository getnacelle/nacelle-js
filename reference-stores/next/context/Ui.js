import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export const UiContext = createContext({});

export const UiProvider = ({ children }) => {
  const [navVisible, setNavVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setNavVisible(false);
  }, [router.asPath]);

  return (
    <UiContext.Provider
      value={{
        navVisible,
        setNavVisible
      }}
    >
      {children}
    </UiContext.Provider>
  );
};
