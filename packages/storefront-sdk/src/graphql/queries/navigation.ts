import fragments from '../fragments/index.js';

export default /* GraphQL */ `
	query Navigation($filter: NavigationFilterInput) {
		navigation(filter: $filter) {
			groupId
			title
			updatedAt
			updatedBy
			items {
				...NavigationItem_navigationItem
				items {
					...NavigationItem_navigationItem
					items {
						...NavigationItem_navigationItem
						items {
							...NavigationItem_navigationItem
							items {
								...NavigationItem_navigationItem
							}
						}
					}
				}
			}
		}
    ${fragments.NAVIGATION_ITEM}
	}
`;
