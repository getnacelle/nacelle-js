import { CartItem, CheckoutLineItem } from '~/checkout-client.types';
import { reconcileCustomAttributes } from '~/utils';

export default function mapLineItems(
  cartItems: CartItem[]
): CheckoutLineItem[] {
  return cartItems.map((cartItem) => {
    const { quantity, variantId } = cartItem;
    const customAttributes = reconcileCustomAttributes({
      customAttributes: cartItem.customAttributes,
      metafields: cartItem.metafields
    });

    return { variantId, quantity, customAttributes };
  });
}
