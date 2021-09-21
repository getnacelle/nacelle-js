import { BuildCheckoutParams, ShopifyCheckout } from '~/checkout-client.types';

export default function buildCheckout({
  id,
  webUrl,
  customAttributes,
  note
}: BuildCheckoutParams): ShopifyCheckout {
  return {
    id,
    webUrl,
    customAttributes,
    note,
    completed: false
  };
}
