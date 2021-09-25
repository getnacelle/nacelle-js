import { buildCheckout, handleShopifyError } from '~/utils';
import {
  checkoutAttributesUpdate as checkoutAttributesUpdateMutation,
  CheckoutAttributesUpdateData
} from '~/graphql/mutations';
import { ShopifyCheckout, Attribute, GqlClient } from '~/checkout-client.types';

export interface CheckoutAttributesUpdateParams {
  gqlClient: GqlClient;
  checkoutId: string;
  customAttributes?: Attribute[];
  note?: string;
}

export type CheckoutUpdateVariables = Pick<
  CheckoutAttributesUpdateParams,
  'checkoutId'
> & {
  input: Pick<CheckoutAttributesUpdateParams, 'customAttributes' | 'note'>;
};

export default async function checkoutAttributesUpdate({
  gqlClient,
  checkoutId,
  customAttributes,
  note
}: CheckoutAttributesUpdateParams): Promise<ShopifyCheckout | void> {
  const query = checkoutAttributesUpdateMutation;
  const variables = {
    checkoutId,
    input: {
      customAttributes,
      note
    }
  };

  const { data, errors } = await gqlClient<
    CheckoutUpdateVariables,
    CheckoutAttributesUpdateData
  >({
    query,
    variables
  }).catch((err) => {
    throw new Error(err);
  });

  const errs = errors || data?.checkoutAttributesUpdateV2.checkoutUserErrors;

  if (errs?.length) {
    handleShopifyError(errs, { caller: 'checkoutAttributesUpdate' });
  }

  if (data) {
    return buildCheckout(data.checkoutAttributesUpdateV2.checkout);
  }
}