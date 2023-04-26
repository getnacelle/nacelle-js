import { mockProductNode } from './product.js';
import type {
	ProductCollection,
	AllProductCollectionsQuery
} from '../../src/graphql/documents.js';

export const mockProductCollectionNode: ProductCollection = {
	nacelleEntryId: 'product-collection-1',
	sourceEntryId: 'test',
	sourceId: 'abcd',
	metafields: [],
	productConnection: {
		edges: [{ cursor: 'product-cursor-1', node: mockProductNode }],
		pageInfo: {
			endCursor: 'end-cursor-1',
			hasNextPage: false,
			hasPreviousPage: false,
			startCursor: 'start-cursor-1'
		}
	},
	products: [],
	tags: []
};

export const mockPaginatedProductCollection: {
	data: AllProductCollectionsQuery;
} = {
	data: {
		allProductCollections: {
			pageInfo: {
				hasNextPage: true,
				endCursor: 'abcdefg'
			},
			edges: [
				{
					cursor: 'abcdefg',
					node: mockProductCollectionNode
				}
			]
		}
	}
};

export const mockUnpaginatedProductCollection: {
	data: AllProductCollectionsQuery;
} = {
	data: {
		allProductCollections: {
			pageInfo: {
				hasNextPage: false,
				endCursor: 'abcdefg'
			},
			edges: [
				{
					cursor: 'abcdefg',
					node: mockProductCollectionNode
				}
			]
		}
	}
};

export function buildProductCollectionResponse(
	{ nodeCount, hasNextPage } = { nodeCount: 2, hasNextPage: false }
): { data: AllProductCollectionsQuery } {
	const edges = [];
	for (let i = 0; i < nodeCount; i++) {
		edges.push({ cursor: `abcdefg_${i}`, node: mockProductCollectionNode });
	}
	return {
		data: {
			allProductCollections: {
				pageInfo: {
					hasNextPage,
					endCursor: `abcdefg_${nodeCount - 1}`
				},
				edges
			}
		}
	};
}
