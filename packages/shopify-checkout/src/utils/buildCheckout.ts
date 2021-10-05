import { BuildCheckoutParams, ShopifyCheckout } from '../checkout-client.types';

export default function buildCheckout({
  id,
  webUrl
}: BuildCheckoutParams): ShopifyCheckout {
  return {
    id,
    url: webUrl,
    completed: false
  };
}
