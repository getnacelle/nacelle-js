export default /* GraphQL */ `
	query productCollectionEntries(
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
						}
						edges {
							cursor
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
