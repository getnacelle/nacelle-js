import App from 'next/app';
import Head from 'components/Head/Head';
import { SearchProvider } from 'context/Search';
import { UiProvider } from 'context/Ui';
import Layout from 'components/Layout/Layout';
import { nacelleClient } from 'services';

import { SITE_QUERY } from 'queries/site';
import 'assets/css/main.css';

const MyApp = ({ Component, pageProps, products, components }) => {
  return (
    // Todo: add in Cart Provider
    <>
      <Head />
      <SearchProvider catalog={products}>
        <UiProvider>
          <Layout components={components}>
            <Component {...pageProps} />
          </Layout>
        </UiProvider>
      </SearchProvider>
    </>
  );
};

MyApp.getInitialProps = async (appContext) => {
  const data = await nacelleClient.query({ query: SITE_QUERY });
  const { space, products, ...rest } = data;
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps, space, products, components: rest };
};

export default MyApp;
