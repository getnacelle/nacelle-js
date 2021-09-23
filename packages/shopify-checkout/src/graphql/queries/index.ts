import { gql } from '@manifoldco/gql-zero';

import { Attribute, GqlStringField } from '~/checkout-client.types';

export interface GetCheckoutData {
  node: {
    id: GqlStringField;
    webUrl: GqlStringField;
    completedAt: GqlStringField;
    note: GqlStringField;
    customAttributes: Attribute[] | null;
  };
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
