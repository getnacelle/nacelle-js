import defaultBuyerIdentity from './buyerIdentity';
import defaultDiscountAllocation from './discountAllocation';
import defaultExtendCart from './extendCart';
import defaultExtendCartLine from './extendCartLine';
import defaultMerchandise from './merchandise';
import defaultMoney from './money';
import type { CustomFragments } from '.';

export default (customFragments?: CustomFragments) => /* GraphQL */ `
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
      ...CartBuyerIdentity_buyerIdentity
    }
    lines(first: $numCartLines, after: $afterCursor) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
      }
      nodes {
        ...CartLine_extendCartLine
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
          ...CartDiscountAllocation_discountAllocation
        }
        merchandise {
          ... on ProductVariant {
            sourceEntryId: id
          }
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
  ${customFragments?.MERCHANDISE ?? defaultMerchandise()}
  ${customFragments?.BUYER_IDENTITY ?? defaultBuyerIdentity()}
  ${customFragments?.DISCOUNT_ALLOCATION ?? defaultDiscountAllocation()}
  ${customFragments?.EXTEND_CART ?? defaultExtendCart()}
  ${customFragments?.EXTEND_CART_LINE ?? defaultExtendCartLine()}
  ${customFragments?.MONEY ?? defaultMoney()}
`;
