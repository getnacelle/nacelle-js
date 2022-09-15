import defaultBuyerIdentity from './buyerIdentity';
import defaultDiscountAllocation from './discountAllocation';
import defaultExtendCart from './extendCart';
import defaultExtendCartLine from './extendCartLine';
import defaultMerchandise from './merchandise';
import defaultMoney from './money';

export interface CartFragments {
  // NOTE: @index directives are for the 'Generate Index' VSCode Extension (jayfong.generate-index)
  //  once the 'Generate Index' extension is installed,
  //  open the command palette with Command+Shift+P / Ctrl+Shift+P,
  //  then search for & select 'Generate Index'

  // @index('./!(*.spec|index|userErrors).ts', (f, _) => `${_.constantCase(f.name)}?: string;`)
  BUYER_IDENTITY?: string;
  DISCOUNT_ALLOCATION?: string;
  EXTEND_CART?: string;
  EXTEND_CART_LINE?: string;
  MERCHANDISE?: string;
  MONEY?: string;
  // @endindex
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
            id
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
