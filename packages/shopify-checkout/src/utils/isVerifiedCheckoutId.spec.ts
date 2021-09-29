import { isVerifiedCheckoutId } from '~/utils';
import { checkoutId } from '__tests__/mocks';

describe('handleShopifyError', () => {
  it('returns `true` when provided a valid Shopify checkout ID', async () => {
    expect(isVerifiedCheckoutId(checkoutId)).toBe(true);
  });

  it('returns `false` when provided a non-base64 Shopify checkout ID', async () => {
    expect(
      isVerifiedCheckoutId('gid://shopify/Checkout/998877?key=123123')
    ).toBe(false);
  });

  it("returns `false` when provided a base64 string that doesn't correspond to a Shopify checkout ID", async () => {
    const invalidId = Buffer.from(
      'gid://definitely-not-shopify/Checkout/998877?key=123123'
    ).toString('base64');

    expect(isVerifiedCheckoutId(invalidId)).toBe(false);
  });

  it('returns `false` when provided an empty value', async () => {
    expect(isVerifiedCheckoutId('')).toBe(false);
  });
});
