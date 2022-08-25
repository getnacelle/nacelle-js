import queries from '../../graphql/queries';
import { handleShopifyError, cartFromGql } from '../../utils';
import { Cart } from '../../types/cart.type';
import { QueryRootCartArgs, Cart_CartFragment } from '../../types/shopify.type';
import { GqlClient } from '../../cart-client.types';
import { ShopifyError } from '../../types/errors.type';

export interface CartParams {
  gqlClient: GqlClient;
  cartId: string;
}

export interface CartResponse {
  cart?: Cart_CartFragment;
  errors?: ShopifyError[];
}

export default async function cart({
  gqlClient,
  cartId
}: CartParams): Promise<void | Cart> {
  try {
    const cartResponse = await gqlClient<QueryRootCartArgs, CartResponse>({
      query: queries.CART,
      variables: { id: cartId }
    }).catch((err) => {
      throw new Error(err);
    });
    const errors = cartResponse?.errors;

    if (errors) {
      handleShopifyError(errors, { caller: 'cart' });
    }

    const cartData = cartResponse.data?.cart;

    if (cartData) {
      return cartFromGql({ cart: cartData });
    }
  } catch (err) {
    throw new Error(String(err));
  }
}
