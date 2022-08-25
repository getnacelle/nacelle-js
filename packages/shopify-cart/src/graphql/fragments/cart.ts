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
      edges {
        cursor
        node {
          id
          quantity
          attributes {
            key
            value
          }
          estimatedCost {
            subtotalAmount {
              amount
              currencyCode
            }
            totalAmount {
              amount
              currencyCode
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
    }
    estimatedCost {
      subtotalAmount {
        ...Money_money
      }
      totalAmount {
        ...Money_money
      }
      totalDutyAmount {
        ...Money_money
      }
      totalTaxAmount {
        ...Money_money
      }
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
