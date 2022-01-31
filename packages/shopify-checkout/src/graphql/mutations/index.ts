import { gql } from '../../utils';
import {
  ShopifyCheckoutUserError,
  ShopifyCheckoutResponseProperties
} from '../../checkout-client.types';

export interface CheckoutCreateData {
  checkoutCreate: {
    checkout: ShopifyCheckoutResponseProperties | null;
    checkoutUserErrors: ShopifyCheckoutUserError[];
  };
}

export const checkoutCreate = gql`
  mutation checkoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        id
        webUrl
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`;

export interface CheckoutLineItemsReplaceData {
  checkoutLineItemsReplace: {
    checkout: ShopifyCheckoutResponseProperties | null;
    userErrors: ShopifyCheckoutUserError[];
  };
}

export const checkoutLineItemsReplace = gql`
  mutation checkoutLineItemsReplace(
    $lineItems: [CheckoutLineItemInput!]!
    $checkoutId: ID!
  ) {
    checkoutLineItemsReplace(lineItems: $lineItems, checkoutId: $checkoutId) {
      checkout {
        id
        webUrl
      }
      userErrors {
        code
        field
        message
      }
    }
  }
`;

export interface CheckoutAttributesUpdateData {
  checkoutAttributesUpdateV2: {
    checkout: ShopifyCheckoutResponseProperties | null;
    checkoutUserErrors: ShopifyCheckoutUserError[];
  };
}

export const checkoutAttributesUpdate = gql`
  mutation checkoutAttributesUpdate(
    $checkoutId: ID!
    $input: CheckoutAttributesUpdateV2Input!
  ) {
    checkoutAttributesUpdateV2(checkoutId: $checkoutId, input: $input) {
      checkout {
        id
        webUrl
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const checkoutDiscountCodeApplyV2 = gql`
  mutation checkoutDiscountCodeApplyV2(
    $checkoutId: ID!
    $discountCode: String!
  ) {
    checkoutDiscountCodeApplyV2(
      checkoutId: $checkoutId
      discountCode: $discountCode
    ) {
      checkout {
        id
        webUrl
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`;

export interface CheckoutDiscountCodeApplyV2Data {
  checkoutDiscountCodeApplyV2: {
    checkout: ShopifyCheckoutResponseProperties | null;
    checkoutUserErrors: ShopifyCheckoutUserError[];
  };
}
