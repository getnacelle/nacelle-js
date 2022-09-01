/**
 * @jest-environment node
 */

/**This node test file only needs to test node decoding works since everything else is the same between server and client */
import { getShopifyIdFromNacelleId } from '.';

const decodedShopifyGid = 'gid://shopify/ProductVariant/33894120718471';

describe('getShopifyIdFromNacelleId Node', () => {
  it('returns a shopify gid from a nacelleEntryId', () => {
    const unencodedNacelleEntryId =
      'id://shopify/pepper-wood-apparel/default/PRODUCT_VARIANT/33894120718471/en-US';
    const nacelleEntryId = btoa(unencodedNacelleEntryId);
    expect(getShopifyIdFromNacelleId(nacelleEntryId)).toStrictEqual(
      decodedShopifyGid
    );
  });
});
