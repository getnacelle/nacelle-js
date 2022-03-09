import { Storefront } from '@nacelle/storefront-sdk';

export default (context, inject) => {
  const oldClient = new Storefront(context.$config.nacelleOld);
  inject('nacelleOld', oldClient);

  const client = new Storefront(context.$config.nacelle);
  inject('nacelle', client);
};
