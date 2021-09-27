import {
  CartItem,
  ShopifyError,
  ShopifyResponse
} from '~/checkout-client.types';
import * as mutations from '~/graphql/mutations';
import * as queries from '~/graphql/queries';
import { CheckoutUpdateVariables } from '~/client/actions/checkoutAttributesUpdate';
import { CheckoutLineItemsReplaceVariables } from '~/client/actions/checkoutLineItemsReplace';

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

interface Checkouts {
  findCheckout: ShopifyResponse<queries.GetCheckoutData>;
  checkoutCreate: ShopifyResponse<mutations.CheckoutCreateData>;
  checkoutUpdate(
    params: CheckoutUpdateVariables
  ): ShopifyResponse<mutations.CheckoutAttributesUpdateData>;
  checkoutLineItemsReplace(
    params: CheckoutLineItemsReplaceVariables
  ): ShopifyResponse<mutations.CheckoutLineItemsReplaceData>;
}

export const checkouts: Checkouts = {
  findCheckout: {
    data: {
      node: {
        id: checkoutId,
        webUrl,
        completedAt: null,
        customAttributes: [],
        note: null
      }
    }
  },
  checkoutCreate: {
    data: {
      checkoutCreate: {
        checkout: {
          id: checkoutId,
          webUrl
        },
        checkoutUserErrors: []
      }
    }
  },
  checkoutUpdate(params) {
    return {
      data: {
        checkoutAttributesUpdateV2: {
          checkout: {
            id: params.checkoutId,
            webUrl
          },
          checkoutUserErrors: []
        }
      }
    };
  },
  checkoutLineItemsReplace(params) {
    return {
      data: {
        checkoutLineItemsReplace: {
          checkout: {
            id: params.checkoutId,
            webUrl
          },
          userErrors: []
        }
      }
    };
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
  },
  checkoutAttributesUpdateCheckoutDoesNotExist: {
    data: {
      checkoutAttributesUpdateV2: {
        checkout: null,
        checkoutUserErrors: [
          {
            code: 'INVALID',
            field: ['checkoutId'],
            message: 'Checkout does not exist'
          }
        ]
      }
    }
  }
};
