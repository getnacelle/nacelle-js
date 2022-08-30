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
  it('returns an unencoded shopify gid if an unencoded gid is passed in', () => {
    expect(getShopifyIdFromNacelleId(decodedShopifyGid)).toStrictEqual(
      decodedShopifyGid
    );
  });
  it('returns an unencoded shopify gid if an encoded gid is passed', () => {
    expect(getShopifyIdFromNacelleId(btoa(decodedShopifyGid))).toStrictEqual(
      decodedShopifyGid
    );
  });
  it('throws an error if an invalid gid is passed', () => {
    const invalidId = 'abc/def/gh';
    expect(() => getShopifyIdFromNacelleId(invalidId)).toThrow();
  });
  it('returns a shopify gid for a Product NacelleEntryId', () => {
    const unencodedNacelleEntryId =
      'id://shopify/pepper-wood-apparel/default/PRODUCT/33894120718471/en-US';
    const nacelleEntryId = btoa(unencodedNacelleEntryId);
    expect(getShopifyIdFromNacelleId(nacelleEntryId)).toStrictEqual(
      'gid://shopify/Product/33894120718471'
    );
  });
  it('returns a shopify gid for a Collection NacelleEntryId', () => {
    const unencodedNacelleEntryId =
      'id://shopify/pepper-wood-apparel/default/COLLECTION/33894120718471/en-US';
    const nacelleEntryId = btoa(unencodedNacelleEntryId);
    expect(getShopifyIdFromNacelleId(nacelleEntryId)).toStrictEqual(
      'gid://shopify/Collection/33894120718471'
    );
  });
});
