import mutations from '../../graphql/mutations';
import {
  formatCartResponse,
  transformNacelleLineItemToShopifyLineItem,
  depaginateLines
} from '../../utils';
import type {
  CartResponse,
  CartFragmentResponse,
  NacelleCartLineItemInput
} from '../../types/cart.type';
import type { MutationFragments } from '../../graphql/mutations';
import type {
  CartLinesAddPayload,
  CartLineAddMutationVariables,
  LanguageCode,
  CountryCode
} from '../../types/shopify.type';
import type { GqlClient } from '../../cart-client.types';

export interface CartLinesAddParams {
  cartId: string;
  gqlClient: GqlClient;
  lines: Array<NacelleCartLineItemInput>;
  customFragments?: MutationFragments;
  language: LanguageCode;
  country: CountryCode;
}

export type CartLinesAddResponse = CartLinesAddPayload & CartFragmentResponse;

export interface MutationCartLinesAddResponse {
  cartLinesAdd: CartLinesAddResponse;
}

export default async function cartLinesAdd({
  cartId,
  customFragments,
  gqlClient,
  lines,
  language,
  country
}: CartLinesAddParams): Promise<void | CartResponse> {
  try {
    const formattedLines = transformNacelleLineItemToShopifyLineItem(lines);
    const shopifyResponse = await gqlClient<
      CartLineAddMutationVariables,
      MutationCartLinesAddResponse
    >({
      query: mutations.CART_LINE_ADD(customFragments),
      variables: { cartId, lines: formattedLines, language, country }
    }).catch((err) => {
      throw new Error(err);
    });

    const cart = await depaginateLines({
      cart: shopifyResponse.data?.cartLinesAdd.cart,
      customFragments,
      gqlClient,
      language,
      country
    });

    return formatCartResponse({
      cart,
      userErrors: shopifyResponse.data?.cartLinesAdd.userErrors,
      errors: shopifyResponse.errors
    });
  } catch (err) {
    throw new Error(String(err));
  }
}
