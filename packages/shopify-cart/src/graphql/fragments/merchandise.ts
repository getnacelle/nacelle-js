export default () => /* GraphQL */ `
  fragment Merchandise_merchandise on ProductVariant {
    sourceEntryId: id
    ...ProductVariant_extendCartLineMerchandise
  }
`;
