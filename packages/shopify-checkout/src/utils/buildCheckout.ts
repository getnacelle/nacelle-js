import { BuildCheckoutParams, ShopifyCheckout } from '~/checkout-client.types';

export default function buildCheckout({
  id,
  webUrl
}: BuildCheckoutParams): ShopifyCheckout {
  return {
    id,
    webUrl,
    completed: false
  };
}
