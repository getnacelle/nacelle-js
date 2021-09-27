import {
  checkoutLineItemsReplace as checkoutLineItemsReplaceMutation,
  CheckoutLineItemsReplaceData
} from '~/graphql/mutations';
import { buildCheckout, handleShopifyError } from '~/utils';
import { CartItem, ShopifyCheckout, GqlClient } from '~/checkout-client.types';

export interface CheckoutLineItemsReplaceParams {
  gqlClient: GqlClient;
  checkoutId: string;
  lineItems: CartItem[];
}

export type CheckoutLineItemsReplaceVariables = Pick<
  CheckoutLineItemsReplaceParams,
  'checkoutId' | 'lineItems'
>;

export default async function checkoutLineItemsReplace({
  gqlClient,
  lineItems,
  checkoutId
}: CheckoutLineItemsReplaceParams): Promise<ShopifyCheckout | void> {
  const query = checkoutLineItemsReplaceMutation;
  const variables = { checkoutId, lineItems };
  const { data, errors } = await gqlClient<
    CheckoutLineItemsReplaceVariables,
    CheckoutLineItemsReplaceData
  >({
    query,
    variables
  }).catch((err) => {
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
