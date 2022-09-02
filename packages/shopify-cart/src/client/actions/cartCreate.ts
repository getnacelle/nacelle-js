import mutations from '../../graphql/mutations';
import {
  formatCartResponse,
  transformNacelleLineItemToShopifyLineItem
} from '../../utils';
import type {
  CartResponse,
  CartFragmentResponse,
  NacelleCartInput
} from '../../types/cart.type';
import type {
  CartCreatePayload,
  CartInput,
  MutationCartCreateArgs
} from '../../types/shopify.type';
import type { MutationFragments } from '../../graphql/mutations';
import type { GqlClient } from '../../cart-client.types';

export interface CreateCartParams {
  gqlClient: GqlClient;
  customFragments?: MutationFragments;
  params?: NacelleCartInput;
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
  let shopifyParams: CartInput = {};

  try {
    if (params) {
      const { lines: nacelleLines, ...otherParams } = params;
      shopifyParams = otherParams;

      if (nacelleLines) {
        shopifyParams.lines =
          transformNacelleLineItemToShopifyLineItem(nacelleLines);
      }
    }

    const shopifyResponse = await gqlClient<
      MutationCartCreateArgs,
      MutationCartCreateResponse
    >({
      query: mutations.CART_CREATE(customFragments),
      variables: { input: shopifyParams }
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
