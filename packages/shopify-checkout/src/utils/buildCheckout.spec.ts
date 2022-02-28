import buildCheckout from './buildCheckout';
import { emptyCheckout } from '../../__tests__/mocks';

describe('buildCheckout', () => {
  it('builds a checkout without lines & discounts', async () => {
    const checkout = buildCheckout(emptyCheckout);

    expect(checkout).toMatchObject({
      completed: false,
      id: emptyCheckout.id,
      url: emptyCheckout.webUrl,
      lines: [],
      discounts: []
    });
  });

  it('builds a checkout with lines & discounts', async () => {
    const checkout = buildCheckout({
      ...emptyCheckout,
      lineItems: {
        edges: [
          {
            node: {
              customAttributes: [],
              discountAllocations: [],
              id: 'lineId',
              quantity: 1,
              unitPrice: {
                amount: '1',
                currencyCode: 'USD'
              },
              title: 'title',
              variant: {
                id: 'variantId'
              }
            }
          }
        ]
      },
      discountApplications: {
        edges: [
          {
            node: {
              allocationMethod: 'method',
              targetSelection: 'line',
              targetType: 'type',
              value: {
                amount: '123',
                currencyCode: 'USD',
                percentage: 0
              }
            }
          }
        ]
      }
    });

    expect(checkout).toMatchObject({
      completed: false,
      id: emptyCheckout.id,
      url: emptyCheckout.webUrl,
      lines: [
        {
          customAttributes: [],
          discountAllocations: [],
          id: 'lineId',
          quantity: 1,
          unitPrice: {
            amount: '1',
            currencyCode: 'USD'
          },
          title: 'title',
          variant: {
            id: 'variantId'
          }
        }
      ],
      discounts: [
        {
          allocationMethod: 'method',
          targetSelection: 'line',
          targetType: 'type',
          value: {
            amount: '123',
            currencyCode: 'USD',
            percentage: 0
          }
        }
      ]
    });
  });
});
