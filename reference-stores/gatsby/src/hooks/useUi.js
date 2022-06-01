import { useContext } from 'react';
import { UiContext } from 'context/Ui';

export const useUi = () => {
  const { navVisible, setNavVisible } = useContext(UiContext);

  return {
    navVisible,
    setNavVisible
  };
};
