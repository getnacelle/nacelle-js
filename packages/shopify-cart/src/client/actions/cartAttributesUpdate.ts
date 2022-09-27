import mutations from '../../graphql/mutations';
import { formatCartResponse, depaginateLines } from '../../utils';
import type {
  AttributeInput,
  CartAttributesUpdatePayload,
  CartAttributesUpdateMutationVariables,
  CountryCode,
  LanguageCode
} from '../../types/shopify.type';
import type { GqlClient } from '../../cart-client.types';
import type { CartResponse, CartFragmentResponse } from '../../types/cart.type';
import type { CustomFragments } from '../../graphql/fragments';

export interface UpdateCartAttributesParams {
  attributes: AttributeInput[];
  cartId: string;
  gqlClient: GqlClient;
  shopifyShopId: string;
  customFragments?: CustomFragments;
  language: LanguageCode;
  country: CountryCode;
  locale: string;
}

export type CartAttributesUpdateResponse = CartAttributesUpdatePayload &
  CartFragmentResponse;

export interface MutationCartAttributesUpdateResponse {
  cartAttributesUpdate: CartAttributesUpdateResponse;
}

export default async function cartAttributesUpdate({
  attributes,
  cartId,
  customFragments,
  gqlClient,
  shopifyShopId,
  language,
  country,
  locale
}: UpdateCartAttributesParams): Promise<void | CartResponse> {
  try {
    const shopifyResponse = await gqlClient<
      CartAttributesUpdateMutationVariables,
      MutationCartAttributesUpdateResponse
    >({
      query: mutations.CART_ATTRIBUTES_UPDATE(customFragments),
      variables: { cartId, attributes, language, country }
    }).catch((err) => {
      throw new Error(err);
    });

    const cart = await depaginateLines({
      cart: shopifyResponse.data?.cartAttributesUpdate?.cart,
      customFragments,
      gqlClient,
      language,
      country
    });

    return formatCartResponse({
      cart,
      userErrors: shopifyResponse.data?.cartAttributesUpdate?.userErrors,
      errors: shopifyResponse.errors,
      shopifyShopId,
      locale
    });
  } catch (err) {
    throw new Error(String(err));
  }
}
