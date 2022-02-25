import { BuildCheckoutParams, ShopifyCheckout } from '../checkout-client.types';

export default function buildCheckout({
  id,
  webUrl,
  lineItems,
  discountApplications
}: BuildCheckoutParams): ShopifyCheckout {
  return {
    id,
    url: webUrl,
    completed: false,
    lines: lineItems.edges.map((edge) => edge.node),
    discounts: discountApplications.edges.map((edge) => edge.node)
  };
}
