import fragments from '../fragments/index.js';
export default /* GraphQL */ `
	query allContent($filter: ContentFilterInput) {
		allContent(filter: $filter) {
			pageInfo {
				hasNextPage
				endCursor
			}
			edges {
				cursor
				node {
					__typename
					...Content_content
				}
			}
		}
	}
	${fragments.CONTENT}
`;
