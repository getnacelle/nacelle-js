import defaultBuyerIdentity from './buyerIdentity';
import defaultDiscountAllocation from './discountAllocation';
import defaultExtendCart from './extendCart';
import defaultExtendCartLine from './extendCartLine';
import defaultExtendCartLineMerchandise from './extendCartLineMerchandise';
import defaultMerchandise from './merchandise';
import defaultMoney from './money';

export interface CartFragments {
  BUYER_IDENTITY?: string;
  DISCOUNT_ALLOCATION?: string;
  EXTEND_CART?: string;
  EXTEND_CART_LINE?: string;
  EXTEND_CART_LINE_MERCHANDISE?: string;
  MONEY?: string;
}

export default (customFragments?: CartFragments) => /* GraphQL */ `
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
    lines(first: $numCartLines) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      nodes {
        ...CartLine_extendCartLine
        id
        nacelleEntryId: attribute(key: "nacelleEntryId") {
          value
        }
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
  ${defaultMerchandise()}
  ${customFragments?.BUYER_IDENTITY ?? defaultBuyerIdentity()}
  ${customFragments?.DISCOUNT_ALLOCATION ?? defaultDiscountAllocation()}
  ${customFragments?.EXTEND_CART ?? defaultExtendCart()}
  ${customFragments?.EXTEND_CART_LINE ?? defaultExtendCartLine()}
  ${customFragments?.EXTEND_CART_LINE_MERCHANDISE ??
  defaultExtendCartLineMerchandise()}
  ${customFragments?.MONEY ?? defaultMoney()}
`;
