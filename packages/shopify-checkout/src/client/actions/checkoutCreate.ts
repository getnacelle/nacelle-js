import { buildCheckout, handleShopifyError } from '~/utils';
import {
  checkoutCreate as checkoutCreateMutation,
  CheckoutCreateData
} from '~/graphql/mutations';
import {
  Attribute,
  CheckoutItem,
  GqlClient,
  ShopifyCheckout
} from '~/checkout-client.types';

export interface CreateCheckoutParams {
  gqlClient: GqlClient;
  lineItems: CheckoutItem[];
  customAttributes?: Attribute[];
  note?: string;
  queueToken?: string;
}

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
    }).catch((err) => {
      throw new Error(err);
    });

    const errs = errors || data?.checkoutCreate.checkoutUserErrors;

    if (errs?.length) {
      handleShopifyError(errors, { caller: 'checkoutCreate' });
    }

    if (data?.checkoutCreate.checkout) {
      return buildCheckout(data.checkoutCreate.checkout);
    }
  } catch (err) {
    throw new Error(String(err));
  }
}
