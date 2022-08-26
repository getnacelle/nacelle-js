import queries from '../../graphql/queries';
import { cartFromGql } from '../../utils';
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
    const cartResponse = await gqlClient<
      QueryRootCartArgs,
      ShopifyCartResponse
    >({
      query: queries.CART,
      variables: { id: cartId }
    }).catch((err) => {
      throw new Error(err);
    });
    const errors = cartResponse?.errors;

    if (errors) {
      return { cart: null, userErrors: null, errors };
    }

    const cartData = cartResponse.data?.cart;

    if (cartData) {
      return {
        cart: cartFromGql({ cart: cartData }),
        userErrors: null,
        errors: null
      };
    }
  } catch (err) {
    throw new Error(String(err));
  }
}
