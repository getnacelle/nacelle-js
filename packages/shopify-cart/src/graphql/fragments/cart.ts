import merchandiseFragment from './merchandise';
import moneyFragment from './money';
import imageFragment from './image';

export default /* GraphQL */ `
  fragment Cart_cart on Cart {
    id
    checkoutUrl
    createdAt
    updatedAt
    buyerIdentity {
      countryCode
      customer {
        id
        email
        firstName
        lastName
        displayName
      }
      email
      phone
    }
    lines(first: $numCartLines) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      nodes {
        id
        quantity
        attributes {
          key
          value
        }
        cost {
          subtotalAmount {
            ...Money_money
          }
          totalAmount {
            ...Money_money
          }
          amountPerQuantity {
            ...Money_money
          }
          compareAtAmountPerQuantity {
            ...Money_money
          }
        }
        discountAllocations {
          ... on CartAutomaticDiscountAllocation {
            title
          }
          ... on CartCodeDiscountAllocation {
            code
          }
          discountedAmount {
            amount
            currencyCode
          }
        }
        merchandise {
          ...Merchandise_merchandise
        }
      }
    }
    cost {
      checkoutChargeAmount {
        ...Money_money
      }
      subtotalAmount {
        ...Money_money
      }
      subtotalAmountEstimated
      totalAmount {
        ...Money_money
      }
      totalAmountEstimated
      totalDutyAmount {
        ...Money_money
      }
      totalDutyAmountEstimated
      totalTaxAmount {
        ...Money_money
      }
      totalTaxAmountEstimated
    }
    note
    attributes {
      key
      value
    }
    discountCodes {
      code
    }
  }
  ${merchandiseFragment}
  ${moneyFragment}
  ${imageFragment}
`;
