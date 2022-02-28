import { gql } from '../../utils';

const lineItem = gql`
  fragment CheckoutLineItem_lineItem on CheckoutLineItem {
    customAttributes {
      key
      value
    }
    discountAllocations {
      allocatedAmount {
        amount
        currencyCode
      }
    }
    id
    quantity
    title
    unitPrice {
      amount
      currencyCode
    }
    variant {
      id
    }
  }
`;

const discountApplication = gql`
  fragment DiscountApplication_discountApplication on DiscountApplication {
    allocationMethod
    targetSelection
    targetType
    ... on ScriptDiscountApplication {
      title
    }
    value {
      ... on MoneyV2 {
        amount
        currencyCode
      }
      ... on PricingPercentageValue {
        percentage
      }
    }
  }
`;

const checkout = gql`
  fragment Checkout_checkout on Checkout {
    id
    webUrl
    lineItems(first: 100) {
      edges {
        node {
          ...CheckoutLineItem_lineItem
        }
      }
    }
    discountApplications(first: 100) {
      edges {
        node {
          ...DiscountApplication_discountApplication
        }
      }
    }
  }
  ${lineItem}
  ${discountApplication}
`;

const userError = gql`
  fragment CheckoutUserError_checkoutUserError on CheckoutUserError {
    code
    field
    message
  }
`;

export default {
  CHECKOUT: checkout,
  USER_ERROR: userError
};
