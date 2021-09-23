import {
  ShopifyCheckoutUserError,
  ShopifyError,
  VerboseErrorParams
} from '~/checkout-client.types';

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
    '\n' +
    JSON.stringify(errors, null, 2);

  throw new Error(errorMessage);
}
