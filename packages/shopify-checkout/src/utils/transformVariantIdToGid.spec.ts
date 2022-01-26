import { transformVariantIdToGid } from '../utils';

const numericId = '10555783';
const validGid = `gid://shopify/ProductVariant/${numericId}`;

describe('transformVariantIdToGid', () => {
  it('throws an error if the gid is not valid or numeric', () => {
    // invalid string that's Base64 decodeable
    expect(() => transformVariantIdToGid('abcd123')).toThrow();
    // invalid string that's not Base64 decodeable
    expect(() => transformVariantIdToGid('A')).toThrow();
  });

  it('returns the same gid if a gid is passed for the variantId', () => {
    expect(transformVariantIdToGid(validGid)).toEqual(validGid);
  });

  it('returns the decoded gid if a base64 gid is passed to it', () => {
    const gidBuffer = Buffer.from(validGid, 'utf-8');
    const encodedGid = gidBuffer.toString('base64');
    expect(transformVariantIdToGid(encodedGid)).toEqual(validGid);
  });

  it('turns a numeric id into a valid gid', () => {
    expect(transformVariantIdToGid(numericId)).toEqual(validGid);
  });
});
