import React from 'react';
import HeaderQuery from 'queries/components/header';
import { useUi } from 'hooks/useUi';
import NavOverlay from './NavOverlay';
import NavDrawer from './NavDrawer';

const Nav = () => {
  const { content } = HeaderQuery();
  const { navVisible } = useUi();

  return (
    content && (
      <div className="bg-white">
        <div
          className={`fixed inset-0 flex z-40 lg:hidden ${
            !navVisible && 'hidden'
          }`}
          role="dialog"
          aria-modal="true"
        >
          <NavOverlay />
          <NavDrawer content={content.remoteFields} />
        </div>
      </div>
    )
  );
};

export default Nav;
