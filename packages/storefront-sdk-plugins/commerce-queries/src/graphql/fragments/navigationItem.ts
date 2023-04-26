export default /* GraphQL */ `
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
`;
