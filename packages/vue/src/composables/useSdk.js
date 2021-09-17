// import NacelleClient from '@nacelle/client-js-sdk';

class NacelleClient {
  //
}

export default function useSdk({ config }) {
  return new NacelleClient({
    ...config,
    useStatic: false
  });
}
