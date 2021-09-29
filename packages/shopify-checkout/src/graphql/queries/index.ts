import { gql } from '~/utils';
import { GqlStringField } from '~/checkout-client.types';

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
        id
        webUrl
        completedAt
      }
    }
  }
`;
