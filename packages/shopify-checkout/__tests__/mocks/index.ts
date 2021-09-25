import { CartItem, ShopifyError } from '~/checkout-client.types';

export const clientSettings = {
  storefrontCheckoutToken: '1122334455',
  myshopifyDomain: 'nacelle-swag-store',
  storefrontApiVersion: '2021-07'
};

export const graphqlEndpoint = `https://${clientSettings.myshopifyDomain}.myshopify.com/api/${clientSettings.storefrontApiVersion}/graphql`;

const checkoutUuidWithKey = '998877?key=123123';
export const checkoutId = Buffer.from(
  'gid://shopify/Checkout/' + checkoutUuidWithKey
).toString('base64');

export const webUrl =
  'https://nacelle-swag-store.myshopify.com/112233/checkouts/' +
  checkoutUuidWithKey;

export const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'X-Shopify-Storefront-Access-Token': clientSettings.storefrontCheckoutToken
};

export const cartItems: CartItem[] = [
  {
    quantity: 1,
    variantId: '112233'
  },
  {
    quantity: 4,
    variantId: '223344'
  },
  {
    quantity: 7,
    variantId: '334455'
  }
];

export const checkouts = {
  checkoutCreate: {
    id: checkoutId,
    webUrl,
    note: null,
    createdAt: '2021-09-23T20:14:18Z',
    customAttributes: [],
    paymentDueV2: {
      amount: '115.0',
      currencyCode: 'USD'
    }
  }
};

export const shopifyErrors = {
  checkoutIdNotValid(id: string): ShopifyError {
    return {
      message: 'Variable $id of type ID! was provided invalid value',
      locations: [
        {
          line: 1,
          column: 23
        }
      ],
      extensions: {
        value: 'not-a-valid-id',
        problems: [
          {
            path: [],
            explanation: 'Invalid global id `' + id + '`',
            message: 'Invalid global id `' + id + '`'
          }
        ]
      }
    };
  }
};
