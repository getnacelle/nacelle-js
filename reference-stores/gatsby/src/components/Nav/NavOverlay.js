import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { useUi } from 'hooks/useUi';
import * as styles from './NavOverlay.module.css';

const NavOverlay = () => {
  const { navVisible, setNavVisible } = useUi();

  return (
    <CSSTransition
      in={navVisible}
      timeout={0}
      classNames={{
        enterActive: styles.enterActive,
        exitActive: styles.exitActive,
        enter: styles.enter,
        exit: styles.exit
      }}
    >
      <div
        className="fixed inset-0 bg-black bg-opacity-25 ease-linear duration-300"
        aria-hidden="true"
        onClick={() => setNavVisible(false)}
      />
    </CSSTransition>
  );
};

export default NavOverlay;
