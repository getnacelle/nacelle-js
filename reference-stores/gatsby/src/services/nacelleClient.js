import { Storefront } from '@nacelle/storefront-sdk';

console.log('p', process.env)

export default new Storefront({
  storefrontEndpoint: process.env.GATSBY_PUBLIC_NACELLE_STOREFRONT_ENDPOINT,
  token: process.env.GATSBY_PUBLIC_NACELLE_STOREFRONT_TOKEN,
  locale: process.env.GATSBY_PUBLIC_NACELLE_STOREFRONT_LOCALE
});
