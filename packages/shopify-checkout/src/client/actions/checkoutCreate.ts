import { buildCheckout, handleShopifyError } from '~/utils';
import {
  checkoutCreate as checkoutCreateMutation,
  CheckoutCreateData
} from '~/graphql/mutations';

import { ShopifyCheckout } from '~/checkout-client.types';
import { PutCheckoutParams } from '~/client/actions/putCheckout';

export type CreateCheckoutParams = Pick<
  PutCheckoutParams,
  'lineItems' | 'gqlClient' | 'customAttributes' | 'note' | 'queueToken'
>;

export type CheckoutCreateVariables = {
  input: Pick<CreateCheckoutParams, 'customAttributes' | 'lineItems' | 'note'>;
};

export default async function createCheckout({
  gqlClient,
  customAttributes,
  lineItems,
  note
}: CreateCheckoutParams): Promise<ShopifyCheckout | void> {
  const query = checkoutCreateMutation;
  const variables = { input: { customAttributes, lineItems, note } };

  try {
    const { data, errors } = await gqlClient<
      CheckoutCreateVariables,
      CheckoutCreateData
    >({
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
