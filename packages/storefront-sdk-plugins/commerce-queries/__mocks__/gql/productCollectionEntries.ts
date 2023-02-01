import type { ProductCollectionEntriesQuery } from '../../src/types/storefront.js';

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
								hasNextPage: true
							},
							edges: [
								{
									cursor: 'abcdefg',
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
								hasNextPage: true
							},
							edges: [
								{
									cursor: 'abcdefg',
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
