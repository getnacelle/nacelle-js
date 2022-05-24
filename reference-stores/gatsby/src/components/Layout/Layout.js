import * as React from 'react';
import Header from '../Header/Header';
import Newsletter from '../Newsletter/Newsletter';
import Footer from '../Footer/Footer';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Newsletter />
      <Footer />
    </>
  );
};

export default Layout;
