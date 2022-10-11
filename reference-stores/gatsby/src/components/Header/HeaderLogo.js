import React from 'react';
import { Link } from "gatsby"
import logoIcon from 'assets/svgs/logo';

const HeaderLogo = () => {
  return (
    <div className="absolute flex lg:relative">
      <Link to="/">
        <span className="sr-only">Workflow</span>
        <span
          className="flex h-8 w-8"
          dangerouslySetInnerHTML={{ __html: logoIcon }}
        />
      </Link>
    </div>
  );
};

export default HeaderLogo;
