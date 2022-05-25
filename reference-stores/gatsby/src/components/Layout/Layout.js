import * as React from 'react';
import Header from '../Header/Header';
import Nav from 'components/Nav/Nav';
import Newsletter from '../Newsletter/Newsletter';
import Footer from '../Footer/Footer';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Nav />
      {children}
      <Newsletter />
      <Footer />
    </>
  );
};

export default Layout;
