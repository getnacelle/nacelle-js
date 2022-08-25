import { Cart, CartFragmentResponse } from '../../types/cart.type';
import {
  CartNoteUpdatePayload,
  MutationCartNoteUpdateArgs
} from '../../types/shopify.type';
import { GqlClient } from '../../cart-client.types';
import mutations from '../../graphql/mutations';
import { cartFromGql, handleShopifyError } from '../../utils';

export interface UpdateCartNoteParams {
  gqlClient: GqlClient;
  cartId: string;
  note: string;
}

export type CartNoteUpdateResponse = CartNoteUpdatePayload &
  CartFragmentResponse;

export interface MutationCartNoteUpdateResponse {
  cartNoteUpdate: CartNoteUpdateResponse;
}

export default async function cartNoteUpdate({
  gqlClient,
  cartId,
  note
}: UpdateCartNoteParams): Promise<void | Cart> {
  try {
    const cartResponse = await gqlClient<
      MutationCartNoteUpdateArgs,
      MutationCartNoteUpdateResponse
    >({
      query: mutations.CART_NOTE_UPDATE,
      variables: { cartId, note }
    }).catch((err) => {
      throw new Error(err);
    });

    const errs = cartResponse.data?.cartNoteUpdate.userErrors;

    if (errs?.length) {
      handleShopifyError(errs, { caller: 'cartNoteUpdate' });
    }

    const cart = cartResponse.data?.cartNoteUpdate.cart;

    if (cart) {
      return cartFromGql({ cart });
    }
  } catch (err) {
    throw new Error(String(err));
  }
}
