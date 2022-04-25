import { createContext, useState } from 'react';

export const UiContext = createContext({});

export const UiProvider = ({ children }) => {
  const [navVisible, setNavVisible] = useState(false);

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
