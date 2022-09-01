import mutations from '../../graphql/mutations';
import { formatCartResponse } from '../../utils';
import type {
  AttributeInput,
  CartAttributesUpdatePayload,
  MutationCartAttributesUpdateArgs
} from '../../types/shopify.type';
import type { GqlClient } from '../../cart-client.types';
import type { CartResponse, CartFragmentResponse } from '../../types/cart.type';
import type { MutationFragments } from '../../graphql/mutations';

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

export default async function cartAttributesUpdate({
  attributes,
  cartId,
  customFragments,
  gqlClient
}: UpdateCartAttributesParams): Promise<void | CartResponse> {
  try {
    const shopifyResponse = await gqlClient<
      MutationCartAttributesUpdateArgs,
      MutationCartAttributesUpdateResponse
    >({
      query: mutations.CART_ATTRIBUTES_UPDATE(customFragments),
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
