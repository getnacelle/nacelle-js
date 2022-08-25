import handleShopifyError, {
  cartDoesNotExistUserError
} from './handleShopifyError';

describe('handleShopifyError', () => {
  it('throws an error containing the error provided by Shopify', async () => {
    expect(() => handleShopifyError([cartDoesNotExistUserError])).toThrow(
      cartDoesNotExistUserError.message
    );
  });

  it("displays a placeholder error preamble when a custom message isn't provided", async () => {
    expect(() => handleShopifyError([cartDoesNotExistUserError])).toThrow(
      'Shopify Storefront API Errors:'
    );
  });

  it('displays a custom error preample when a custom message is provided', async () => {
    expect(() =>
      handleShopifyError([cartDoesNotExistUserError], { message: 'whoops!' })
    ).toThrow('whoops!');
  });

  it('prepends the error message with the caller when a caller is specified', async () => {
    expect(() =>
      handleShopifyError([cartDoesNotExistUserError], { caller: 'cartCreate' })
    ).toThrow('[cartCreate] Shopify Storefront API Errors:');
  });
});
