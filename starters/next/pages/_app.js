import { CartProvider, CheckoutProvider } from '@nacelle/react-hooks';
import createShopifyCheckoutClient from '@nacelle/shopify-checkout';
import Layout from 'components/Layout';
import '../styles/globals.css';

function NextStarter({ Component, pageProps }) {
  const checkoutClient = createShopifyCheckoutClient({
    myshopifyDomain: process.env.NEXT_PUBLIC_MYSHOPIFY_DOMAIN,
    storefrontCheckoutToken:
      process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_CHECKOUT_TOKEN,
    storefrontApiVersion: process.env.NEXT_PUBLIC_STOREFRONT_API_VERSION
  });

  return (
    <CartProvider>
      <CheckoutProvider checkoutClient={checkoutClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CheckoutProvider>
    </CartProvider>
  );
}

export default NextStarter;
