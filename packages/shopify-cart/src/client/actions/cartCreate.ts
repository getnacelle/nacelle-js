import mutations from '../../graphql/mutations';
import {
  formatCartResponse,
  transformNacelleLineItemToShopifyLineItem,
  depaginateLines
} from '../../utils';
import type {
  CartResponse,
  CartFragmentResponse,
  NacelleCartInput
} from '../../types/cart.type';
import type {
  CartCreatePayload,
  CartInput,
  CartCreateMutationVariables,
  LanguageCode,
  CountryCode
} from '../../types/shopify.type';
import type { CustomFragments } from '../../graphql/fragments';
import type { GqlClient } from '../../cart-client.types';

export interface CreateCartParams {
  gqlClient: GqlClient;
  customFragments?: CustomFragments;
  params?: NacelleCartInput;
  shopifyShopId: string;
  language: LanguageCode;
  country: CountryCode;
  locale: string;
}

export type CartCreateResponse = CartCreatePayload & CartFragmentResponse;

export interface MutationCartCreateResponse {
  cartCreate: CartCreateResponse;
}

export default async function cartCreate({
  customFragments,
  gqlClient,
  params,
  shopifyShopId,
  language,
  country,
  locale
}: CreateCartParams): Promise<void | CartResponse> {
  let shopifyParams: CartInput = {};

  try {
    if (params) {
      const { lines: nacelleLines, ...otherParams } = params;
      shopifyParams = otherParams;

      if (nacelleLines) {
        shopifyParams.lines =
          transformNacelleLineItemToShopifyLineItem(nacelleLines);
      }
    }

    const shopifyResponse = await gqlClient<
      CartCreateMutationVariables,
      MutationCartCreateResponse
    >({
      query: mutations.CART_CREATE(customFragments),
      variables: { input: shopifyParams, language, country }
    }).catch((err) => {
      throw new Error(err);
    });

    const cart = await depaginateLines({
      cart: shopifyResponse.data?.cartCreate.cart,
      customFragments,
      gqlClient,
      language,
      country
    });

    return formatCartResponse({
      cart,
      userErrors: shopifyResponse.data?.cartCreate.userErrors,
      errors: shopifyResponse.errors,
      shopifyShopId,
      locale
    });
  } catch (err) {
    throw new Error(String(err));
  }
}
