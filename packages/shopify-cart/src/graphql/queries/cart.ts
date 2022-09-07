import defaultFragments from '../fragments';
import type { CartFragments } from '../fragments/cart';

export default (customFragments: CartFragments = {}): string => /* GraphQL */ `
  query Cart(
    $id: ID!
    $numCartLines: Int = 250
    $afterCursor: String
    $country: CountryCode = ZZ
  ) @inContext(country: $country) {
    cart(id: $id) {
      ...Cart_cart
    }
  }
  ${defaultFragments.CART(customFragments)}
`;
