import defaultFragments from '../fragments';
import type { MutationFragments } from '.';

export default (
  customFragments: MutationFragments = {}
): string => /* GraphQL */ `
  mutation CartAttributesUpdate(
    $cartId: ID!
    $attributes: [AttributeInput!]!
    $numCartLines: Int = 250
    $afterCursor: String
    $country: CountryCode = ZZ
  ) @inContext(country: $country) {
    cartAttributesUpdate(attributes: $attributes, cartId: $cartId) {
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
