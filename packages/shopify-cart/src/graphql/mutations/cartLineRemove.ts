import defaultFragments from '../fragments';
import type { MutationFragments } from '.';

export default (
  customFragments: MutationFragments = {}
): string => /* GraphQL */ `
  mutation CartLineRemove(
    $cartId: ID!
    $lineIds: [ID!]!
    $numCartLines: Int = 250
    $afterCursor: String
    $country: CountryCode = ZZ
    $language: LanguageCode = EN
  ) @inContext(country: $country, language: $language) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
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
