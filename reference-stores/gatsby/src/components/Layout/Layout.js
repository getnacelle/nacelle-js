import * as React from 'react';
import Header from '../Header/Header';
import Nav from 'components/Nav/Nav';
import Cart from 'components/Cart/Cart';
import Newsletter from '../Newsletter/Newsletter';
import Footer from '../Footer/Footer';
import ErrorModal from '../Error/ErrorModal'

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Nav />
      <Cart />
      {children}
      <Newsletter />
      <Footer />
      <ErrorModal />
    </>
  );
};

export default Layout;
