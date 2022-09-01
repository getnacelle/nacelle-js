import mutations from '../../graphql/mutations';
import { formatCartResponse } from '../../utils';
import type {
  CartNoteUpdatePayload,
  MutationCartNoteUpdateArgs
} from '../../types/shopify.type';
import type { MutationFragments } from '../../graphql/mutations';
import type { CartResponse, CartFragmentResponse } from '../../types/cart.type';
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
}: UpdateCartNoteParams): Promise<void | CartResponse> {
  try {
    const shopifyResponse = await gqlClient<
      MutationCartNoteUpdateArgs,
      MutationCartNoteUpdateResponse
    >({
      query: mutations.CART_NOTE_UPDATE(customFragments),
      variables: { cartId, note }
    }).catch((err) => {
      throw new Error(err);
    });

    return formatCartResponse({
      cart: shopifyResponse.data?.cartNoteUpdate.cart,
      userErrors: shopifyResponse.data?.cartNoteUpdate.userErrors,
      errors: shopifyResponse.errors
    });
  } catch (err) {
    throw new Error(String(err));
  }
}
