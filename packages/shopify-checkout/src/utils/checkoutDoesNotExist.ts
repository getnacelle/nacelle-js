import { ShopifyCheckoutUserError } from '~/checkout-client.types';

export default function checkoutDoesNotExist(
  errs: ShopifyCheckoutUserError[]
): boolean {
  return errs.some((e) => e.message === 'Checkout does not exist');
}
