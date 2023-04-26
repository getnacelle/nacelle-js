import type { SpacePropertiesQuery } from '../../src/graphql/documents.js';

const SpacePropertiesResult: SpacePropertiesQuery = {
	spaceProperties: {
		properties: [{ namespace: 'xxx', items: [{ key: 'abc', value: 'def' }] }]
	}
};

export default SpacePropertiesResult;
