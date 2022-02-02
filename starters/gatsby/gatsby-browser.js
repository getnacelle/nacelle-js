import * as React from 'react';
import { CartProvider, CheckoutProvider } from '@nacelle/react-hooks';
import createShopifyCheckoutClient from '@nacelle/shopify-checkout';
import Layout from './src/components/Layout';
import './src/styles/globals.css';

const checkoutClient = createShopifyCheckoutClient({
  myshopifyDomain: process.env.GATSBY_MYSHOPIFY_DOMAIN,
  storefrontCheckoutToken: process.env.GATSBY_SHOPIFY_STOREFRONT_CHECKOUT_TOKEN,
  storefrontApiVersion: process.env.GATSBY_SHOPIFY_STOREFRONT_API_VERSION
});

export const wrapPageElement = ({ element, props }) => (
  <Layout {...props}>{element}</Layout>
);

export const wrapRootElement = ({ element }) => (
  <CartProvider>
    <CheckoutProvider checkoutClient={checkoutClient}>
      {element}
    </CheckoutProvider>
  </CartProvider>
);
