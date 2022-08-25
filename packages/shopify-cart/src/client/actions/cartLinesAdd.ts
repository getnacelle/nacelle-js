import { Cart, CartFragmentResponse } from '../../types/cart.type';
import mutations from '../../graphql/mutations';
import { handleShopifyError, cartFromGql } from '../../utils';
import {
  CartLineInput,
  CartLinesAddPayload,
  MutationCartLinesAddArgs
} from '../../types/shopify.type';
import { GqlClient } from '../../cart-client.types';

export interface CartLinesAddParams {
  gqlClient: GqlClient;
  cartId: string;
  lines: Array<CartLineInput>;
}

export type CartLinesAddResponse = CartLinesAddPayload & CartFragmentResponse;

export interface MutationCartLinesAddResponse {
  cartLinesAdd: CartLinesAddResponse;
}

export default async function cartLinesAdd({
  gqlClient,
  cartId,
  lines
}: CartLinesAddParams): Promise<void | Cart> {
  try {
    const cartResponse = await gqlClient<
      MutationCartLinesAddArgs,
      MutationCartLinesAddResponse
    >({
      query: mutations.CART_LINE_ADD,
      variables: { cartId, lines }
    }).catch((err) => {
      throw new Error(err);
    });

    const errs = cartResponse.data?.cartLinesAdd.userErrors;

    if (errs?.length) {
      handleShopifyError(errs, { caller: 'cartLinesAdd' });
    }

    const cart = cartResponse.data?.cartLinesAdd.cart;

    if (cart) {
      return cartFromGql({ cart });
    }
  } catch (err) {
    throw new Error(String(err));
  }
}
