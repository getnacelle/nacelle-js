import mutations from '../../graphql/mutations';
import { handleShopifyError, cartFromGql } from '../../utils';
import type { Cart, CartFragmentResponse } from '../../types/cart.type';
import type { MutationFragments } from '../../graphql/mutations';
import type {
  CartInput,
  CartCreatePayload,
  MutationCartCreateArgs
} from '../../types/shopify.type';
import type { GqlClient } from '../../cart-client.types';

export interface CreateCartParams {
  gqlClient: GqlClient;
  customFragments?: MutationFragments;
  params?: CartInput;
}

export type CartCreateResponse = CartCreatePayload & CartFragmentResponse;

export interface MutationCartCreateResponse {
  cartCreate: CartCreateResponse;
}

export default async function cartCreate({
  gqlClient,
  params,
  customFragments
}: CreateCartParams): Promise<void | Cart> {
  try {
    const cartResponse = await gqlClient<
      MutationCartCreateArgs,
      MutationCartCreateResponse
    >({
      query: mutations.CART_CREATE(customFragments),
      variables: { input: params ?? {} }
    }).catch((err) => {
      throw new Error(err);
    });

    const errs = cartResponse.data?.cartCreate.userErrors;

    if (errs?.length) {
      handleShopifyError(errs, { caller: 'cartCreate' });
    }

    const cart = cartResponse.data?.cartCreate.cart;

    if (cart) {
      return cartFromGql({ cart });
    }
  } catch (err) {
    throw new Error(String(err));
  }
}
