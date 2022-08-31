import mutations from '../../graphql/mutations';
import {
  formatCartResponse,
  transformNacelleLineItemToShopifyLineItem
} from '../../utils';
import {
  CartResponse,
  CartFragmentResponse,
  NacelleCartInput
} from '../../types/cart.type';
import type {
  CartCreatePayload,
  CartInput,
  MutationCartCreateArgs
} from '../../types/shopify.type';
import { GqlClient } from '../../cart-client.types';

export interface CreateCartParams {
  gqlClient: GqlClient;
  params?: NacelleCartInput;
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
    let formattedParams: NacelleCartInput | CartInput | undefined = params;
    if (params && params.lines) {
      const nacelleLines = params.lines;
      const shopifyLines =
        transformNacelleLineItemToShopifyLineItem(nacelleLines);
      formattedParams = { ...params, lines: shopifyLines } as CartInput;
    }
    const shopifyResponse = await gqlClient<
      MutationCartCreateArgs,
      MutationCartCreateResponse
    >({
      query: mutations.CART_CREATE,
      variables: { input: (formattedParams as CartInput | undefined) ?? {} }
    }).catch((err) => {
      throw new Error(err);
    });

    return formatCartResponse({
      cart: shopifyResponse.data?.cartCreate.cart,
      userErrors: shopifyResponse.data?.cartCreate.userErrors,
      errors: shopifyResponse.errors
    });
  } catch (err) {
    throw new Error(String(err));
  }
}
