import mutations from '../../graphql/mutations';
import {
  formatCartResponse,
  transformNacelleLineItemToShopifyLineItem
} from '../../utils';
import type { MutationFragments } from '../../graphql/mutations';
import type {
  CartResponse,
  CartFragmentResponse,
  NacelleCartLineItemUpdateInput
} from '../../types/cart.type';
import type {
  CartLinesUpdatePayload,
  MutationCartLinesUpdateArgs
} from '../../types/shopify.type';
import type { GqlClient } from '../../cart-client.types';

export interface CartLinesUpdateParams {
  cartId: string;
  gqlClient: GqlClient;
  lines: Array<NacelleCartLineItemUpdateInput>;
  customFragments?: MutationFragments;
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
  lines
}: CartLinesUpdateParams): Promise<void | CartResponse> {
  try {
    const formattedLines = transformNacelleLineItemToShopifyLineItem(lines);
    const shopifyResponse = await gqlClient<
      MutationCartLinesUpdateArgs,
      MutationCartLinesUpdateResponse
    >({
      query: mutations.CART_LINE_UPDATE(customFragments),
      variables: { cartId, lines: formattedLines }
    }).catch((err) => {
      throw new Error(err);
    });

    return formatCartResponse({
      cart: shopifyResponse.data?.cartLinesUpdate.cart,
      userErrors: shopifyResponse.data?.cartLinesUpdate.userErrors,
      errors: shopifyResponse.errors
    });
  } catch (err) {
    throw new Error(String(err));
  }
}
