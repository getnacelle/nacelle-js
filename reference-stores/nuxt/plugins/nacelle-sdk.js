import { StorefrontClient } from '@nacelle/storefront-sdk';

export default (context, inject) => {
  const client = new StorefrontClient({
    storefrontEndpoint: context.$config.nacelle.storefrontEndpoint
  });

  inject('nacelle', client);
};
