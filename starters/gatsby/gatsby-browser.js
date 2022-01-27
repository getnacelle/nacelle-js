import * as React from "react";
import { CartProvider, CheckoutProvider } from "@nacelle/react-hooks";
import createShopifyCheckoutClient from "@nacelle/shopify-checkout";
import Layout from "./src/components/Layout";
import "./src/styles/globals.css";

const checkoutClient = createShopifyCheckoutClient({
  storefrontCheckoutToken: process.env.GATSBY_SHOPIFY_STOREFRONT_CHECKOUT_TOKEN,
  myshopifyDomain: process.env.GATSBY_MYSHOPIFY_DOMAIN,
  storefrontApiVersion: process.env.GATSBY_STOREFRONT_API_VERSION,
});

export const wrapPageElement = ({ element, props }) => (
  <Layout {...props}>{element}</Layout>
);

export const wrapRootElement = ({ element }) => (
  <CartProvider>
    <CheckoutProvider checkoutClient={checkoutClient}>
      <Layout>{element}</Layout>
    </CheckoutProvider>
  </CartProvider>
);
