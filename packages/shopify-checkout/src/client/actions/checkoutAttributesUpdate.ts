import { buildCheckout, handleShopifyError } from '../../utils';
import {
  checkoutAttributesUpdate as checkoutAttributesUpdateMutation,
  CheckoutAttributesUpdateData
} from '../../graphql/mutations';
import {
  ShopifyCheckout,
  Attribute,
  GqlClient
} from '../../checkout-client.types';

export interface CheckoutAttributesUpdateParams {
  gqlClient: GqlClient;
  /**
   * a Shopify checkout ID.
   */
  id: string;
  customAttributes?: Attribute[];
  note?: string;
}

export type CheckoutUpdateVariables = {
  checkoutId: CheckoutAttributesUpdateParams['id'];
  input: Pick<CheckoutAttributesUpdateParams, 'customAttributes' | 'note'>;
};

export default async function checkoutAttributesUpdate({
  gqlClient,
  id,
  customAttributes,
  note
}: CheckoutAttributesUpdateParams): Promise<ShopifyCheckout | void> {
  const query = checkoutAttributesUpdateMutation;
  const variables = {
    checkoutId: id,
    input: {
      customAttributes,
      note
    }
  };

  const { data, errors } = await gqlClient<
    CheckoutUpdateVariables,
    CheckoutAttributesUpdateData
  >({ query, variables }).catch((err) => {
    throw new Error(err);
  });

  const errs = errors || data?.checkoutAttributesUpdateV2.checkoutUserErrors;

  if (errs?.length) {
    handleShopifyError(errs, { caller: 'checkoutAttributesUpdate' });
  }

  if (data?.checkoutAttributesUpdateV2.checkout) {
    return buildCheckout(data.checkoutAttributesUpdateV2.checkout);
  }
}
