import { CartUserError, CartErrorCode } from '../types/shopify.type';
import { ShopifyError } from '../types/errors.type';
export interface VerboseErrorParams {
  caller?: string;
  message?: string;
}

export const cartDoesNotExistUserError: CartUserError = {
  code: CartErrorCode.Invalid,
  field: ['id'],
  message: 'Cart does not exist'
};

export default function handleShopifyError(
  errors: CartUserError[] | ShopifyError[],
  { caller, message }: VerboseErrorParams = {}
): void {
  let errorMessage = '';

  if (caller) {
    errorMessage = `[${caller}] `;
  }

  errorMessage =
    errorMessage +
    (message || 'Shopify Storefront API Errors:\n') +
    JSON.stringify(errors, null, 2);

  throw new Error(errorMessage);
}
