import mutations from '../../graphql/mutations';
import {
  formatCartResponse,
  transformNacelleLineItemToShopifyLineItem,
  depaginateLines
} from '../../utils';
import type { CustomFragments } from '../../graphql/fragments';
import type {
  CartResponse,
  CartFragmentResponse,
  NacelleCartLineItemUpdateInput
} from '../../types/cart.type';
import type {
  CartLinesUpdatePayload,
  CartLineUpdateMutationVariables,
  LanguageCode,
  CountryCode
} from '../../types/shopify.type';
import type { GqlClient } from '../../cart-client.types';

export interface CartLinesUpdateParams {
  cartId: string;
  gqlClient: GqlClient;
  lines: Array<NacelleCartLineItemUpdateInput>;
  shopifyShopId: string;
  customFragments?: CustomFragments;
  language: LanguageCode;
  country: CountryCode;
  locale: string;
}

export type CartLinesUpdateResponse = CartLinesUpdatePayload &
  CartFragmentResponse;

export interface MutationCartLinesUpdateResponse {
  cartLinesUpdate: CartLinesUpdateResponse;
}

export default async function cartLinesUpdate({
  cartId,
  customFragments,
  gqlClient,
  lines,
  shopifyShopId,
  language,
  country,
  locale
}: CartLinesUpdateParams): Promise<void | CartResponse> {
  try {
    const formattedLines = transformNacelleLineItemToShopifyLineItem(lines);
    const shopifyResponse = await gqlClient<
      CartLineUpdateMutationVariables,
      MutationCartLinesUpdateResponse
    >({
      query: mutations.CART_LINE_UPDATE(customFragments),
      variables: { cartId, lines: formattedLines, language, country }
    }).catch((err) => {
      throw new Error(err);
    });

    const cart = await depaginateLines({
      cart: shopifyResponse.data?.cartLinesUpdate.cart,
      customFragments,
      gqlClient,
      language,
      country
    });

    return formatCartResponse({
      cart,
      userErrors: shopifyResponse.data?.cartLinesUpdate.userErrors,
      errors: shopifyResponse.errors,
      shopifyShopId,
      locale
    });
  } catch (err) {
    throw new Error(String(err));
  }
}
