import type { Product, AllProductsQuery } from '../../src/types/storefront.js';

export const mockProductNode: Product = {
	nacelleEntryId: 'product-1',
	metafields: [],
	sourceEntryId: 'test',
	sourceId: 'abcd',
	tags: [],
	variants: []
};

export const mockPaginatedProduct: { data: AllProductsQuery } = {
	data: {
		allProducts: {
			pageInfo: {
				hasNextPage: true,
				endCursor: 'abcdefg'
			},
			edges: [
				{
					cursor: 'abcdefg',
					node: mockProductNode
				}
			]
		}
	}
};

export const mockUnpaginatedProduct: { data: AllProductsQuery } = {
	data: {
		allProducts: {
			pageInfo: {
				hasNextPage: false,
				endCursor: 'abcdefg'
			},
			edges: [
				{
					cursor: 'abcdefg',
					node: mockProductNode
				}
			]
		}
	}
};

export function buildProductResponse(
	{ nodeCount, hasNextPage } = { nodeCount: 2, hasNextPage: false }
): { data: AllProductsQuery } {
	const edges = [];
	for (let i = 0; i < nodeCount; i++) {
		edges.push({ cursor: `abcdefg_${i}`, node: mockProductNode });
	}
	return {
		data: {
			allProducts: {
				pageInfo: {
					hasNextPage,
					endCursor: `abcdefg_${nodeCount - 1}`
				},
				edges
			}
		}
	};
}