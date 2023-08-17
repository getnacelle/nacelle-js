export default /* GraphQL */ `
	fragment ProductCollection_collection on ProductCollection {
		__typename
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
				cursor
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
`;
