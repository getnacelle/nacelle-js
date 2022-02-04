import {
  buildCheckout,
  handleShopifyError,
  isVerifiedCheckoutId
} from '../../utils';
import { GqlClient, ShopifyCheckout } from '../../checkout-client.types';
import {
  checkoutDiscountCodeRemove,
  CheckoutDiscountCodeRemoveData
} from '../../graphql/mutations';

export interface RemoveDiscountParams {
  gqlClient: GqlClient;
  id: string;
  queueToken?: string;
}

export type RemoveDiscountVariables = {
  input: {
    checkoutId: string;
  };
};

export default async function removeDiscount({
  gqlClient,
  id,
  queueToken
}: RemoveDiscountParams): Promise<void | ShopifyCheckout> {
  const query = checkoutDiscountCodeRemove;
  const variables = {
    input: { checkoutId: id },
    queueToken
  };
  try {
    if (!isVerifiedCheckoutId(id)) {
      throw new Error(
        `Invalid checkout ID. Expected a Base64-encoded Shopify Global ID. Received: ${id}`
      );
    }

    const { data, errors } = await gqlClient<
      RemoveDiscountVariables,
      CheckoutDiscountCodeRemoveData
    >({
      query,
      variables
    }).catch((err) => {
      throw new Error(err);
    });

    const errs = errors || data?.checkoutDiscountCodeRemove.checkoutUserErrors;

    if (errs?.length) {
      handleShopifyError(errs, { caller: 'checkoutDiscountCodeRemove' });
    }

    if (data?.checkoutDiscountCodeRemove.checkout) {
      return buildCheckout(data.checkoutDiscountCodeRemove.checkout);
    }
  } catch (error) {
    throw new Error(String(error));
  }
}
