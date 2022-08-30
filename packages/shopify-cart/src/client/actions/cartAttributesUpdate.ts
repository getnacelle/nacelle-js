import mutations from '../../graphql/mutations';
import { cartFromGql, handleShopifyError } from '../../utils';
import type { Cart, CartFragmentResponse } from '../../types/cart.type';
import type { MutationFragments } from '../../graphql/mutations';
import type {
  AttributeInput,
  CartAttributesUpdatePayload,
  MutationCartAttributesUpdateArgs
} from '../../types/shopify.type';
import type { GqlClient } from '../../cart-client.types';

export interface UpdateCartAttributesParams {
  attributes: AttributeInput[];
  cartId: string;
  gqlClient: GqlClient;
  customFragments?: MutationFragments;
}

export type CartAttributesUpdateResponse = CartAttributesUpdatePayload &
  CartFragmentResponse;

export interface MutationCartAttributesUpdateResponse {
  cartAttributesUpdate: CartAttributesUpdateResponse;
}

export default async function cartNoteUpdate({
  gqlClient,
  cartId,
  attributes,
  customFragments
}: UpdateCartAttributesParams): Promise<void | Cart> {
  try {
    const cartResponse = await gqlClient<
      MutationCartAttributesUpdateArgs,
      MutationCartAttributesUpdateResponse
    >({
      query: mutations.CART_ATTRIBUTES_UPDATE(customFragments),
      variables: { cartId, attributes }
    }).catch((err) => {
      throw new Error(err);
    });

    const errs = cartResponse.data?.cartAttributesUpdate.userErrors;

    if (errs?.length) {
      handleShopifyError(errs, { caller: 'cartAttributesUpdate' });
    }

    const cart = cartResponse.data?.cartAttributesUpdate.cart;

    if (cart) {
      return cartFromGql({ cart });
    }
  } catch (err) {
    throw new Error(String(err));
  }
}
