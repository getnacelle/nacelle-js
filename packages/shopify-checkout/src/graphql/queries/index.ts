import { gql } from '@manifoldco/gql-zero';

import { Attribute } from '~/checkout-client.types';
type Field = string | null;

export interface GetCheckoutData {
  node: {
    id: Field;
    webUrl: Field;
    completedAt: Field;
    note: Field;
    customAttributes: Attribute[] | null;
  };
}

const getCheckout = gql`
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

export default { getCheckout };
