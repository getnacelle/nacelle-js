import mutations from '../../graphql/mutations';
import { formatCartResponse } from '../../utils';
import { CartResponse, CartFragmentResponse } from '../../types/cart.type';
import {
  AttributeInput,
  CartAttributesUpdatePayload,
  MutationCartAttributesUpdateArgs
} from '../../types/shopify.type';
import { GqlClient } from '../../cart-client.types';

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

export default async function cartAttributesUpdate({
  gqlClient,
  cartId,
  attributes
}: UpdateCartAttributesParams): Promise<void | CartResponse> {
  try {
    const shopifyResponse = await gqlClient<
      MutationCartAttributesUpdateArgs,
      MutationCartAttributesUpdateResponse
    >({
      query: mutations.CART_ATTRIBUTES_UPDATE,
      variables: { cartId, attributes }
    }).catch((err) => {
      throw new Error(err);
    });

    return formatCartResponse({
      cart: shopifyResponse.data?.cartAttributesUpdate.cart,
      userErrors: shopifyResponse.data?.cartAttributesUpdate.userErrors,
      errors: shopifyResponse.errors
    });
  } catch (err) {
    throw new Error(String(err));
  }
}
