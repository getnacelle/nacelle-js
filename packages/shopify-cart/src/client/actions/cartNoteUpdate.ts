import mutations, { MutationFragments } from '../../graphql/mutations';
import { cartFromGql, handleShopifyError } from '../../utils';
import type { Cart, CartFragmentResponse } from '../../types/cart.type';
import type {
  CartNoteUpdatePayload,
  MutationCartNoteUpdateArgs
} from '../../types/shopify.type';
import type { GqlClient } from '../../cart-client.types';

export interface UpdateCartNoteParams {
  cartId: string;
  gqlClient: GqlClient;
  note: string;
  customFragments?: MutationFragments;
}

export type CartNoteUpdateResponse = CartNoteUpdatePayload &
  CartFragmentResponse;

export interface MutationCartNoteUpdateResponse {
  cartNoteUpdate: CartNoteUpdateResponse;
}

export default async function cartNoteUpdate({
  cartId,
  customFragments,
  gqlClient,
  note
}: UpdateCartNoteParams): Promise<void | Cart> {
  try {
    const cartResponse = await gqlClient<
      MutationCartNoteUpdateArgs,
      MutationCartNoteUpdateResponse
    >({
      query: mutations.CART_NOTE_UPDATE(customFragments),
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
