import mutations from '../../graphql/mutations';
import { formatCartResponse, depaginateLines } from '../../utils';
import type { CartResponse, CartFragmentResponse } from '../../types/cart.type';
import type { CustomFragments } from '../../graphql/fragments';
import type {
  CartDiscountCodesUpdatePayload,
  CartDiscountCodesUpdateMutationVariables,
  LanguageCode,
  CountryCode
} from '../../types/shopify.type';
import type { GqlClient } from '../../cart-client.types';

export interface CreateDiscountCodesUpdateParams {
  cartId: string;
  gqlClient: GqlClient;
  customFragments?: CustomFragments;
  discountCodes?: string[];
  language: LanguageCode;
  country: CountryCode;
}

export type CartDiscountCodesUpdateResponse = CartDiscountCodesUpdatePayload &
  CartFragmentResponse;

export interface MutationCartDiscountCodesUpdateResponse {
  cartDiscountCodesUpdate: CartDiscountCodesUpdateResponse;
}

export default async function cartDiscountCodesUpdate({
  cartId,
  customFragments,
  discountCodes,
  gqlClient,
  language,
  country
}: CreateDiscountCodesUpdateParams): Promise<void | CartResponse> {
  try {
    const shopifyResponse = await gqlClient<
      CartDiscountCodesUpdateMutationVariables,
      MutationCartDiscountCodesUpdateResponse
    >({
      query: mutations.CART_DISCOUNT_CODES_UPDATE(customFragments),
      variables: { cartId, discountCodes, language, country }
    }).catch((err) => {
      throw new Error(err);
    });

    const cart = await depaginateLines({
      cart: shopifyResponse.data?.cartDiscountCodesUpdate?.cart,
      customFragments,
      gqlClient,
      language,
      country
    });

    return formatCartResponse({
      cart,
      userErrors: shopifyResponse.data?.cartDiscountCodesUpdate?.userErrors,
      errors: shopifyResponse.errors
    });
  } catch (err) {
    throw new Error(String(err));
  }
}
