import React, { createContext, useState, useEffect } from 'react';
import { globalHistory } from '@reach/router';

export const UiContext = createContext({});

export const UiProvider = ({ children }) => {
  const [navVisible, setNavVisible] = useState(false);

  useEffect(() => {
    return globalHistory.listen(({ action }) => {
      if (action === 'PUSH') setNavVisible(false);
    });
  }, [setNavVisible]);

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
