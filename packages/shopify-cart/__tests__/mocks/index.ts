import { cartFromGql } from '../../src/utils';
import type { ShopifyResponse } from '../../src/cart-client.types';
import type {
  Cart,
  CartLine,
  NacelleCartLine
} from '../../src/types/cart.type';
import type {
  CartAttributesUpdateMutation,
  CartBuyerIdentityUpdateMutation,
  CartCreateMutation,
  CartDiscountCodesUpdateMutation,
  CartLineAddMutation,
  CartLineUpdateMutation,
  CartLineRemoveMutation,
  CartNoteUpdateMutation,
  Cart_CartFragment,
  CartUserError_UserErrorsFragment,
  CartSelectedDeliveryOptionsUpdateMutation
} from '../../src/types/shopify.type';

export const clientSettings = {
  shopifyShopId: '1122334455',
  shopifyStorefrontAccessToken: 'nacelle-swag-store'
};
import type { ShopifyError } from '../../src/types/errors.type';

export const graphqlEndpoint = `https://${clientSettings.shopifyShopId}.myshopify.com/api/2023-01/graphql`;
export const cartId = 'gid://shopify/Cart/112233';
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
    cartWithPaginatedLines: ShopifyResponse<{ cart: Cart_CartFragment }>;
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
    cartSelectedDeliveryOptionsUpdate: ShopifyResponse<CartSelectedDeliveryOptionsUpdateMutation>;
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
  discountAllocations: [],
  lines: {
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false
    },
    nodes: []
  },
  cost: {
    checkoutChargeAmount: {
      currencyCode: 'USD',
      amount: '0.0'
    },
    subtotalAmount: {
      currencyCode: 'USD',
      amount: '0.0'
    },
    subtotalAmountEstimated: false,
    totalAmount: {
      currencyCode: 'USD',
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

export const cartLine: CartLine = {
  id: 'gid://shopify/CartLine/e543caf96fa645b54d07ab2035ef9dba?cart=a7aad2fb1e6611422c946f6827710550',
  quantity: 1,
  attributes: [],
  cost: {
    subtotalAmount: {
      amount: '265.0',
      currencyCode: 'USD'
    },
    amountPerQuantity: {
      amount: '265.0',
      currencyCode: 'USD'
    },
    compareAtAmountPerQuantity: null,
    totalAmount: {
      amount: '265.0',
      currencyCode: 'USD'
    }
  },
  discountAllocations: [],
  merchandise: {
    sourceEntryId: 'gid://shopify/ProductVariant/0000',
    availableForSale: true,
    compareAtPrice: {
      currencyCode: 'USD',
      amount: '300.0'
    },
    price: {
      currencyCode: 'USD',
      amount: '265.0'
    },
    requiresShipping: false,
    title: 'Default Title',
    image: {
      id: 'gid://shopify/ProductImage/16284913500295',
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
};

const cartLineConverter = { ...cartLine } as any;
cartLineConverter.merchandise.nacelleEntryId = cartLineConverter.nacelleEntryId;
delete cartLineConverter.nacelleEntryId;
export const cartLineNacelle: NacelleCartLine = cartLineConverter;

export const cartWithLine: Cart_CartFragment = {
  id: cartId,
  createdAt: '2022-07-01T00:00:00Z',
  updatedAt: '2022-07-01T00:00:00Z',
  checkoutUrl,
  discountAllocations: [],
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
    nodes: [cartLine]
  },
  cost: {
    checkoutChargeAmount: {
      amount: '0.0',
      currencyCode: 'USD'
    },
    subtotalAmount: {
      currencyCode: 'USD',
      amount: '0.0'
    },
    subtotalAmountEstimated: true,
    totalAmount: {
      currencyCode: 'USD',
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

export const cartWithPaginatedLines: Cart_CartFragment = {
  id: cartId,
  createdAt: '2022-07-01T00:00:00Z',
  updatedAt: '2022-07-01T00:00:00Z',
  checkoutUrl,
  discountAllocations: [],
  buyerIdentity: {
    countryCode: null,
    customer: null,
    email: null,
    phone: null
  },
  lines: {
    pageInfo: {
      hasNextPage: true,
      hasPreviousPage: false,
      endCursor:
        'gid://shopify/CartLine/e543caf96fa645b54d07ab2035ef9dba?cart=a7aad2fb1e6611422c946f6827710550'
    },
    nodes: [cartLine]
  },
  cost: {
    checkoutChargeAmount: {
      amount: '0.0',
      currencyCode: 'USD'
    },
    subtotalAmount: {
      currencyCode: 'USD',
      amount: '0.0'
    },
    subtotalAmountEstimated: true,
    totalAmount: {
      currencyCode: 'USD',
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

export const cartWithPaginatedLinesResponse: CartResponse = {
  userErrors: [],
  cart: cartWithPaginatedLines
};

export const responses: Responses = {
  queries: {
    cart: {
      data: {
        cart: cartWithLineResponse.cart
      }
    },
    cartWithPaginatedLines: {
      data: {
        cart: cartWithPaginatedLinesResponse.cart
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
    },
    cartSelectedDeliveryOptionsUpdate: {
      data: {
        cartSelectedDeliveryOptionsUpdate: {
          ...cartWithLineResponse
        }
      }
    }
  }
};

export const carts: Carts = {
  withoutLine: cartFromGql({
    cart: cartWithoutLine as Cart_CartFragment,
    shopifyShopId: 'shop-id',
    locale: 'en-US'
  }),
  withLine: cartFromGql({
    cart: cartWithLine as Cart_CartFragment,
    shopifyShopId: 'shop-id',
    locale: 'en-US'
  })
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
