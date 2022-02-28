import { gql } from '../../utils';
import { ShopifyCheckoutResponseProperties } from '../../checkout-client.types';
import fragments from '../fragments';
export interface GetCheckoutData {
  node: ShopifyCheckoutResponseProperties | null;
}

export const getCheckout = gql`
  query getCheckout($id: ID!) {
    node(id: $id) {
      ... on Checkout {
        ...Checkout_checkout
      }
    }
  }
  ${fragments.CHECKOUT}
`;
