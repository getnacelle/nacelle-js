import createGqlClient, {
  missingAccessTokenMessage,
  missingParametersErrorMessage
} from './createGqlClient';
import sanitizeShopId from './sanitizeShopId';

describe('createGqlClient', () => {
  it("throws an error if `shopifyStorefrontAccessToken` isn't provided", () => {
    expect(() =>
      createGqlClient({
        shopifyShopId: 'xyz',
        shopifyStorefrontAccessToken: ''
      })
    ).toThrow(missingAccessTokenMessage);
  });

  it("throws an error if `shopifyShopId` and `shopifyStorefrontApiVersion` aren't provided when a `shopifyCustomEndpoint` isn't being used", () => {
    expect(() =>
      createGqlClient({
        shopifyStorefrontAccessToken: '112233'
      })
    ).toThrow(missingParametersErrorMessage);
  });
});

describe('sanitizeShopId', () => {
  const shopId = 'nacelle-swag-store';
  it('returns the Shop ID when given a valid Shop ID', () => {
    expect(sanitizeShopId(shopId)).toStrictEqual(shopId);
  });

  it('extracts the Shop ID from a full Shop URL', () => {
    expect(sanitizeShopId(`https://${shopId}.myshopify.com`)).toStrictEqual(
      shopId
    );
  });

  it('returns the input when it cannot be split', () => {
    expect(sanitizeShopId('')).toStrictEqual('');
  });
});
