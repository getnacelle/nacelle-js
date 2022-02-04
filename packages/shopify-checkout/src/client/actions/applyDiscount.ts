import {
  buildCheckout,
  handleShopifyError,
  isVerifiedCheckoutId
} from '../../utils';
import { GqlClient, ShopifyCheckout } from '../../checkout-client.types';
import {
  checkoutDiscountCodeApplyV2,
  CheckoutDiscountCodeApplyV2Data
} from '../../graphql/mutations';

export interface ApplyDiscountParams {
  gqlClient: GqlClient;
  id: string;
  discountCode?: string;
  queueToken?: string;
}

export type ApplyDiscountVariables = {
  input: {
    checkoutId: string;
    discountCode?: string;
  };
};

export default async function applyDiscount({
  gqlClient,
  id,
  discountCode,
  queueToken
}: ApplyDiscountParams): Promise<void | ShopifyCheckout> {
  const query = checkoutDiscountCodeApplyV2;
  const variables = {
    input: { checkoutId: id, discountCode },
    queueToken
  };

  try {
    if (!isVerifiedCheckoutId(id)) {
      throw new Error(
        `Invalid checkout ID. Expected a Base64-encoded Shopify Global ID. Received: ${id}`
      );
    }

    const { data, errors } = await gqlClient<
      ApplyDiscountVariables,
      CheckoutDiscountCodeApplyV2Data
    >({
      query,
      variables
    }).catch((err) => {
      throw new Error(err);
    });

    const errs = errors || data?.checkoutDiscountCodeApplyV2.checkoutUserErrors;

    if (errs?.length) {
      handleShopifyError(errs, { caller: 'checkoutDiscountCodeApplyV2' });
    }

    if (data?.checkoutDiscountCodeApplyV2.checkout) {
      return buildCheckout(data.checkoutDiscountCodeApplyV2.checkout);
    }
  } catch (error) {
    throw new Error(String(error));
  }
}
