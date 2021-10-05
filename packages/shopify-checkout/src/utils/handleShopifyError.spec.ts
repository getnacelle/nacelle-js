import { shopifyErrors } from '../../__tests__/mocks';
import { handleShopifyError } from '../utils';

const checkoutIdNotValid = shopifyErrors.checkoutIdNotValid('not-a-valid-id');

describe('handleShopifyError', () => {
  it('throws an error containing the error provided by Shopify', async () => {
    const problemMessage = String(
      checkoutIdNotValid.extensions.problems[0].message
    );

    expect(() => handleShopifyError([checkoutIdNotValid])).toThrow(
      problemMessage
    );
  });

  it("displays a placeholder error preamble when a custom message isn't provided", async () => {
    expect(() => handleShopifyError([checkoutIdNotValid])).toThrow(
      'Shopify Storefront API Errors:'
    );
  });

  it('displays a custom error preample when a custom message is provided', async () => {
    expect(() =>
      handleShopifyError([checkoutIdNotValid], { message: 'whoops!' })
    ).toThrow('whoops!');
  });

  it('prepends the error message with the caller when a caller is specified', async () => {
    expect(() =>
      handleShopifyError([checkoutIdNotValid], { caller: 'putCheckout' })
    ).toThrow('[putCheckout] Shopify Storefront API Errors:');
  });
});
