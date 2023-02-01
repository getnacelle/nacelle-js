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
					content {
						...CollectionContent_collectionContent
					}
					createdAt
					indexedAt
					metafields {
						...Metafield_metafield
					}
					nacelleEntryId
					productConnection(first: $maxReturnedEntriesPerCollection) {
						totalCount
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
					sourceEntryId
					sourceId
					tags
					updatedAt
				}
			}
		}
	}
`;
