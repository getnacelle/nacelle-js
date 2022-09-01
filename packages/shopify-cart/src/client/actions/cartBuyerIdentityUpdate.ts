import mutations from '../../graphql/mutations';
import { formatCartResponse } from '../../utils';
import type { CartResponse, CartFragmentResponse } from '../../types/cart.type';
import type { MutationFragments } from '../../graphql/mutations';
import type {
  CartBuyerIdentityInput,
  CartBuyerIdentityUpdatePayload,
  MutationCartBuyerIdentityUpdateArgs
} from '../../types/shopify.type';
import type { GqlClient } from '../../cart-client.types';

export interface CartBuyerIdentityUpdateParams {
  gqlClient: GqlClient;
  cartId: string;
  buyerIdentity: CartBuyerIdentityInput;
  customFragments?: MutationFragments;
}

export type CartBuyerIdentityUpdateResponse = CartBuyerIdentityUpdatePayload &
  CartFragmentResponse;

export interface MutationCartBuyerIdentityUpdateResponse {
  cartBuyerIdentityUpdate: CartBuyerIdentityUpdateResponse;
}

export default async function CartBuyerIdentityUpdate({
  buyerIdentity,
  cartId,
  customFragments,
  gqlClient
}: CartBuyerIdentityUpdateParams): Promise<void | CartResponse> {
  try {
    const shopifyResponse = await gqlClient<
      MutationCartBuyerIdentityUpdateArgs,
      MutationCartBuyerIdentityUpdateResponse
    >({
      query: mutations.CART_BUYER_IDENTITY_UPDATE(customFragments),
      variables: { cartId, buyerIdentity }
    }).catch((err) => {
      throw new Error(err);
    });

    return formatCartResponse({
      cart: shopifyResponse.data?.cartBuyerIdentityUpdate.cart,
      userErrors: shopifyResponse.data?.cartBuyerIdentityUpdate.userErrors,
      errors: shopifyResponse.errors
    });
  } catch (err) {
    throw new Error(String(err));
  }
}
