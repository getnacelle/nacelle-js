import defaultFragments from '../fragments';
import type { CustomFragments } from '../fragments';

export default (
  customFragments: CustomFragments = {}
): string => /* GraphQL */ `
  mutation CartNoteUpdate(
    $cartId: ID!
    $note: String
    $numCartLines: Int = 250
    $afterCursor: String
    $country: CountryCode = ZZ
    $language: LanguageCode = EN
  ) @inContext(country: $country, language: $language) {
    cartNoteUpdate(cartId: $cartId, note: $note) {
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
