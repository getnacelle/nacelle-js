import * as React from 'react';
import Header from '../Header/Header';
import Nav from 'components/Nav/Nav';
import Cart from 'components/Cart/Cart';
import Newsletter from '../Newsletter/Newsletter';
import Footer from '../Footer/Footer';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Nav />
      <Cart />
      {children}
      <Newsletter />
      <Footer />
    </>
  );
};

export default Layout;
