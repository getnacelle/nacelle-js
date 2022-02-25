import { gql } from '../../utils';
import { GqlStringField } from '../../checkout-client.types';
import fragments from '../fragments';

export interface CheckoutNode {
  id: GqlStringField;
  webUrl: GqlStringField;
  completedAt: GqlStringField;
}

export interface GetCheckoutData {
  node: CheckoutNode | null;
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
