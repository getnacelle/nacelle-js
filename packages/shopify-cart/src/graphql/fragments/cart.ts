import defaultDiscountAllocation from './discountAllocation';
import defaultExtendCart from './extendCart';
import defaultExtendCartLine from './extendCartLine';
import defaultImage from './image';
import defaultMerchandise from './merchandise';
import defaultMoney from './money';

export interface CartFragments {
  DISCOUNT_ALLOCATION?: string;
  EXTEND_CART?: string;
  EXTEND_CART_LINE?: string;
  IMAGE?: string;
  MERCHANDISE?: string;
  MONEY?: string;
}

export default (customFragments: CartFragments) => /* GraphQL */ `
  fragment Cart_cart on Cart {
    ...Cart_extendCart
    id
    checkoutUrl
    createdAt
    discountAllocations {
      ...CartDiscountAllocation_discountAllocation
    }
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
          ...CartLine_extendCartLine
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
            ...CartDiscountAllocation_discountAllocation
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
  ${customFragments.DISCOUNT_ALLOCATION ?? defaultDiscountAllocation}
  ${customFragments.EXTEND_CART ?? defaultExtendCart}
  ${customFragments.EXTEND_CART_LINE ?? defaultExtendCartLine}
  ${customFragments.IMAGE ?? defaultImage}
  ${customFragments.MERCHANDISE ?? defaultMerchandise}
  ${customFragments.MONEY ?? defaultMoney}
`;
