import { Storefront } from '@nacelle/storefront-sdk';

export default (context, inject) => {
  const client = new Storefront(context.$config.nacelle);
  inject('nacelle', client);
};
