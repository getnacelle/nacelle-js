import { gql } from '~/utils';
import { Attribute, GqlStringField } from '~/checkout-client.types';

export interface CheckoutNode {
  id: GqlStringField;
  webUrl: GqlStringField;
  completedAt: GqlStringField;
  note: GqlStringField;
  customAttributes: Attribute[];
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
        note
        customAttributes {
          key
          value
        }
      }
    }
  }
`;
