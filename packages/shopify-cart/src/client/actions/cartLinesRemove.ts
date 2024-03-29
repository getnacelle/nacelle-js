import mutations from '../../graphql/mutations';
import { formatCartResponse, depaginateLines } from '../../utils';
import type { CustomFragments } from '../../graphql/fragments';
import type { CartResponse, CartFragmentResponse } from '../../types/cart.type';
import type {
  CartLinesRemovePayload,
  CartLineRemoveMutationVariables,
  LanguageCode,
  CountryCode
} from '../../types/shopify.type';
import type { GqlClient } from '../../cart-client.types';

export interface CartLinesRemoveParams {
  gqlClient: GqlClient;
  cartId: string;
  lineIds: Array<string>;
  shopifyShopId: string;
  customFragments?: CustomFragments;
  language: LanguageCode;
  country: CountryCode;
  locale: string;
}

export type CartLinesRemoveResponse = CartLinesRemovePayload &
  CartFragmentResponse;

export interface MutationCartLinesRemoveResponse {
  cartLinesRemove: CartLinesRemoveResponse;
}

export default async function cartLinesRemove({
  cartId,
  customFragments,
  gqlClient,
  lineIds,
  shopifyShopId,
  language,
  country,
  locale
}: CartLinesRemoveParams): Promise<void | CartResponse> {
  try {
    const shopifyResponse = await gqlClient<
      CartLineRemoveMutationVariables,
      MutationCartLinesRemoveResponse
    >({
      query: mutations.CART_LINE_REMOVE(customFragments),
      variables: { cartId, lineIds, language, country }
    }).catch((err) => {
      throw new Error(err);
    });

    const cart = await depaginateLines({
      cart: shopifyResponse.data?.cartLinesRemove?.cart,
      customFragments,
      gqlClient,
      language,
      country
    });

    return formatCartResponse({
      cart,
      userErrors: shopifyResponse.data?.cartLinesRemove?.userErrors,
      errors: shopifyResponse.errors,
      shopifyShopId,
      locale
    });
  } catch (err) {
    throw new Error(String(err));
  }
}
