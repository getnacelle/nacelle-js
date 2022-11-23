import { isVerifiedCheckoutId } from '../utils';
import { checkoutIds } from '../../__tests__/mocks';

describe('handleShopifyError', () => {
  it('returns `true` when provided a valid Shopify checkout ID', async () => {
    expect(isVerifiedCheckoutId(checkoutIds.encoded.beginsWithLetter)).toBe(
      true
    );
    expect(isVerifiedCheckoutId(checkoutIds.encoded.beginsWithNumber)).toBe(
      true
    );
    expect(isVerifiedCheckoutId(checkoutIds.plaintext.beginsWithLetter)).toBe(
      true
    );
    expect(isVerifiedCheckoutId(checkoutIds.plaintext.beginsWithNumber)).toBe(
      true
    );
  });

  it("returns `false` when provided a base64 string that doesn't correspond to a Shopify checkout ID", async () => {
    const invalidId = Buffer.from(
      'gid://definitely-not-shopify/Checkout/a9b8c7?key=123123'
    ).toString('base64');

    expect(isVerifiedCheckoutId(invalidId)).toBe(false);
  });

  it('returns `false` when provided an empty value', async () => {
    expect(isVerifiedCheckoutId('')).toBe(false);
  });
});
