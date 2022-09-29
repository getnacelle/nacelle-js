import * as React from 'react';
import { CartProvider } from './src/context/Cart';
import Layout from './src/components/Layout';
import './src/styles/globals.css';

export const wrapPageElement = ({ element, props }) => (
  <Layout {...props}>{element}</Layout>
);

export const wrapRootElement = ({ element }) => (
  <CartProvider>{element}</CartProvider>
);
