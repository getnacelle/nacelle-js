import mutations, { CheckoutAttributesUpdateData } from '~/graphql/mutations';

import {
  buildCheckout,
  checkoutDoesNotExist,
  handleShopifyError
} from '~/utils';

import { ShopifyCheckout, Attribute, GqlClient } from '~/checkout-client.types';

export interface CheckoutAttributesUpdateParams {
  gqlClient: GqlClient;
  checkoutId: string;
  customAttributes?: Attribute[];
  note?: string;
}

export default async function checkoutAttributesUpdate({
  gqlClient,
  checkoutId,
  customAttributes,
  note
}: CheckoutAttributesUpdateParams): Promise<ShopifyCheckout | void> {
  const query = mutations.checkoutAttributesUpdate;
  const variables = {
    input: {
      customAttributes,
      note
    },
    checkoutId
  };

  const { data, errors } = await gqlClient<CheckoutAttributesUpdateData>({
    query,
    variables
  });

  const errs = errors || data?.checkoutAttributesUpdateV2.checkoutUserErrors;

  if (errs && checkoutDoesNotExist(errs)) {
    console.info(
      'Checkout does not exist when checkoutAttributesUpdate is called; creating new checkout.'
    );

    return;
  }

  handleShopifyError(errs, { caller: checkoutAttributesUpdate.name });

  if (data) {
    return buildCheckout(data.checkoutAttributesUpdateV2.checkout);
  }
}
