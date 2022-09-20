import mutations from '../../graphql/mutations';
import { formatCartResponse, depaginateLines } from '../../utils';
import type { CartResponse, CartFragmentResponse } from '../../types/cart.type';
import type { MutationFragments } from '../../graphql/mutations';
import type {
  CartBuyerIdentityInput,
  CartBuyerIdentityUpdatePayload,
  CartBuyerIdentityUpdateMutationVariables,
  LanguageCode,
  CountryCode
} from '../../types/shopify.type';
import type { GqlClient } from '../../cart-client.types';

export interface CartBuyerIdentityUpdateParams {
  gqlClient: GqlClient;
  cartId: string;
  buyerIdentity: CartBuyerIdentityInput;
  customFragments?: MutationFragments;
  shopifyShopId: string;
  language: LanguageCode;
  country: CountryCode;
  locale: string;
}

export type CartBuyerIdentityUpdateResponse = CartBuyerIdentityUpdatePayload &
  CartFragmentResponse;

export interface MutationCartBuyerIdentityUpdateResponse {
  cartBuyerIdentityUpdate: CartBuyerIdentityUpdateResponse;
}

export default async function CartBuyerIdentityUpdate({
  buyerIdentity,
  cartId,
  customFragments,
  gqlClient,
  shopifyShopId,
  language,
  country,
  locale
}: CartBuyerIdentityUpdateParams): Promise<void | CartResponse> {
  try {
    const shopifyResponse = await gqlClient<
      CartBuyerIdentityUpdateMutationVariables,
      MutationCartBuyerIdentityUpdateResponse
    >({
      query: mutations.CART_BUYER_IDENTITY_UPDATE(customFragments),
      variables: { cartId, buyerIdentity, language, country }
    }).catch((err) => {
      throw new Error(err);
    });

    const cart = await depaginateLines({
      cart: shopifyResponse.data?.cartBuyerIdentityUpdate.cart,
      customFragments,
      gqlClient,
      language,
      country
    });

    return formatCartResponse({
      cart,
      userErrors: shopifyResponse.data?.cartBuyerIdentityUpdate.userErrors,
      errors: shopifyResponse.errors,
      shopifyShopId,
      locale
    });
  } catch (err) {
    throw new Error(String(err));
  }
}
