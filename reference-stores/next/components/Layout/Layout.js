import Header from 'components/Header/Header';
import Nav from 'components/Nav/Nav';
import Cart from 'components/Cart/Cart';
import Newsletter from 'components/Newsletter/Newsletter';
import Footer from 'components/Footer/Footer';
import ErrorModal from 'components/Error/ErrorModal';

const Layout = ({ children, components }) => {
  return (
    <>
      <Header content={components.header[0]} />
      <Nav content={components.header[0]} />
      <Cart content={components.cart[0]} />
      {children}
      <Newsletter content={components.newsletter[0]} />
      <Footer content={components.footer[0]} />
      <ErrorModal />
    </>
  );
};

export default Layout;
