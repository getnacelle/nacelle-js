import queries from '../../graphql/queries';
import { formatCartResponse } from '../../utils';
import { CartResponse } from '../../types/cart.type';
import { QueryRootCartArgs, Cart_CartFragment } from '../../types/shopify.type';
import { GqlClient } from '../../cart-client.types';
import { ShopifyError } from '../../types/errors.type';

export interface CartParams {
  gqlClient: GqlClient;
  cartId: string;
}

export interface ShopifyCartResponse {
  cart?: Cart_CartFragment;
  errors?: ShopifyError[];
}

export default async function cart({
  gqlClient,
  cartId
}: CartParams): Promise<void | CartResponse> {
  try {
    const shopifyResponse = await gqlClient<
      QueryRootCartArgs,
      ShopifyCartResponse
    >({
      query: queries.CART,
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
