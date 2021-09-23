import { buildCheckout, handleShopifyError } from '~/utils';
import {
  checkoutCreate as checkoutCreateMutation,
  CheckoutCreateData
} from '~/graphql/mutations';

import { PutCheckoutParams, ShopifyCheckout } from '~/checkout-client.types';

export type CreateCheckoutParams = Pick<
  PutCheckoutParams,
  'lineItems' | 'gqlClient' | 'customAttributes' | 'note' | 'queueToken'
>;

export default async function createCheckout({
  gqlClient,
  customAttributes,
  lineItems,
  note
}: CreateCheckoutParams): Promise<ShopifyCheckout | void> {
  const query = checkoutCreateMutation;
  const variables = { input: { customAttributes, lineItems, note } };

  try {
    const { data, errors } = await gqlClient<CheckoutCreateData>({
      query,
      variables
    });

    if (errors) {
      handleShopifyError(errors, { caller: 'checkoutCreate' });
    }

    if (data?.checkoutCreate.checkout) {
      return buildCheckout(data.checkoutCreate.checkout);
    }
  } catch (err) {
    throw new Error(String(err));
  }
}
