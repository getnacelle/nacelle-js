import type { ProductCollectionEntriesQuery } from '../../src/graphql/documents.js';

import { mockProductNode } from './product.js';

export const mockPaginatedProductCollectionEntries: {
	data: ProductCollectionEntriesQuery;
} = {
	data: {
		allProductCollections: {
			edges: [
				{
					node: {
						productConnection: {
							pageInfo: {
								hasNextPage: true,
								endCursor: 'abcdefg'
							},
							edges: [
								{
									node: mockProductNode
								}
							]
						}
					}
				}
			]
		}
	}
};

export const mockUnpaginatedProductCollectionEntries: {
	data: ProductCollectionEntriesQuery;
} = {
	data: {
		allProductCollections: {
			edges: [
				{
					node: {
						productConnection: {
							pageInfo: {
								hasNextPage: false,
								endCursor: 'abcdefg'
							},
							edges: [
								{
									node: mockProductNode
								}
							]
						}
					}
				}
			]
		}
	}
};

export const mockEmptyProductCollectionEntries: {
	data: ProductCollectionEntriesQuery;
} = {
	data: {
		allProductCollections: {
			edges: []
		}
	}
};

export function buildProductCollectionEntriesResponse(
	{ nodeCount, hasNextPage } = { nodeCount: 2, hasNextPage: false }
): { data: ProductCollectionEntriesQuery } {
	const edges = [];
	for (let i = 0; i < nodeCount; i++) {
		edges.push({ cursor: `abcdefg_${i}`, node: mockProductNode });
	}
	return {
		data: {
			allProductCollections: {
				edges: [
					{
						node: {
							productConnection: {
								pageInfo: {
									hasNextPage,
									endCursor: `abcdefg_${nodeCount - 1}`
								},
								edges
							}
						}
					}
				]
			}
		}
	};
}
