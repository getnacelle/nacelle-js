import queries from '../../graphql/queries';
import { formatCartResponse } from '../../utils';
import type { CartResponse } from '../../types/cart.type';
import type { CartFragments } from '../../graphql/fragments/cart';
import type {
  QueryRootCartArgs,
  Cart_CartFragment
} from '../../types/shopify.type';
import type { GqlClient } from '../../cart-client.types';
import type { ShopifyError } from '../../types/errors.type';

export interface CartParams {
  cartId: string;
  gqlClient: GqlClient;
  customFragments?: CartFragments;
}

export interface ShopifyCartResponse {
  cart?: Cart_CartFragment;
  errors?: ShopifyError[];
}

export default async function cart({
  cartId,
  customFragments,
  gqlClient
}: CartParams): Promise<void | CartResponse> {
  try {
    const shopifyResponse = await gqlClient<
      QueryRootCartArgs,
      ShopifyCartResponse
    >({
      query: queries.CART(customFragments),
      variables: { id: cartId }
    }).catch((err) => {
      throw new Error(err);
    });

    return formatCartResponse({
      cart: shopifyResponse.data?.cart,
      userErrors: null,
      errors: shopifyResponse.errors
    });
  } catch (err) {
    throw new Error(String(err));
  }
}
