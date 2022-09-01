export default () => /* GraphQL */ `
  fragment CartDiscountAllocation_discountAllocation on CartDiscountAllocation {
    discountedAmount {
      amount
      currencyCode
    }
    ... on CartAutomaticDiscountAllocation {
      title
      discountedAmount {
        amount
        currencyCode
      }
    }
    ... on CartCodeDiscountAllocation {
      code
      discountedAmount {
        amount
        currencyCode
      }
    }
    ... on CartCustomDiscountAllocation {
      title
      discountedAmount {
        amount
        currencyCode
      }
    }
  }
`;
