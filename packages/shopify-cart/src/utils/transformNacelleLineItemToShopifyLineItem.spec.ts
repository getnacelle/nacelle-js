import transformNacelleLineItemToShopifyLineItem from './transformNacelleLineItemToShopifyLineItem';

const mockNacelleEntryId =
  'aWQ6Ly9TSE9QSUZZL3BlcHBlci13b29kcy1hcHBhcmVsL2RlZmF1bHQvUFJPRFVDVF9WQVJJQU5ULzMzODk0MTIwNzE4NDcxL2VuLVVT';
const mockShopifyId = 'gid://shopify/ProductVariant/33894120718471';

describe('transformNacelleLineItemToShopifyLineItem', () => {
  it('transforms the line items correctly', () => {
    expect(
      transformNacelleLineItemToShopifyLineItem([
        {
          nacelleEntryId: mockNacelleEntryId,
          quantity: 1
        }
      ])
    ).toEqual([
      {
        merchandiseId: mockShopifyId,
        quantity: 1
      }
    ]);
  });
});
