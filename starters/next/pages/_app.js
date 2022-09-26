import Layout from 'components/Layout';
import { CartProvider } from 'context/Cart';
import '../styles/globals.css';

function AppContainer({ Component, pageProps }) {
  return (
    <CartProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  );
}

export default AppContainer;
