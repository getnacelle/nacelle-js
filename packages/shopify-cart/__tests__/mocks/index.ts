import { cartFromGql } from '../../src/utils';
import { ShopifyResponse } from '../../src/cart-client.types';
import { Cart } from '../../src/types/cart.type';
import {
  CartAttributesUpdateMutation,
  CartBuyerIdentityUpdateMutation,
  CartCreateMutation,
  CartDiscountCodesUpdateMutation,
  CartLineAddMutation,
  CartLineUpdateMutation,
  CartLineRemoveMutation,
  CartNoteUpdateMutation,
  CurrencyCode,
  Cart_CartFragment,
  CartUserError_UserErrorsFragment
} from '../../src/types/shopify.type';

export const clientSettings = {
  shopifyShopId: '1122334455',
  shopifyStorefrontAccessToken: 'nacelle-swag-store'
};
import { ShopifyError } from '../../src/types/errors.type';

export const graphqlEndpoint = `https://${clientSettings.shopifyShopId}.myshopify.com/api/2022-07/graphql`;
export const cartId = Buffer.from('gid://shopify/Cart/112233').toString(
  'base64'
);
const checkoutUrl = 'https://pepper-wood-apparel.myshopify.com/cart/c/334455';

export const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'X-Shopify-Storefront-Access-Token':
    clientSettings.shopifyStorefrontAccessToken
};

interface Carts {
  withoutLine: Cart;
  withLine: Cart;
}

interface Responses {
  queries: {
    cart: ShopifyResponse<{ cart: Cart_CartFragment }>;
  };
  mutations: {
    cartAttributesUpdate: {
      noAttributes: ShopifyResponse<CartAttributesUpdateMutation>;
    };
    cartBuyerIdentityUpdate: {
      withoutBuyer: ShopifyResponse<CartBuyerIdentityUpdateMutation>;
    };
    cartCreate: {
      withoutLine: ShopifyResponse<CartCreateMutation>;
      withLine: ShopifyResponse<CartCreateMutation>;
    };
    cartDiscountCodesUpdate: {
      withoutCodes: ShopifyResponse<CartDiscountCodesUpdateMutation>;
    };
    cartLinesAdd: ShopifyResponse<CartLineAddMutation>;
    cartLinesUpdate: ShopifyResponse<CartLineUpdateMutation>;
    cartLinesRemove: ShopifyResponse<CartLineRemoveMutation>;
    cartNoteUpdate: {
      noNote: ShopifyResponse<CartNoteUpdateMutation>;
    };
  };
}

interface CartResponse {
  cart: Cart_CartFragment;
  userErrors: CartUserError_UserErrorsFragment[];
}

export const cartWithoutLine: Cart_CartFragment = {
  id: cartId,
  createdAt: '2022-07-01T00:00:00Z',
  updatedAt: '2022-07-01T00:00:00Z',
  checkoutUrl,
  buyerIdentity: {
    countryCode: null,
    customer: null,
    email: null,
    phone: null
  },
  lines: {
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false
    },
    edges: []
  },
  cost: {
    checkoutChargeAmount: {
      currencyCode: CurrencyCode.Usd,
      amount: '0.0'
    },
    subtotalAmount: {
      currencyCode: CurrencyCode.Usd,
      amount: '0.0'
    },
    subtotalAmountEstimated: false,
    totalAmount: {
      currencyCode: CurrencyCode.Usd,
      amount: '0.0'
    },
    totalAmountEstimated: false,
    totalDutyAmount: null,
    totalDutyAmountEstimated: false,
    totalTaxAmount: null,
    totalTaxAmountEstimated: false
  },
  note: null,
  attributes: [],
  discountCodes: []
};

export const cartWithLine: Cart_CartFragment = {
  id: cartId,
  createdAt: '2022-07-01T00:00:00Z',
  updatedAt: '2022-07-01T00:00:00Z',
  checkoutUrl,
  buyerIdentity: {
    countryCode: null,
    customer: null,
    email: null,
    phone: null
  },
  lines: {
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false
    },
    edges: [
      {
        cursor: 'eyJsYXN0X2lkIjoiOTk4ODc3IiwibGFzdF92YWx1ZSI6IjY2NTU0NCJ9',
        node: {
          id: 'Z2lkOi8vc2hvcGlmeS9DYXJ0TGluZS9lNTQzY2FmOTZmYTY0NWI1NGQwN2FiMjAzNWVmOWRiYT9jYXJ0PWE3YWFkMmZiMWU2NjExNDIyYzk0NmY2ODI3NzEwNTUw',
          quantity: 1,
          attributes: [],
          cost: {
            subtotalAmount: {
              amount: '265.0',
              currencyCode: CurrencyCode.Usd
            },
            amountPerQuantity: {
              amount: '265.0',
              currencyCode: CurrencyCode.Usd
            },
            compareAtAmountPerQuantity: null,
            totalAmount: {
              amount: '265.0',
              currencyCode: CurrencyCode.Usd
            }
          },
          discountAllocations: [],
          merchandise: {
            id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zMzg5NDEyMDcxODQ3MQ==',
            availableForSale: true,
            compareAtPriceV2: {
              currencyCode: CurrencyCode.Usd,
              amount: '300.0'
            },
            priceV2: {
              currencyCode: CurrencyCode.Usd,
              amount: '265.0'
            },
            requiresShipping: false,
            title: 'Default Title',
            image: {
              id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0SW1hZ2UvMTYyODQ5MTM1MDAyOTU=',
              url: 'https://cdn.shopify.com/s/files/1/0344/4362/4583/products/pexels-photo-1270015.jpg?v=1587622893',
              altText: 'Raffaella Bag',
              width: 1600,
              height: 1067
            },
            product: {
              handle: 'raffaella-bag',
              onlineStoreUrl: 'https://nacelle.com/example',
              tags: [],
              title: 'Raffaella Bag',
              vendor: 'Prairie Wind Apparel'
            },
            selectedOptions: [
              {
                name: 'Title',
                value: 'Default Title'
              }
            ]
          }
        }
      }
    ]
  },
  cost: {
    checkoutChargeAmount: {
      amount: '0.0',
      currencyCode: CurrencyCode.Usd
    },
    subtotalAmount: {
      currencyCode: CurrencyCode.Usd,
      amount: '0.0'
    },
    subtotalAmountEstimated: true,
    totalAmount: {
      currencyCode: CurrencyCode.Usd,
      amount: '0.0'
    },
    totalAmountEstimated: true,
    totalDutyAmount: null,
    totalDutyAmountEstimated: false,
    totalTaxAmount: null,
    totalTaxAmountEstimated: true
  },
  note: null,
  attributes: [],
  discountCodes: []
};

export const cartWithoutLineResponse: CartResponse = {
  userErrors: [],
  cart: cartWithoutLine
};

export const cartWithLineResponse: CartResponse = {
  userErrors: [],
  cart: cartWithLine
};

export const responses: Responses = {
  queries: {
    cart: {
      data: {
        cart: cartWithLineResponse.cart
      }
    }
  },
  mutations: {
    cartAttributesUpdate: {
      noAttributes: {
        data: {
          cartAttributesUpdate: {
            ...cartWithoutLineResponse
          }
        }
      }
    },
    cartBuyerIdentityUpdate: {
      withoutBuyer: {
        data: {
          cartBuyerIdentityUpdate: {
            ...cartWithoutLineResponse
          }
        }
      }
    },
    cartCreate: {
      withoutLine: {
        data: {
          cartCreate: {
            ...cartWithoutLineResponse
          }
        }
      },
      withLine: {
        data: {
          cartCreate: {
            ...cartWithLineResponse
          }
        }
      }
    },
    cartDiscountCodesUpdate: {
      withoutCodes: {
        data: {
          cartDiscountCodesUpdate: {
            ...cartWithoutLineResponse
          }
        }
      }
    },
    cartLinesAdd: {
      data: {
        cartLinesAdd: {
          ...cartWithLineResponse
        }
      }
    },
    cartLinesUpdate: {
      data: {
        cartLinesUpdate: {
          ...cartWithLineResponse
        }
      }
    },
    cartLinesRemove: {
      data: {
        cartLinesRemove: {
          ...cartWithoutLineResponse
        }
      }
    },
    cartNoteUpdate: {
      noNote: {
        data: {
          cartNoteUpdate: {
            ...cartWithoutLineResponse
          }
        }
      }
    }
  }
};

export const carts: Carts = {
  withoutLine: cartFromGql({ cart: cartWithoutLine as Cart_CartFragment }),
  withLine: cartFromGql({ cart: cartWithLine as Cart_CartFragment })
};

export const shopifyErrors = {
  cartIdNotValid(id: string): ShopifyError {
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
  }
};