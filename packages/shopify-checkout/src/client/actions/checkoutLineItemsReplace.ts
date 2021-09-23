import {
  checkoutLineItemsReplace as checkoutLineItemsReplaceMutation,
  CheckoutLineItemsReplaceData
} from '~/graphql/mutations';
import { buildCheckout, checkoutDoesNotExist } from '~/utils';
import { CartItem, ShopifyCheckout, GqlClient } from '~/checkout-client.types';

export interface CheckoutLineItemsReplaceParams {
  gqlClient: GqlClient;
  checkoutId: string;
  lineItems: CartItem[];
}

export default async function checkoutLineItemsReplace({
  gqlClient,
  lineItems,
  checkoutId
}: CheckoutLineItemsReplaceParams): Promise<ShopifyCheckout | void> {
  const query = checkoutLineItemsReplaceMutation;
  const variables = { checkoutId, lineItems };
  const { data, errors } = await gqlClient<CheckoutLineItemsReplaceData>({
    query,
    variables
  });

  const errs = errors || data?.checkoutLineItemsReplace.userErrors;

  if (errs && checkoutDoesNotExist(errs)) {
    if (data) {
      console.info(
        'Checkout does not exist when checkoutLineItemsReplace is called; creating new checkout.'
      );

      return buildCheckout(data.checkoutLineItemsReplace.checkout);
    }
  }
}
