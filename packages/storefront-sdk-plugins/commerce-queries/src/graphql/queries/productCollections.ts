export default /* GraphQL */ `
	query AllProductCollections(
		$filter: ProductCollectionFilterInput
		$maxReturnedEntriesPerCollection: Int
	) {
		allProductCollections(filter: $filter) {
			pageInfo {
				hasNextPage
				endCursor
			}
			edges {
				cursor
				node {
					...ProductCollection_collection
				}
			}
		}
	}
`;
