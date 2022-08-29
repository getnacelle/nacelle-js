import mutations from '../../graphql/mutations';
import { formatCartResponse } from '../../utils';
import { CartResponse, CartFragmentResponse } from '../../types/cart.type';
import {
  CartNoteUpdatePayload,
  MutationCartNoteUpdateArgs
} from '../../types/shopify.type';
import { GqlClient } from '../../cart-client.types';

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
}: UpdateCartNoteParams): Promise<void | CartResponse> {
  try {
    const shopifyResponse = await gqlClient<
      MutationCartNoteUpdateArgs,
      MutationCartNoteUpdateResponse
    >({
      query: mutations.CART_NOTE_UPDATE,
      variables: { cartId, note }
    }).catch((err) => {
      throw new Error(err);
    });

    return formatCartResponse({
      cart: shopifyResponse.data?.cartNoteUpdate.cart,
      userErrors: shopifyResponse.data?.cartNoteUpdate.userErrors,
      errors: shopifyResponse?.errors
    });
  } catch (err) {
    throw new Error(String(err));
  }
}
