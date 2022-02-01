import {
  CartItem,
  ShopifyCheckoutUserError,
  ShopifyError,
  ShopifyResponse
} from '../../src/checkout-client.types';
import * as mutations from '../../src/graphql/mutations';
import * as queries from '../../src/graphql/queries';
import { CheckoutUpdateVariables } from '../../src/client/actions/checkoutAttributesUpdate';
import { CheckoutLineItemsReplaceVariables } from '../../src/client/actions/checkoutLineItemsReplace';

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

export const discountCode = 'BFCM2020';

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
    variantId: '223344',
    metafields: [
      {
        key: 'output_power',
        value: '1.21 gigawatts'
      }
    ]
  },
  {
    quantity: 7,
    variantId: '334455'
  }
];

export const newCartItems = cartItems.slice(0, 2).map((lineItem) => ({
  ...lineItem,
  quantity: lineItem.quantity * 2,
  customAttributes: [{ key: 'care_instructions', value: 'hand wash; drip dry' }]
}));

interface Checkouts {
  findCheckout: ShopifyResponse<queries.GetCheckoutData>;
  checkoutCreate: ShopifyResponse<mutations.CheckoutCreateData>;
  applyDiscount: ShopifyResponse<mutations.CheckoutDiscountCodeApplyV2Data>;
  removeDiscount: ShopifyResponse<mutations.CheckoutDiscountCodeRemoveData>;
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
        completedAt: null
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
  applyDiscount: {
    data: {
      checkoutDiscountCodeApplyV2: {
        checkout: {
          id: checkoutId,
          webUrl
        },
        checkoutUserErrors: []
      }
    }
  },
  removeDiscount: {
    data: {
      checkoutDiscountCodeRemove: {
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

const checkoutDoesNotExistError: ShopifyCheckoutUserError = {
  code: 'INVALID',
  field: ['checkoutId'],
  message: 'Checkout does not exist'
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
        value: id,
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
  invalidVariantId(id: string): ShopifyError {
    return {
      message:
        'Variable $input of type CheckoutCreateInput! was provided invalid value for lineItems.0.variantId (Invalid global id `' +
        id +
        '`)',
      locations: [
        {
          line: 1,
          column: 26
        }
      ],
      extensions: {
        value: {
          lineItems: [
            {
              variantId: id,
              quantity: 1
            }
          ]
        },
        problems: [
          {
            path: ['lineItems', 0, 'variantId'],
            explanation: 'Invalid global id `' + id + '`',
            message: 'Invalid global id `' + id + '`'
          }
        ]
      }
    };
  },
  typeError: {
    message:
      'Variable $input of type CheckoutCreateInput! was provided invalid value for lineItems.0.quantity (Could not coerce value "1" to Int)',
    locations: [
      {
        line: 1,
        column: 26
      }
    ],
    extensions: {
      value: {
        lineItems: [
          {
            variantId: "let's-pretend-this-is-a-valid-variant-id",
            quantity: '1'
          }
        ]
      },
      problems: [
        {
          path: ['lineItems', 0, 'quantity'],
          explanation: 'Could not coerce value "1" to Int'
        }
      ]
    }
  },
  notFound: {
    checkoutAttributesUpdate: {
      data: {
        checkoutAttributesUpdateV2: {
          checkout: null,
          checkoutUserErrors: [checkoutDoesNotExistError]
        }
      }
    },
    checkoutLineItemsReplace: {
      data: {
        checkoutLineItemsReplace: {
          checkout: null,
          userErrors: [checkoutDoesNotExistError]
        }
      }
    }
  }
};
