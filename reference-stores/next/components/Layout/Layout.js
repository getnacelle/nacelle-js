import Header from 'components/Header/Header';
import Nav from 'components/Nav/Nav';
import Cart from 'components/Cart/Cart';
import Newsletter from 'components/Newsletter/Newsletter';
import Footer from 'components/Footer/Footer';
import ErrorModal from 'components/Error/ErrorModal';

const Layout = ({ children, components }) => {
  return (
    <>
      <Header content={components.header.edges.at(0)?.node} />
      <Nav content={components.header.edges.at(0)?.node} />
      <Cart content={components.cart.edges.at(0)?.node} />
      {children}
      <Newsletter content={components.newsletter.edges.at(0)?.node} />
      <Footer content={components.footer.edges.at(0)?.node} />
      <ErrorModal />
    </>
  );
};

export default Layout;
