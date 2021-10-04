import {
  checkoutLineItemsReplace as checkoutLineItemsReplaceMutation,
  CheckoutLineItemsReplaceData
} from '../../graphql/mutations';
import { buildCheckout, handleShopifyError } from '../../utils';
import {
  CheckoutItem,
  ShopifyCheckout,
  GqlClient
} from '../../checkout-client.types';

export interface CheckoutLineItemsReplaceParams {
  gqlClient: GqlClient;
  /**
   * a Shopify checkout ID.
   */
  id: string;
  lineItems: CheckoutItem[];
}

export type CheckoutLineItemsReplaceVariables = Pick<
  CheckoutLineItemsReplaceParams,
  'lineItems'
> & { checkoutId: CheckoutLineItemsReplaceParams['id'] };

export default async function checkoutLineItemsReplace({
  gqlClient,
  lineItems,
  id
}: CheckoutLineItemsReplaceParams): Promise<ShopifyCheckout | void> {
  const query = checkoutLineItemsReplaceMutation;
  const variables = { checkoutId: id, lineItems };
  const { data, errors } = await gqlClient<
    CheckoutLineItemsReplaceVariables,
    CheckoutLineItemsReplaceData
  >({ query, variables }).catch((err) => {
    throw new Error(err);
  });

  const errs = errors || data?.checkoutLineItemsReplace.userErrors;

  if (errs?.length) {
    handleShopifyError(errs, { caller: 'checkoutLineItemsReplace' });
  }

  if (data?.checkoutLineItemsReplace.checkout) {
    return buildCheckout(data.checkoutLineItemsReplace.checkout);
  }
}
