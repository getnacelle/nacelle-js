import {
  ShopifyCheckoutUserError,
  ShopifyError
} from '~/checkout-client.types';

export default function checkoutDoesNotExist(
  errs: ShopifyCheckoutUserError[] | ShopifyError[]
): boolean {
  return errs.some((e) => e.message === 'Checkout does not exist');
}
