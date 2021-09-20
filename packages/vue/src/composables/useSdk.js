import NacelleClient from '@nacelle/client-js-sdk';

export default function useSdk({ config }) {
  return new NacelleClient({
    ...config,
    useStatic: false
  });
}
