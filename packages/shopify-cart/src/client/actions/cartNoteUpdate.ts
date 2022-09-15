import mutations from '../../graphql/mutations';
import { formatCartResponse, depaginateLines } from '../../utils';
import type {
  CartNoteUpdatePayload,
  CartNoteUpdateMutationVariables,
  LanguageCode,
  CountryCode
} from '../../types/shopify.type';
import type { CustomFragments } from '../../graphql/fragments';
import type { CartResponse, CartFragmentResponse } from '../../types/cart.type';
import type { GqlClient } from '../../cart-client.types';

export interface UpdateCartNoteParams {
  cartId: string;
  gqlClient: GqlClient;
  note: string;
  customFragments?: CustomFragments;
  language: LanguageCode;
  country: CountryCode;
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
  note,
  language,
  country
}: UpdateCartNoteParams): Promise<void | CartResponse> {
  try {
    const shopifyResponse = await gqlClient<
      CartNoteUpdateMutationVariables,
      MutationCartNoteUpdateResponse
    >({
      query: mutations.CART_NOTE_UPDATE(customFragments),
      variables: { cartId, note, language, country }
    }).catch((err) => {
      throw new Error(err);
    });

    const cart = await depaginateLines({
      cart: shopifyResponse.data?.cartNoteUpdate.cart,
      customFragments,
      gqlClient,
      language,
      country
    });

    return formatCartResponse({
      cart,
      userErrors: shopifyResponse.data?.cartNoteUpdate.userErrors,
      errors: shopifyResponse.errors
    });
  } catch (err) {
    throw new Error(String(err));
  }
}
