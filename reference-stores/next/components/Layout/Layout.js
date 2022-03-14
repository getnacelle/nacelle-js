import { Fragment } from 'react';

import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';

const Layout = ({ children, components }) => {
  return (
    <Fragment>
      <Header content={components.header[0]} />
      {children}
      <Footer content={components.footer[0]} />
    </Fragment>
  );
};

export default Layout;