import {
  checkoutAttributesUpdate,
  checkoutLineItemsReplace,
  createCheckout
} from '~/client/actions';
import { isVerifiedCheckoutId } from '~/utils';
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
  lineItems,
  customAttributes,
  note,
  queueToken
}: PutCheckoutParams): Promise<void | ShopifyCheckout> {
  let checkout: ShopifyCheckout | void = undefined;
  const shouldUpdateAttributes = customAttributes?.length || note;
  const shouldUpdateLineItems = lineItems?.length;

  try {
    if (checkoutId && isVerifiedCheckoutId(checkoutId)) {
      // Update attributes if provided

      if (shouldUpdateAttributes) {
        checkout = await checkoutAttributesUpdate({
          gqlClient,
          checkoutId,
          customAttributes,
          note
        });
      }

      // Update line items
      if (shouldUpdateLineItems) {
        checkout = await checkoutLineItemsReplace({
          gqlClient,
          checkoutId,
          lineItems
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
