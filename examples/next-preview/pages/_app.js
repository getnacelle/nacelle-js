import '../styles/globals.css';

function AppContainer({ Component, pageProps }) {
  return (
    <div>
      <Component {...pageProps} />
    </div>
  );
}

export default AppContainer;
