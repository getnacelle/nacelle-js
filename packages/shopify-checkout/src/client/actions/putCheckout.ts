import {
  checkoutAttributesUpdate,
  checkoutLineItemsReplace,
  checkoutCreate
} from '../../client/actions';
import { isVerifiedCheckoutId } from '../../utils';
import { ShopifyCheckout } from '../../checkout-client.types';
import { CreateCheckoutParams } from '../../client/actions/checkoutCreate';
import { CheckoutAttributesUpdateParams } from '../../client/actions/checkoutAttributesUpdate';
import { CheckoutLineItemsReplaceParams } from '../../client/actions/checkoutLineItemsReplace';

type CheckoutActionIntersection = CreateCheckoutParams &
  CheckoutAttributesUpdateParams &
  CheckoutLineItemsReplaceParams;

export type PutCheckoutParams = Partial<CheckoutActionIntersection> &
  Pick<CheckoutActionIntersection, 'gqlClient'>;

export default async function putCheckout({
  gqlClient,
  id,
  lineItems,
  customAttributes,
  note,
  queueToken
}: PutCheckoutParams): Promise<void | ShopifyCheckout> {
  let checkout: ShopifyCheckout | void = undefined;
  const shouldUpdateLineItems = lineItems?.length;
  const shouldUpdateAttributes = customAttributes?.length || note;

  try {
    if (id) {
      if (!isVerifiedCheckoutId(id)) {
        throw new Error(
          `Invalid checkout ID. Expected a Base64-encoded Shopify Global ID. Received: ${id}`
        );
      }

      const checkoutUpdatePromises: Promise<ShopifyCheckout | void>[] = [];

      // Update line items
      if (shouldUpdateLineItems) {
        checkoutUpdatePromises.push(
          checkoutLineItemsReplace({
            gqlClient,
            id,
            lineItems
          })
        );
      }

      // Update attributes if provided
      if (shouldUpdateAttributes) {
        checkoutUpdatePromises.push(
          checkoutAttributesUpdate({
            gqlClient,
            id,
            customAttributes,
            note
          })
        );
      }

      await Promise.allSettled(checkoutUpdatePromises).then((settledPromises) =>
        settledPromises.forEach((p) => {
          if (p.status === 'fulfilled' && p.value) {
            // Note that the order of the promises is important here,
            // since the last-fulfilled promise's value will overwrite
            // the checkout data.
            //
            // This is why `checkoutAttributesUpdate`, which can return an updated
            // `note` or `customAttributes`, goes after `checkoutLineItemsReplace`,
            // which doesn't update any properties of the checkout object
            // (the `checkoutId` remains the same after a checkoutLineItemsReplace`).
            checkout = {
              ...(checkout || {}),
              ...p.value
            };
          } else if (p.status === 'rejected') {
            throw new Error(p.reason);
          }
        })
      );
    }

    // Create new checkout if checkout does not exist
    if (typeof checkout === 'undefined' && typeof lineItems !== 'undefined') {
      checkout = await checkoutCreate({
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
