import mutations, { CheckoutCreateData } from '~/graphql/mutations';

import { buildCheckout, handleShopifyError } from '~/utils';

import {
  CartItem,
  ShopifyCheckout,
  Attribute,
  GqlClient
} from '~/checkout-client.types';

export interface CreateCheckoutParams {
  gqlClient: GqlClient;
  lineItems: CartItem[];
  customAttributes?: Attribute[];
  note?: string;
}

export default async function createCheckout({
  gqlClient,
  customAttributes,
  lineItems,
  note
}: CreateCheckoutParams): Promise<ShopifyCheckout | void> {
  const query = mutations.checkoutCreate;
  const variables = { input: { customAttributes, lineItems, note } };

  try {
    const { data, errors } = await gqlClient<CheckoutCreateData>({
      query,
      variables
    });

    if (errors) {
      handleShopifyError(errors);
    }

    if (data?.checkoutCreate.checkout) {
      return buildCheckout(data.checkoutCreate.checkout);
    }
  } catch (err) {
    throw new Error(String(err));
  }
}
