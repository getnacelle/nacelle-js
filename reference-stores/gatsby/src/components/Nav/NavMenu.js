import React from 'react';
import { Link } from 'gatsby';

const NavMenu = ({ content }) => {
  const links = content?.navigation?.filter((navigationItem) => {
    return navigationItem.type === 'partNavigationLink';
  });

  return (
    links && (
      <div className="border-t border-gray-200 py-6 px-4 space-y-6">
        {links.map((link, index) => (
          <div className="flow-root" key={index}>
            <Link
              className="-m-2 p-2 block font-medium text-gray-900"
              to={link.remoteFields.url}
            >
              {link.remoteFields.text}
            </Link>
          </div>
        ))}
      </div>
    )
  );
};

export default NavMenu;
