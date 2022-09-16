import defaultFragments from '../fragments';
import type { MutationFragments } from '.';

export default (
  customFragments: MutationFragments = {}
): string => /* GraphQL */ `
  mutation CartDiscountCodesUpdate(
    $cartId: ID!
    $discountCodes: [String!]
    $numCartLines: Int = 250
    $afterCursor: String
    $country: CountryCode = ZZ
    $language: LanguageCode = EN
  ) @inContext(country: $country, language: $language) {
    cartDiscountCodesUpdate(cartId: $cartId, discountCodes: $discountCodes) {
      cart {
        ...Cart_cart
      }
      userErrors {
        ...CartUserError_userErrors
      }
    }
  }
  ${defaultFragments.CART(customFragments)}
  ${customFragments.USER_ERRORS ?? defaultFragments.USER_ERRORS()}
`;
