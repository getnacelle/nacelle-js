export default () => /* GraphQL */ `
  fragment CartBuyerIdentity_buyerIdentity on CartBuyerIdentity {
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
`;
