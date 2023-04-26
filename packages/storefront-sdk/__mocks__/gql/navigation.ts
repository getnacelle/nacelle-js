import type { NavigationQuery } from './operations.js';

export const navigationQuery = /* GraphQL */ `
	fragment NavigationItem_navigationItem on NavigationGroupItem {
		title
		type
		url
		media {
			url
		}
		properties {
			key
			value
		}
	}

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
	}
`;

const NavigationResult: NavigationQuery = {
	navigation: [
		{
			groupId: 'group-id'
		}
	]
};

export default NavigationResult;
