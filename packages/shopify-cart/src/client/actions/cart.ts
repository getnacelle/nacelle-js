import queries from '../../graphql/queries';
import { handleShopifyError, cartFromGql } from '../../utils';
import type { Cart } from '../../types/cart.type';
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

export interface CartResponse {
  cart?: Cart_CartFragment;
  errors?: ShopifyError[];
}

export default async function cart({
  cartId,
  customFragments,
  gqlClient
}: CartParams): Promise<void | Cart> {
  try {
    const cartResponse = await gqlClient<QueryRootCartArgs, CartResponse>({
      query: queries.CART(customFragments),
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
