export default () => /* GraphQL */ `
  fragment Merchandise_merchandise on ProductVariant {
    id
    ...ProductVariant_extendCartLineMerchandise
  }
`;
