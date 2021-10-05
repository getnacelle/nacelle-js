import { CartItem, CheckoutItem } from '../checkout-client.types';
import { metafieldsToCustomAttributes } from '../utils';

export interface CartItemsToCheckoutItemsParams {
  cartItems: CartItem[];
}

export default function cartItemsToCheckoutItems({
  cartItems
}: CartItemsToCheckoutItemsParams): CheckoutItem[] {
  const lineItems: CheckoutItem[] = cartItems.map((cartItem) => {
    const { quantity, variantId } = cartItem;
    const customAttributes = metafieldsToCustomAttributes({
      metafields: cartItem.metafields
    });

    return { customAttributes, quantity, variantId };
  });

  return lineItems;
}
