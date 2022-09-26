import Layout from 'components/Layout';
import '../styles/globals.css';

function AppContainer({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default AppContainer;
