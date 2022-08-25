import mutations from '../../graphql/mutations';
import { handleShopifyError, cartFromGql } from '../../utils';
import { Cart, CartFragmentResponse } from '../../types/cart.type';
import {
  CartBuyerIdentityInput,
  CartBuyerIdentityUpdatePayload,
  MutationCartBuyerIdentityUpdateArgs
} from '../../types/shopify.type';
import { GqlClient } from '../../cart-client.types';

export interface CartBuyerIdentityUpdateParams {
  gqlClient: GqlClient;
  cartId: string;
  buyerIdentity: CartBuyerIdentityInput;
}

export type CartBuyerIdentityUpdateResponse = CartBuyerIdentityUpdatePayload &
  CartFragmentResponse;

export interface MutationCartBuyerIdentityUpdateResponse {
  cartBuyerIdentityUpdate: CartBuyerIdentityUpdateResponse;
}

export default async function CartBuyerIdentityUpdate({
  gqlClient,
  cartId,
  buyerIdentity
}: CartBuyerIdentityUpdateParams): Promise<void | Cart> {
  try {
    const cartResponse = await gqlClient<
      MutationCartBuyerIdentityUpdateArgs,
      MutationCartBuyerIdentityUpdateResponse
    >({
      query: mutations.CART_BUYER_IDENTITY_UPDATE,
      variables: { cartId, buyerIdentity }
    }).catch((err) => {
      throw new Error(err);
    });

    const errs = cartResponse.data?.cartBuyerIdentityUpdate.userErrors;

    if (errs?.length) {
      handleShopifyError(errs, { caller: 'cartBuyerIdentityUpdate' });
    }

    const cart = cartResponse.data?.cartBuyerIdentityUpdate.cart;

    if (cart) {
      return cartFromGql({ cart });
    }
  } catch (err) {
    throw new Error(String(err));
  }
}
