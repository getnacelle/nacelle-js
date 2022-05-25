import * as React from 'react';
import Layout from './src/components/Layout/Layout';
import { CartProvider } from './src/context/Cart';
import { SearchProvider } from './src/context/Search';
import { UiProvider } from './src/context/Ui';
import './src/assets/css/main.css';

export const wrapPageElement = ({ element, props }) => (
  <Layout {...props}>{element}</Layout>
);

export const wrapRootElement = ({ element }) => (
  <CartProvider>
    <SearchProvider>
      <UiProvider>{element}</UiProvider>
    </SearchProvider>
  </CartProvider>
);
