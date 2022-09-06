import mutations from '../../graphql/mutations';
import { formatCartResponse, depaginateLines } from '../../utils';
import type {
  CartInput,
  CartCreatePayload,
  MutationCartCreateArgs
} from '../../types/shopify.type';
import type { MutationFragments } from '../../graphql/mutations';
import type { CartResponse, CartFragmentResponse } from '../../types/cart.type';
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
  customFragments,
  gqlClient,
  params
}: CreateCartParams): Promise<void | CartResponse> {
  try {
    const shopifyResponse = await gqlClient<
      MutationCartCreateArgs,
      MutationCartCreateResponse
    >({
      query: mutations.CART_CREATE(customFragments),
      variables: { input: params ?? {} }
    }).catch((err) => {
      throw new Error(err);
    });

    const cart = await depaginateLines({
      cart: shopifyResponse.data?.cartCreate.cart,
      customFragments,
      gqlClient
    });

    return formatCartResponse({
      cart,
      userErrors: shopifyResponse.data?.cartCreate.userErrors,
      errors: shopifyResponse.errors
    });
  } catch (err) {
    throw new Error(String(err));
  }
}
