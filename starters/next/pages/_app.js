import { CartProvider, CheckoutProvider } from '@nacelle/react-hooks';
import createShopifyCheckoutClient from '@nacelle/shopify-checkout';
import Layout from 'components/Layout';
import '../styles/globals.css';

// The `AppContainer` overrides Next's default `App` component.
// (https://nextjs.org/docs/advanced-features/custom-app)

// The `AppContainer` utilizes `CartProvider` and `CheckoutProvider` from
// `@nacelle/react-hooks` in order to manage cart and checkout data.
// (https://github.com/getnacelle/nacelle-react/tree/main/packages/react-hooks)

// A Shopify Checkout client is created from `@nacelle/shopify-checkout`
// and passed to the `CheckoutProvider`.
// (https://github.com/getnacelle/nacelle-js/tree/main/packages/shopify-checkout)

function AppContainer({ Component, pageProps }) {
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

export default AppContainer;
