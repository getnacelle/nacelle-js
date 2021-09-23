import {
  checkoutAttributesUpdate,
  checkoutLineItemsReplace,
  createCheckout
} from '~/client/actions';
import { isVerifiedCheckoutId, mapLineItems } from '~/utils';
import {
  Attribute,
  CartItem,
  GqlClient,
  ShopifyCheckout
} from '~/checkout-client.types';

export interface PutCheckoutParams {
  gqlClient: GqlClient;
  lineItems: CartItem[];
  checkoutId?: string;
  customAttributes?: Attribute[];
  note?: string;
  queueToken?: string;
}

export default async function putCheckout({
  gqlClient,
  checkoutId,
  customAttributes,
  note,
  queueToken,
  ...params
}: PutCheckoutParams): Promise<void | ShopifyCheckout> {
  let checkout: ShopifyCheckout | void = undefined;
  const lineItems = mapLineItems(params.lineItems);
  const shouldUpdateAttributes = customAttributes?.length || note !== undefined;

  try {
    if (checkoutId && isVerifiedCheckoutId(checkoutId)) {
      // Update attributes if provided
      if (shouldUpdateAttributes) {
        checkout = await checkoutAttributesUpdate({
          gqlClient,
          customAttributes,
          note,
          checkoutId
        });
      }

      // Update line items
      if (
        (!checkout && shouldUpdateAttributes) || // updateAttributes was successful
        !shouldUpdateAttributes // updateAttributes was not needed
      ) {
        checkout = await checkoutLineItemsReplace({
          gqlClient,
          lineItems,
          checkoutId
        });
      }
    }

    // Create new checkout if checkout does not exist
    if (!checkout) {
      checkout = await createCheckout({
        gqlClient,
        customAttributes,
        note,
        lineItems,
        queueToken
      });
    }

    return checkout;
  } catch (err) {
    throw new Error(String(err));
  }
}
