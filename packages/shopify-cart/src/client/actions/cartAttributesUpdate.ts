import { Cart, CartFragmentResponse } from '../../types/cart.type';
import {
  AttributeInput,
  CartAttributesUpdatePayload,
  MutationCartAttributesUpdateArgs
} from '../../types/shopify.type';
import { GqlClient } from '../../cart-client.types';
import mutations from '../../graphql/mutations';
import { cartFromGql, handleShopifyError } from '../../utils';

export interface UpdateCartAttributesParams {
  gqlClient: GqlClient;
  cartId: string;
  attributes: AttributeInput[];
}

export type CartAttributesUpdateResponse = CartAttributesUpdatePayload &
  CartFragmentResponse;

export interface MutationCartAttributesUpdateResponse {
  cartAttributesUpdate: CartAttributesUpdateResponse;
}

export default async function cartNoteUpdate({
  gqlClient,
  cartId,
  attributes
}: UpdateCartAttributesParams): Promise<void | Cart> {
  try {
    const cartResponse = await gqlClient<
      MutationCartAttributesUpdateArgs,
      MutationCartAttributesUpdateResponse
    >({
      query: mutations.CART_ATTRIBUTES_UPDATE,
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
