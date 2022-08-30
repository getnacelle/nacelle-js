import mutations from '../../graphql/mutations';
import { handleShopifyError, cartFromGql } from '../../utils';
import type { Cart, CartFragmentResponse } from '../../types/cart.type';
import type { MutationFragments } from '../../graphql/mutations';
import type {
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
}: CartLinesRemoveParams): Promise<void | Cart> {
  try {
    const cartResponse = await gqlClient<
      MutationCartLinesRemoveArgs,
      MutationCartLinesRemoveResponse
    >({
      query: mutations.CART_LINE_REMOVE(customFragments),
      variables: { cartId, lineIds }
    }).catch((err) => {
      throw new Error(err);
    });

    const errs = cartResponse.data?.cartLinesRemove.userErrors;

    if (errs?.length) {
      handleShopifyError(errs, { caller: 'cartLinesRemove' });
    }

    const cart = cartResponse.data?.cartLinesRemove.cart;

    if (cart) {
      return cartFromGql({ cart });
    }
  } catch (err) {
    throw new Error(String(err));
  }
}
