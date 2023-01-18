const spaceQuery = `{query {
  spaceProperties {
    properties {
      items {
        key
        value
      }
      namespace
    }
    updatedAt
    updatedBy
  }
}
}
`;

export default spaceQuery;
