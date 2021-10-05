import {
  ShopifyCheckoutUserError,
  ShopifyError
} from '../checkout-client.types';

export interface VerboseErrorParams {
  caller?: string;
  message?: string;
}

export default function handleShopifyError(
  errors?: ShopifyCheckoutUserError[] | ShopifyError[],
  { caller, message }: VerboseErrorParams = {}
): void {
  let errorMessage = '';

  if (caller) {
    errorMessage = `[${caller}] `;
  }

  errorMessage =
    errorMessage +
    (message || 'Shopify Storefront API Errors:') +
    (errors ? '\n' + JSON.stringify(errors, null, 2) : '');

  throw new Error(errorMessage);
}
