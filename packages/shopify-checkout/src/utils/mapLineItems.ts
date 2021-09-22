import { Attribute, CartItem, CheckoutLineItem } from '~/checkout-client.types';

import mapMetafieldsToAttributes from './mapMetafieldsToAttributes';

export default function mapLineItems(
  cartItems: CartItem[]
): CheckoutLineItem[] {
  return cartItems.map((cartItem) => {
    const { quantity, variantId } = cartItem;
    let customAttributes: Attribute[] = [];

    if (cartItem.customAttributes?.length) {
      customAttributes = cartItem.customAttributes;
    } else if (cartItem.metafields?.length) {
      customAttributes = mapMetafieldsToAttributes(cartItem.metafields);
    }

    return { variantId, quantity, customAttributes };
  });
}
