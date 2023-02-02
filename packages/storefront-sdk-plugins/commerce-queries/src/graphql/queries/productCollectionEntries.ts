export default /* GraphQL */ `
	query ProductCollectionEntries(
		$filter: ProductCollectionFilterInput
		$entriesFirst: Int
		$entriesAfter: String
	) {
		allProductCollections(filter: $filter) {
			edges {
				node {
					productConnection(first: $entriesFirst, after: $entriesAfter) {
						pageInfo {
							hasNextPage
							endCursor
						}
						edges {
							node {
								...Product_product
							}
						}
					}
				}
			}
		}
	}
`;
