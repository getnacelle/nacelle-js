import {
  CartItem,
  ShopifyCheckoutUserError,
  ShopifyError,
  ShopifyResponse,
  ShopifyCheckoutResponseProperties
} from '../../src/checkout-client.types';
import * as mutations from '../../src/graphql/mutations';
import * as queries from '../../src/graphql/queries';
import { CheckoutUpdateVariables } from '../../src/client/actions/checkoutAttributesUpdate';
import { CheckoutLineItemsReplaceVariables } from '../../src/client/actions/checkoutLineItemsReplace';

export const clientSettings = {
  storefrontCheckoutToken: '1122334455',
  myshopifyDomain: 'nacelle-swag-store'
};

export const graphqlEndpoint = `https://${clientSettings.myshopifyDomain}.myshopify.com/api/2022-01/graphql`;

const checkoutUuids = {
  beginsWithLetter: 'a9b8c7?key=123123',
  beginsWithNumber: '998877?key=123123'
};
export const checkoutIds = {
  beginsWithLetter: Buffer.from(
    'gid://shopify/Checkout/' + checkoutUuids.beginsWithLetter
  ).toString('base64'),
  beginsWithNumber: Buffer.from(
    'gid://shopify/Checkout/' + checkoutUuids.beginsWithNumber
  ).toString('base64')
};

export const webUrl =
  'https://nacelle-swag-store.myshopify.com/112233/checkouts/' +
  checkoutUuids.beginsWithLetter;

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

export const emptyCheckout: ShopifyCheckoutResponseProperties = {
  id: checkoutIds.beginsWithLetter,
  webUrl,
  completedAt: null,
  lineItems: { edges: [] },
  discountApplications: { edges: [] }
};

export const checkouts: Checkouts = {
  findCheckout: {
    data: {
      node: {
        ...emptyCheckout
      }
    }
  },
  checkoutCreate: {
    data: {
      checkoutCreate: {
        checkout: {
          ...emptyCheckout
        },
        checkoutUserErrors: []
      }
    }
  },
  applyDiscount: {
    data: {
      checkoutDiscountCodeApplyV2: {
        checkout: {
          ...emptyCheckout
        },
        checkoutUserErrors: []
      }
    }
  },
  removeDiscount: {
    data: {
      checkoutDiscountCodeRemove: {
        checkout: {
          ...emptyCheckout
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
            ...emptyCheckout,
            id: params.checkoutId
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
            ...emptyCheckout,
            id: params.checkoutId
          },
          userErrors: []
        }
      }
    };
  }
};

export const checkoutDoesNotExistError: ShopifyCheckoutUserError = {
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
    },
    checkoutDiscountCodeApplyV2: {
      data: {
        checkoutDiscountCodeApplyV2: {
          checkout: null,
          checkoutUserErrors: [checkoutDoesNotExistError]
        }
      }
    },
    checkoutDiscountCodeRemove: {
      data: {
        checkoutDiscountCodeRemove: {
          checkout: null,
          checkoutUserErrors: [checkoutDoesNotExistError]
        }
      }
    }
  }
};
