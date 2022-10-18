import App from 'next/app';
import Head from 'components/Head/Head';
import { CartProvider } from 'context/Cart';
import { SearchProvider } from 'context/Search';
import { UiProvider } from 'context/Ui';
import Layout from 'components/Layout/Layout';
import { nacelleClient } from 'services';
import { resolveSiteData } from 'utils/resolvers';

import { SITE_QUERY } from 'queries/site';
import 'assets/css/main.css';

const MyApp = ({ Component, pageProps, products, components }) => {
  return (
    <>
      <Head {...pageProps} />
      <CartProvider>
        <SearchProvider catalog={products.edges.map((product) => product.node)}>
          <UiProvider>
            <Layout components={components}>
              <Component {...pageProps} />
            </Layout>
          </UiProvider>
        </SearchProvider>
      </CartProvider>
    </>
  );
};

MyApp.getInitialProps = async (appContext) => {
  const data = await nacelleClient.query({ query: SITE_QUERY }).then((site) => {
    return resolveSiteData({ client: nacelleClient, site });
  });
  const { space, products, ...rest } = data;
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps, space, products, components: rest };
};

export default MyApp;
