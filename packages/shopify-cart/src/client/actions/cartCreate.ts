import mutations from '../../graphql/mutations';
import { formatCartResponse } from '../../utils';
import { CartResponse, CartFragmentResponse } from '../../types/cart.type';
import {
  CartInput,
  CartCreatePayload,
  MutationCartCreateArgs
} from '../../types/shopify.type';
import { GqlClient } from '../../cart-client.types';

export interface CreateCartParams {
  gqlClient: GqlClient;
  params: CartInput;
}

export type CartCreateResponse = CartCreatePayload & CartFragmentResponse;

export interface MutationCartCreateResponse {
  cartCreate: CartCreateResponse;
}

export default async function cartCreate({
  gqlClient,
  params
}: CreateCartParams): Promise<void | CartResponse> {
  try {
    const shopifyResponse = await gqlClient<
      MutationCartCreateArgs,
      MutationCartCreateResponse
    >({
      query: mutations.CART_CREATE,
      variables: { input: params }
    }).catch((err) => {
      throw new Error(err);
    });

    return formatCartResponse({
      cart: shopifyResponse.data?.cartCreate.cart,
      userErrors: shopifyResponse.data?.cartCreate.userErrors,
      errors: shopifyResponse?.errors
    });
  } catch (err) {
    throw new Error(String(err));
  }
}
