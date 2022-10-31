import mutations from '../../graphql/mutations';
import { formatCartResponse, depaginateLines } from '../../utils';
import type {
  CartSelectedDeliveryOptionInput,
  CartSelectedDeliveryOptionsUpdateMutationVariables,
  CartSelectedDeliveryOptionsUpdatePayload,
  LanguageCode,
  CountryCode
} from '../../types/shopify.type';
import type { CustomFragments } from '../../graphql/fragments';
import type { CartResponse, CartFragmentResponse } from '../../types/cart.type';
import type { GqlClient } from '../../cart-client.types';

export interface UpdateCartSelectedDeliveryOptionsParams {
  cartId: string;
  gqlClient: GqlClient;
  selectedDeliveryOptions: CartSelectedDeliveryOptionInput[];
  shopifyShopId: string;
  customFragments?: CustomFragments;
  language: LanguageCode;
  country: CountryCode;
  locale: string;
}

export type CartSelectedDeliveryOptionsResponse =
  CartSelectedDeliveryOptionsUpdatePayload & CartFragmentResponse;

export interface MutationCartSelectedDeliveryOptionsResponse {
  cartSelectedDeliveryOptionsUpdate: CartSelectedDeliveryOptionsResponse;
}

export default async function cartSelectedDeliveryOptionsUpdate({
  cartId,
  customFragments,
  gqlClient,
  selectedDeliveryOptions,
  shopifyShopId,
  language,
  country,
  locale
}: UpdateCartSelectedDeliveryOptionsParams): Promise<void | CartResponse> {
  try {
    const shopifyResponse = await gqlClient<
      CartSelectedDeliveryOptionsUpdateMutationVariables,
      MutationCartSelectedDeliveryOptionsResponse
    >({
      query: mutations.CART_SELECTED_DELIVERY_OPTIONS_UPDATE(customFragments),
      variables: { cartId, selectedDeliveryOptions, language, country }
    }).catch((err) => {
      throw new Error(err);
    });

    const cart = await depaginateLines({
      cart: shopifyResponse.data?.cartSelectedDeliveryOptionsUpdate?.cart,
      customFragments,
      gqlClient,
      language,
      country
    });

    return formatCartResponse({
      cart,
      userErrors:
        shopifyResponse.data?.cartSelectedDeliveryOptionsUpdate?.userErrors,
      errors: shopifyResponse.errors,
      shopifyShopId,
      locale
    });
  } catch (err) {
    throw new Error(String(err));
  }
}
