import { CartItem, CheckoutLineItem } from '~/checkout-client.types';

import mapMetafieldsToAttributes from './mapMetafieldsToAttributes';

export default function mapLineItems(
  cartItems: CartItem[]
): CheckoutLineItem[] {
  return cartItems.map((cartItem) => {
    const { quantity, variantId } = cartItem;
    const customAttributes = cartItem.metafields?.length
      ? mapMetafieldsToAttributes(cartItem.metafields)
      : cartItem.customAttributes || [];

    return { variantId, quantity, customAttributes };
  });
}
