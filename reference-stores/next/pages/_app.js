import App from 'next/app';
import Layout from 'components/Layout/Layout';
import { nacelleClient } from 'services';
import { SITE_QUERY } from 'queries/site';
import 'assets/css/main.css';

const MyApp = ({ Component, pageProps, components }) => {
  return (
    <Layout components={components}>
      <Component {...pageProps} />
    </Layout>
  )
}

MyApp.getInitialProps = async (appContext) => {
  const data = await nacelleClient.query({ query: SITE_QUERY })
  const { space, products, ...rest } = data;
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps, space, products, components: rest };
};

export default MyApp
