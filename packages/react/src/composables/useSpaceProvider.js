import React, { createContext } from 'react';

const SpaceContext = createContext(null);

export default ({
  // config,
  space,
  // sdk,
  children
}) => {
  return (
    <SpaceContext.Provider value={space}>{children}</SpaceContext.Provider>
  );
};
