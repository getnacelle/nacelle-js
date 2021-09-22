import {
  checkoutAttributesUpdate,
  checkoutLineItemsReplace,
  createCheckout
} from '~/client/actions';
import { isVerifiedCheckoutId, mapLineItems } from '~/utils';
import {
  CartItem,
  ShopifyCheckout,
  Attribute,
  GqlClient
} from '~/checkout-client.types';

export interface PutCheckoutParams {
  gqlClient: GqlClient;
  cartItems: CartItem[];
  checkoutId?: string;
  customAttributes?: Attribute[];
  note?: string;
}

export default async function putCheckout({
  gqlClient,
  cartItems,
  checkoutId,
  customAttributes,
  note
}: PutCheckoutParams): Promise<void | ShopifyCheckout> {
  let checkout;
  const lineItems = mapLineItems(cartItems);

  const shouldUpdateAttributes =
    customAttributes !== undefined || note !== undefined;

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
        (checkout && shouldUpdateAttributes) || // updateAttributes was successful
        !shouldUpdateAttributes // updateAttributes was not needed
      ) {
        checkout = await checkoutLineItemsReplace({
          gqlClient,
          lineItems,
          checkoutId
        });
      }
    }

    // Create new checkout if unsuccessful due to checkout not existing
    if (!checkout) {
      checkout = await createCheckout({
        gqlClient,
        customAttributes,
        note,
        lineItems
      });
    }

    return checkout;
  } catch (err) {
    throw new Error(String(err));
  }
}
