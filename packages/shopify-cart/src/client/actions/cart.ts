import queries from '../../graphql/queries';
import { formatCartResponse, depaginateLines } from '../../utils';
import type { CartResponse } from '../../types/cart.type';
import type { CustomFragments } from '../../graphql/fragments';
import type {
  CartQueryVariables,
  Cart_CartFragment,
  LanguageCode,
  CountryCode
} from '../../types/shopify.type';
import type { GqlClient } from '../../cart-client.types';
import type { ShopifyError } from '../../types/errors.type';

export interface CartParams {
  cartId: string;
  gqlClient: GqlClient;
  shopifyShopId: string;
  customFragments?: CustomFragments;
  language: LanguageCode;
  country: CountryCode;
  locale: string;
}

export interface ShopifyCartResponse {
  cart?: Cart_CartFragment;
  errors?: ShopifyError[];
}

export default async function cart({
  cartId,
  customFragments,
  gqlClient,
  shopifyShopId,
  language,
  country,
  locale
}: CartParams): Promise<void | CartResponse> {
  try {
    const shopifyResponse = await gqlClient<
      CartQueryVariables,
      ShopifyCartResponse
    >({
      query: queries.CART(customFragments),
      variables: { id: cartId, language, country }
    }).catch((err) => {
      throw new Error(err);
    });

    const cart = await depaginateLines({
      cart: shopifyResponse.data?.cart,
      customFragments,
      gqlClient,
      language,
      country
    });

    return formatCartResponse({
      cart,
      userErrors: null,
      errors: shopifyResponse.errors,
      shopifyShopId,
      locale
    });
  } catch (err) {
    throw new Error(String(err));
  }
}
