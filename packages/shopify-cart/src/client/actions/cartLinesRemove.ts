import mutations from '../../graphql/mutations';
import { formatCartResponse, depaginateLines } from '../../utils';
import type { MutationFragments } from '../../graphql/mutations';
import type { CartResponse, CartFragmentResponse } from '../../types/cart.type';
import {
  CartLinesRemovePayload,
  MutationCartLinesRemoveArgs
} from '../../types/shopify.type';
import type { GqlClient } from '../../cart-client.types';

export interface CartLinesRemoveParams {
  gqlClient: GqlClient;
  cartId: string;
  lineIds: Array<string>;
  customFragments?: MutationFragments;
}

export type CartLinesRemoveResponse = CartLinesRemovePayload &
  CartFragmentResponse;

export interface MutationCartLinesRemoveResponse {
  cartLinesRemove: CartLinesRemoveResponse;
}

export default async function cartLinesRemove({
  cartId,
  customFragments,
  gqlClient,
  lineIds
}: CartLinesRemoveParams): Promise<void | CartResponse> {
  try {
    const shopifyResponse = await gqlClient<
      MutationCartLinesRemoveArgs,
      MutationCartLinesRemoveResponse
    >({
      query: mutations.CART_LINE_REMOVE(customFragments),
      variables: { cartId, lineIds }
    }).catch((err) => {
      throw new Error(err);
    });

    const cart = await depaginateLines({
      cart: shopifyResponse.data?.cartLinesRemove.cart,
      customFragments,
      gqlClient
    });

    return formatCartResponse({
      cart,
      userErrors: shopifyResponse.data?.cartLinesRemove.userErrors,
      errors: shopifyResponse.errors
    });
  } catch (err) {
    throw new Error(String(err));
  }
}
