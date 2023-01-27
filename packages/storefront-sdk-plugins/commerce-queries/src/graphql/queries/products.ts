export default /* GraphQL */ `
	query allProducts($filter: ProductFilterInput) {
		allProducts(filter: $filter) {
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
`;
