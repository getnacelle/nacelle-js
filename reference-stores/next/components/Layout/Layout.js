import { Fragment } from 'react';

import Header from 'components/Header/Header';
import Nav from 'components/Nav/Nav';
import Newsletter from 'components/Newsletter/Newsletter';
import Footer from 'components/Footer/Footer';

const Layout = ({ children, components }) => {
  return (
    <Fragment>
      <Header content={components.header[0]} />
      <Nav content={components.header[0]} />
      {children}
      <Newsletter content={components.newsletter[0]} />
      <Footer content={components.footer[0]} />
    </Fragment>
  );
};

export default Layout;
