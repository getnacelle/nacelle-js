import fragments from '../fragments';

export default /* GraphQL */ `
  query Cart($id: ID!, $numCartLines: Int = 250, $country: CountryCode = ZZ)
  @inContext(country: $country) {
    cart(id: $id) {
      ...Cart_cart
    }
  }
  ${fragments.CART}
`;
