export const mockContentNode = {
	createdAt: 1637098847,
	fields: { customField: 'foobar' },
	handle: 'nacelle-page',
	indexedAt: 1637098847,
	locale: 'en-us',
	nacelleEntryId: 'abcdefg',
	published: true,
	sourceEntryId: 'cms-source-id-123',
	sourceId: 'content-source-entry-id-1',
	title: 'Mock Page',
	type: 'page',
	tags: ['red', 'green'],
	updatedAt: 1637098847
};

export const mockPaginatedContent = {
	data: {
		allContent: {
			pageInfo: {
				hasNextPage: true,
				endCursor: 'abcdefg'
			},
			edges: [
				{
					cursor: 'abcdefg',
					node: mockContentNode
				}
			]
		}
	}
};

export const mockUnpaginatedContent = {
	data: {
		allContent: {
			pageInfo: {
				hasNextPage: false,
				endCursor: 'abcdefg'
			},
			edges: [
				{
					cursor: 'abcdefg',
					node: mockContentNode
				}
			]
		}
	}
};

export function buildContentResponse(
	{ nodeCount, hasNextPage } = { nodeCount: 2, hasNextPage: false }
) {
	const edges = [];
	for (let i = 0; i < nodeCount; i++) {
		edges.push({ cursor: `abcdefg_${i}`, node: mockContentNode });
	}
	return {
		data: {
			allContent: {
				pageInfo: {
					hasNextPage,
					endCursor: `abcdefg_${nodeCount - 1}`
				},
				edges
			}
		}
	};
}
