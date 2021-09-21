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

  errorMessage = errorMessage + (message || 'Shopify Storefront API Errors');

  if (!message && errors && Array.isArray(errors) && errors.length) {
    errorMessage =
      errorMessage + '\n' + (errors.length === 1)
        ? errors[0].message
        : errors.map((e) => e.message).join('; ');
  }

  throw new Error(errorMessage);
}
