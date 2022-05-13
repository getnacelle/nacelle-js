import { Storefront } from '@nacelle/storefront-sdk';

export default new Storefront({
  storefrontEndpoint: process.env.NEXT_PUBLIC_NACELLE_STOREFRONT_ENDPOINT,
  token: process.env.NEXT_PUBLIC_NACELLE_STOREFRONT_TOKEN,
  locale: process.env.NEXT_PUBLIC_NACELLE_STOREFRONT_LOCALE,
  subscriptionEndpoint: process.env.NEXT_PUBLIC_NACELLE_SUBSCRIPTION_ENDPOINT,
  subscriptionToken: process.env.NEXT_PUBLIC_NACELLE_SUBSCRIPTION_TOKEN
});
