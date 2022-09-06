import { getShopifyIdFromNacelleId } from '.';

const decodedShopifyGid = 'gid://shopify/ProductVariant/33894120718471';

describe('getShopifyIdFromNacelleId', () => {
  it('returns a shopify gid if a nacelle entry id is passed', () => {
    const unencodedNacelleEntryId =
      'id://shopify/pepper-wood-apparel/default/PRODUCT_VARIANT/33894120718471/en-US';
    const nacelleEntryId = btoa(unencodedNacelleEntryId);
    expect(getShopifyIdFromNacelleId(nacelleEntryId)).toStrictEqual(
      decodedShopifyGid
    );
  });
  it('throws an error if a shopify gid is passed in', () => {
    expect(() => getShopifyIdFromNacelleId(decodedShopifyGid)).toThrow();
  });

  it('throws an error if an invalid nacelleEntryId is passed', () => {
    const invalidId = 'abc/def/gh';
    expect(() => getShopifyIdFromNacelleId(invalidId)).toThrow();
  });
  it('throws an error if a non PRODUCT_VARIANT NacelleEntryId is passed in', () => {
    const unencodedNacelleEntryId =
      'id://shopify/pepper-wood-apparel/default/PRODUCT/33894120718471/en-US';
    const nacelleEntryId = btoa(unencodedNacelleEntryId);
    expect(() => getShopifyIdFromNacelleId(nacelleEntryId)).toThrow();
  });
});
