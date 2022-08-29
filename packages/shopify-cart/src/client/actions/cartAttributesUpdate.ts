import { CartResponse, CartFragmentResponse } from '../../types/cart.type';
import {
  AttributeInput,
  CartAttributesUpdatePayload,
  MutationCartAttributesUpdateArgs
} from '../../types/shopify.type';
import { GqlClient } from '../../cart-client.types';
import mutations from '../../graphql/mutations';
import { cartFromGql } from '../../utils';

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
}: UpdateCartAttributesParams): Promise<void | CartResponse> {
  try {
    const cartResponse: CartResponse = {
      cart: null,
      userErrors: null,
      errors: null
    };

    const shopifyResponse = await gqlClient<
      MutationCartAttributesUpdateArgs,
      MutationCartAttributesUpdateResponse
    >({
      query: mutations.CART_ATTRIBUTES_UPDATE,
      variables: { cartId, attributes }
    }).catch((err) => {
      throw new Error(err);
    });

    cartResponse.errors = shopifyResponse?.errors ?? null;

    const userErrors = shopifyResponse.data?.cartAttributesUpdate.userErrors;

    if (userErrors?.length) {
      cartResponse.userErrors = userErrors;
    }

    const cartData = shopifyResponse.data?.cartAttributesUpdate.cart;

    if (cartData) {
      cartResponse.cart = cartFromGql({ cart: cartData });
    }

    return cartResponse;
  } catch (err) {
    throw new Error(String(err));
  }
}
