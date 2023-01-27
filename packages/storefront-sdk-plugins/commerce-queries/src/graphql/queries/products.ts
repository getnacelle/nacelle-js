export default /* GraphQL */ `
	query allProducts($filter: ProductFilterInput) {
		allProducts(filter: $filter) {
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
	}
`;
