import mutations from '../../graphql/mutations';
import { handleShopifyError, cartFromGql } from '../../utils';
import { Cart, CartFragmentResponse } from '../../types/cart.type';
import {
  CartDiscountCodesUpdatePayload,
  MutationCartDiscountCodesUpdateArgs
} from '../../types/shopify.type';
import { GqlClient } from '../../cart-client.types';

export interface CreateDiscountCodesUpdateParams {
  gqlClient: GqlClient;
  cartId: string;
  discountCodes?: string[];
}

export type CartDiscountCodesUpdateResponse = CartDiscountCodesUpdatePayload &
  CartFragmentResponse;

export interface MutationCartDiscountCodesUpdateResponse {
  cartDiscountCodesUpdate: CartDiscountCodesUpdateResponse;
}

export default async function cartDiscountCodesUpdate({
  gqlClient,
  cartId,
  discountCodes
}: CreateDiscountCodesUpdateParams): Promise<void | Cart> {
  try {
    const cartResponse = await gqlClient<
      MutationCartDiscountCodesUpdateArgs,
      MutationCartDiscountCodesUpdateResponse
    >({
      query: mutations.CART_DISCOUNT_CODES_UPDATE,
      variables: { cartId, discountCodes }
    }).catch((err) => {
      throw new Error(err);
    });

    const errs = cartResponse.data?.cartDiscountCodesUpdate.userErrors;

    if (errs?.length) {
      handleShopifyError(errs, { caller: 'cartDiscountCodesUpdate' });
    }

    const cart = cartResponse.data?.cartDiscountCodesUpdate.cart;

    if (cart) {
      return cartFromGql({ cart });
    }
  } catch (err) {
    throw new Error(String(err));
  }
}
