export default /* GraphQL */ `
	query SpaceProperties {
		spaceProperties {
			properties {
				items {
					key
					value
				}
				namespace
			}
			updatedAt
			updatedBy
		}
	}
`;
