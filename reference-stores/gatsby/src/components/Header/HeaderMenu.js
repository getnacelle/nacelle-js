import React from 'react';
import { useUi } from 'hooks/useUi';
import menuIcon from 'assets/svgs/menu';

const HeaderMenu = () => {
  const { navVisible, setNavVisible } = useUi();

  return (
    <button
      type="button"
      className="bg-white p-2 rounded-md text-gray-400 lg:hidden"
      onClick={() => setNavVisible(!navVisible)}
    >
      <span className="sr-only">Open menu</span>
      <span
        className="flex h-6 w-6 text-gray-400"
        dangerouslySetInnerHTML={{ __html: menuIcon }}
      />
    </button>
  );
};

export default HeaderMenu;