/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { expect, it, beforeEach, describe, vi, expectTypeOf } from 'vitest';
import commerceQueriesPlugin from './index.js';
import { StorefrontClient } from '@nacelle/storefront-sdk';
import getFetchPayload from '../__mocks__/utils/getFetchPayload.js';
import SpacePropertiesResult from '../__mocks__/gql/spaceProperties.js';
import NavigationResult from '../__mocks__/gql/navigation.js';
import {
	buildContentResponse,
	mockPaginatedContent,
	mockUnpaginatedContent
} from '../__mocks__/gql/content.js';
import {
	buildProductResponse,
	mockPaginatedProduct,
	mockUnpaginatedProduct
} from '../__mocks__/gql/product.js';
import {
	buildProductCollectionEntriesResponse,
	mockPaginatedProductCollectionEntries,
	mockUnpaginatedProductCollectionEntries,
	mockEmptyProductCollectionEntries
} from '../__mocks__/gql/productCollectionEntries.js';
import {
	buildProductCollectionResponse,
	mockPaginatedProductCollection,
	mockUnpaginatedProductCollection
} from '../__mocks__/gql/productCollections.js';
import { highEntriesPerPageMessage } from './utils/messages.js';
import type { Mock } from 'vitest';
import type {
	Content,
	ContentEdge,
	NavigationGroup,
	Product,
	ProductCollection,
	ProductCollectionEdge,
	ProductEdge,
	SpaceProperties
} from './types/storefront.js';

type mockRequestArgs = [RequestInfo | URL, RequestInit | undefined];

const storefrontEndpoint =
	'https://storefront.api.nacelle.com/graphql/v1/spaces/my-space-id';

const mockedFetch: Mock<mockRequestArgs, Promise<Response>> = vi.fn();

const ClientWithCommerceQueries = commerceQueriesPlugin(StorefrontClient);
const client = new ClientWithCommerceQueries({
	storefrontEndpoint,
	fetchClient: mockedFetch as (
		input: RequestInfo | URL,
		init?: RequestInit | undefined
	) => Promise<Response>,
	advancedOptions: { enableApq: false }
});

it('does not error when composed with the `StorefrontClient` class', () => {
	expect(
		() => new ClientWithCommerceQueries({ storefrontEndpoint })
	).not.toThrow();
});

it('adds the expected methods to the `StorefrontClient` class', () => {
	expect(typeof client.content).toBe('function');
	expect(typeof client.navigation).toBe('function');
	expect(typeof client.productCollectionEntries).toBe('function');
	expect(typeof client.productCollections).toBe('function');
	expect(typeof client.products).toBe('function');
	expect(typeof client.spaceProperties).toBe('function');
});

describe('spaceProperties', () => {
	beforeEach(() => mockedFetch.mockRestore());

	it('returns data of the expected type', async () => {
		mockedFetch.mockResolvedValueOnce(
			getFetchPayload({ data: SpacePropertiesResult })
		);

		const data = await client.spaceProperties();

		expectTypeOf(data).toMatchTypeOf<SpaceProperties>();
	});

	it('fetches `spaceProperties` with the appropriate query', async () => {
		mockedFetch.mockResolvedValueOnce(
			getFetchPayload({ data: SpacePropertiesResult })
		);

		await client.spaceProperties();

		expect(mockedFetch).toHaveBeenCalledOnce();
		expect(mockedFetch).toHaveBeenCalledWith(
			storefrontEndpoint,
			expect.objectContaining({
				body: expect.stringContaining('spaceProperties') as string
			})
		);
	});

	it('should throw an error if one of the requests errors', async () => {
		mockedFetch.mockResolvedValueOnce(
			getFetchPayload({
				errors: [
					{
						message: 'xxx',
						extensions: { code: 'COMPLEXITY_ERROR' }
					}
				]
			})
		);
		await expect(client.spaceProperties()).rejects.toThrow('xxx');
	});
});

describe('navigation', () => {
	beforeEach(() => mockedFetch.mockRestore());

	it('returns data of the expected type', async () => {
		mockedFetch.mockResolvedValueOnce(
			getFetchPayload({ data: NavigationResult })
		);
		const data = await client.navigation();

		expectTypeOf(data).toMatchTypeOf<NavigationGroup[]>();
	});

	it('fetches `navigation` with the appropriate query', async () => {
		mockedFetch.mockResolvedValueOnce(
			getFetchPayload({ data: NavigationResult })
		);

		await client.navigation({ groupId: 'groupId' });

		expect(mockedFetch).toHaveBeenCalledOnce();
		expect(mockedFetch).toHaveBeenCalledWith(
			storefrontEndpoint,
			expect.objectContaining({
				body: expect.stringMatching('(?=.*navigation)(?=.*groupId)') as string
			})
		);
	});

	it('should throw an error if one of the requests errors', async () => {
		mockedFetch.mockResolvedValueOnce(
			getFetchPayload({
				errors: [
					{
						message: 'xxx',
						extensions: { code: 'xxx' }
					}
				]
			})
		);
		await expect(client.navigation()).rejects.toThrow();
	});
});

describe('content', () => {
	beforeEach(() => {
		mockedFetch.mockRestore();
		mockedFetch.mockImplementation(() =>
			Promise.resolve(getFetchPayload(mockUnpaginatedContent))
		);
	});

	it('returns data of the expected type', async () => {
		const defaultData = await client.content();
		const explicitNodesData = await client.content({ edgesToNodes: true });
		const explicitEdgesData = await client.content({ edgesToNodes: false });

		expectTypeOf(defaultData).toMatchTypeOf<Content[]>();
		expectTypeOf(explicitNodesData).toMatchTypeOf<Content[]>();
		expectTypeOf(explicitEdgesData).toMatchTypeOf<ContentEdge[]>();
	});

	it('should pass parameters including the `nacelleEntryId` as variables', async () => {
		await client.content({
			advancedOptions: {
				entriesPerPage: 5
			},
			cursor: 'abc',
			nacelleEntryIds: ['abcdefg_1']
		});
		const [url, argRequestInit]: mockRequestArgs = mockedFetch.mock.lastCall!;
		expect(url).toBe(storefrontEndpoint);
		expect(JSON.parse(argRequestInit?.body?.toString() ?? '')).toMatchObject({
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			query: expect.stringContaining('allContent'),
			variables: {
				filter: { after: 'abc', first: 5, nacelleEntryIds: ['abcdefg_1'] }
			}
		});
	});

	it('should pass parameters including the `handles` as variables', async () => {
		await client.content({
			advancedOptions: {
				entriesPerPage: 5
			},
			cursor: 'abc',
			handles: ['abcdefg']
		});
		const [url, argRequestInit]: mockRequestArgs = mockedFetch.mock.lastCall!;
		expect(url).toBe(storefrontEndpoint);
		expect(JSON.parse(argRequestInit?.body?.toString() ?? '')).toMatchObject({
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			query: expect.stringContaining('allContent'),
			variables: {
				filter: { after: 'abc', first: 5, handles: ['abcdefg'] }
			}
		});
	});

	it('should only include `nacelleEntryIds` if both `nacelleEntryIds` & `handles` are passed', async () => {
		await client.content({
			advancedOptions: {
				entriesPerPage: 5
			},
			cursor: 'abc',
			handles: ['abcdefg'],
			nacelleEntryIds: ['abcdefg_1']
		});
		const [url, argRequestInit]: mockRequestArgs = mockedFetch.mock.lastCall!;
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const requestBody = JSON.parse(argRequestInit?.body?.toString() ?? '');
		expect(url).toBe(storefrontEndpoint);
		expect(requestBody).toMatchObject({
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			query: expect.stringContaining('allContent'),
			variables: {
				filter: { after: 'abc', first: 5, nacelleEntryIds: ['abcdefg_1'] }
			}
		});
		expect(requestBody).not.toMatchObject({
			variables: { filter: { handles: ['abcdefg'] } }
		});
	});

	it('should set `first` based on `entriesPerPage` and `maxReturnedEntries`', async () => {
		await client.content({
			advancedOptions: {
				entriesPerPage: 5
			},
			maxReturnedEntries: 2
		});
		expect(
			JSON.parse(mockedFetch.mock.lastCall![1]?.body?.toString() ?? '')
		).toMatchObject({ variables: { filter: { first: 2 } } });

		mockedFetch.mockRestore();
		mockedFetch.mockResolvedValue(getFetchPayload(mockUnpaginatedContent));

		await client.content({
			advancedOptions: {
				entriesPerPage: 5
			},
			maxReturnedEntries: 10
		});
		expect(
			JSON.parse(mockedFetch.mock.lastCall![1]?.body?.toString() ?? '')
		).toMatchObject({
			variables: {
				filter: { first: 5 }
			}
		});
		expect(mockedFetch).toBeCalledTimes(1);
	});

	it('should return edges if `edgesToNodes` is `false`', async () => {
		const response = await client.content({
			edgesToNodes: false
		});

		expect(response).toMatchObject(
			mockUnpaginatedContent.data.allContent.edges
		);
	});

	it('should fetch until `hasNextPage === false` if `maxReturnedEntries === -1`', async () => {
		mockedFetch
			.mockResolvedValueOnce(getFetchPayload(mockPaginatedContent))
			.mockResolvedValueOnce(getFetchPayload(mockPaginatedContent))
			.mockResolvedValueOnce(getFetchPayload(mockPaginatedContent));

		const response = await client.content({ maxReturnedEntries: -1 });

		expect(mockedFetch).toBeCalledTimes(4);
		// number of edges should be equal to 3 paginated responses + 1 unpaginated responses
		expect(response.length).toBe(
			3 * mockPaginatedContent.data.allContent.edges.length +
				mockUnpaginatedContent.data.allContent.edges.length
		);
	});

	it('should stop paginating when the `length` is the value of `maxReturnedEntries`', async () => {
		mockedFetch.mockImplementation(() =>
			Promise.resolve(
				getFetchPayload(
					buildContentResponse({ nodeCount: 5, hasNextPage: true })
				)
			)
		);

		const response = await client.content({
			maxReturnedEntries: 15
		});
		expect(mockedFetch).toBeCalledTimes(3);
		expect(response.length).toBe(15);
	});

	it('should throw an error if one of the requests errors', async () => {
		mockedFetch
			.mockResolvedValueOnce(getFetchPayload(mockPaginatedContent))
			.mockResolvedValueOnce(
				getFetchPayload({ error: { message: 'GraphQL error' } })
			);

		await expect(client.content()).rejects.toThrow();
		expect(mockedFetch).toBeCalledTimes(2);
	});

	it('should issue a warning when an excessively high `entriesPerPage` value is provided', async () => {
		const warnSpy = vi.spyOn(console, 'warn');
		await client.content();
		expect(warnSpy).toHaveBeenCalledTimes(0);
		mockedFetch.mockRestore();
		mockedFetch.mockResolvedValue(getFetchPayload(mockUnpaginatedContent));
		await client.content({
			advancedOptions: {
				entriesPerPage: 101
			}
		});
		expect(warnSpy).toHaveBeenCalledTimes(1);
		expect(warnSpy).toHaveBeenCalledWith(highEntriesPerPageMessage);
	});
});

describe('products', () => {
	beforeEach(() => {
		mockedFetch.mockRestore();
		mockedFetch.mockImplementation(() =>
			Promise.resolve(getFetchPayload(mockUnpaginatedProduct))
		);
	});

	it('returns data of the expected type', async () => {
		const defaultData = await client.products();
		const explicitNodesData = await client.products({ edgesToNodes: true });
		const explicitEdgesData = await client.products({ edgesToNodes: false });

		expectTypeOf(defaultData).toMatchTypeOf<Product[]>();
		expectTypeOf(explicitNodesData).toMatchTypeOf<Product[]>();
		expectTypeOf(explicitEdgesData).toMatchTypeOf<ProductEdge[]>();
	});

	it('should pass parameters including the `nacelleEntryId` as variables', async () => {
		await client.products({
			advancedOptions: {
				entriesPerPage: 5
			},
			cursor: 'abc',
			nacelleEntryIds: ['abcdefg_1']
		});
		const [url, argRequestInit]: mockRequestArgs = mockedFetch.mock.lastCall!;
		expect(url).toBe(storefrontEndpoint);
		expect(JSON.parse(argRequestInit?.body?.toString() ?? '')).toMatchObject({
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			query: expect.stringContaining('allProducts'),
			variables: {
				filter: { after: 'abc', first: 5, nacelleEntryIds: ['abcdefg_1'] }
			}
		});
	});

	it('should pass parameters including the `handles` as variables', async () => {
		await client.products({
			advancedOptions: {
				entriesPerPage: 5
			},
			cursor: 'abc',
			handles: ['abcdefg']
		});
		const [url, argRequestInit]: mockRequestArgs = mockedFetch.mock.lastCall!;
		expect(url).toBe(storefrontEndpoint);
		expect(JSON.parse(argRequestInit?.body?.toString() ?? '')).toMatchObject({
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			query: expect.stringContaining('allProducts'),
			variables: {
				filter: { after: 'abc', first: 5, handles: ['abcdefg'] }
			}
		});
	});

	it('should only include `nacelleEntryIds` if both `nacelleEntryIds` & `handles` are passed', async () => {
		await client.products({
			advancedOptions: {
				entriesPerPage: 5
			},
			cursor: 'abc',
			handles: ['abcdefg'],
			nacelleEntryIds: ['abcdefg_1']
		});
		const [url, argRequestInit]: mockRequestArgs = mockedFetch.mock.lastCall!;
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const requestBody = JSON.parse(argRequestInit?.body?.toString() ?? '');
		expect(url).toBe(storefrontEndpoint);
		expect(requestBody).toMatchObject({
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			query: expect.stringContaining('allProducts'),
			variables: {
				filter: { after: 'abc', first: 5, nacelleEntryIds: ['abcdefg_1'] }
			}
		});
		expect(requestBody).not.toMatchObject({
			variables: { filter: { handles: ['abcdefg'] } }
		});
	});

	it('should set `first` based on `entriesPerPage` and `maxReturnedEntries`', async () => {
		await client.products({
			advancedOptions: {
				entriesPerPage: 5
			},
			maxReturnedEntries: 2
		});
		// since apq doesn't hash variables, can just get variables param off the url instead of mocking an apq error and getting it from the body.
		expect(
			JSON.parse(mockedFetch.mock.lastCall![1]?.body?.toString() ?? '')
		).toMatchObject({ variables: { filter: { first: 2 } } });
		mockedFetch.mockRestore();
		mockedFetch.mockResolvedValue(getFetchPayload(mockUnpaginatedProduct));
		await client.products({
			advancedOptions: {
				entriesPerPage: 5
			},
			maxReturnedEntries: 10
		});
		expect(
			JSON.parse(mockedFetch.mock.lastCall![1]?.body?.toString() ?? '')
		).toMatchObject({ variables: { filter: { first: 5 } } });
		expect(mockedFetch).toHaveBeenCalledOnce();
	});

	it('should return edges if `edgesToNodes` is `false`', async () => {
		const response = await client.products({
			edgesToNodes: false
		});

		expect(response).toMatchObject(
			mockUnpaginatedProduct.data.allProducts.edges
		);
	});

	it('should fetch until `hasNextPage === false` if `maxReturnedEntries === -1`', async () => {
		mockedFetch
			.mockResolvedValueOnce(getFetchPayload(mockPaginatedProduct))
			.mockResolvedValueOnce(getFetchPayload(mockPaginatedProduct))
			.mockResolvedValueOnce(getFetchPayload(mockPaginatedProduct));

		const response = await client.products({
			maxReturnedEntries: -1
		});

		expect(mockedFetch).toBeCalledTimes(4);
		// number of edges should be equal to 3 paginated responses + 1 unpaginated responses
		expect(response.length).toBe(
			3 * mockPaginatedProduct.data.allProducts.edges.length +
				mockUnpaginatedProduct.data.allProducts.edges.length
		);
	});

	it('should stop paginating when the `length` is the value of `maxReturnedEntries`', async () => {
		mockedFetch.mockImplementation(() =>
			Promise.resolve(
				getFetchPayload(
					buildProductResponse({ nodeCount: 5, hasNextPage: true })
				)
			)
		);

		const response = await client.products({
			maxReturnedEntries: 15
		});
		expect(mockedFetch).toBeCalledTimes(3);
		expect(response.length).toBe(15);
	});

	it('should throw an error if one of the requests errors', async () => {
		mockedFetch
			.mockResolvedValueOnce(getFetchPayload(mockPaginatedProduct))
			.mockResolvedValueOnce(
				getFetchPayload({ error: { message: 'GraphQL error' } })
			);
		await expect(client.products()).rejects.toThrow();
		expect(mockedFetch).toBeCalledTimes(2);
	});

	it('should issue a warning when an excessively high `entriesPerPage` value is provided', async () => {
		const warnSpy = vi.spyOn(console, 'warn');
		await client.products();
		expect(warnSpy).toHaveBeenCalledTimes(0);

		mockedFetch.mockRestore();
		mockedFetch.mockResolvedValue(getFetchPayload(mockUnpaginatedProduct));

		await client.products({
			advancedOptions: {
				entriesPerPage: 101
			}
		});
		expect(warnSpy).toHaveBeenCalledTimes(1);
		expect(warnSpy).toHaveBeenCalledWith(highEntriesPerPageMessage);
	});
});

describe('productCollections', () => {
	beforeEach(() => {
		mockedFetch.mockRestore();
		mockedFetch.mockImplementation(() =>
			Promise.resolve(getFetchPayload(mockUnpaginatedProductCollection))
		);
	});

	it('returns data of the expected type', async () => {
		const defaultData = await client.productCollections();
		const explicitNodesData = await client.productCollections({
			edgesToNodes: true
		});
		const explicitEdgesData = await client.productCollections({
			edgesToNodes: false
		});

		expectTypeOf(defaultData).toMatchTypeOf<ProductCollection[]>();
		expectTypeOf(explicitNodesData).toMatchTypeOf<ProductCollection[]>();
		expectTypeOf(explicitEdgesData).toMatchTypeOf<ProductCollectionEdge[]>();
	});

	it('should pass parameters including the `nacelleEntryId` as variables', async () => {
		await client.productCollections({
			advancedOptions: {
				entriesPerPage: 5
			},
			cursor: 'abc',
			nacelleEntryIds: ['abcdefg_1']
		});
		const [url, argRequestInit]: mockRequestArgs = mockedFetch.mock.lastCall!;
		expect(url).toBe(storefrontEndpoint);
		expect(JSON.parse(argRequestInit?.body?.toString() ?? '')).toMatchObject({
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			query: expect.stringContaining('allProductCollections'),
			variables: {
				filter: { after: 'abc', first: 5, nacelleEntryIds: ['abcdefg_1'] }
			}
		});
	});

	it('should pass parameters including the `handles` as variables', async () => {
		await client.productCollections({
			advancedOptions: {
				entriesPerPage: 5
			},
			cursor: 'abc',
			handles: ['abcdefg']
		});
		const [url, argRequestInit]: mockRequestArgs = mockedFetch.mock.lastCall!;
		expect(url).toBe(storefrontEndpoint);
		expect(JSON.parse(argRequestInit?.body?.toString() ?? '')).toMatchObject({
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			query: expect.stringContaining('allProductCollections'),
			variables: {
				filter: { after: 'abc', first: 5, handles: ['abcdefg'] }
			}
		});
	});

	it('should pass parameters including the `maxReturnedEntriesPerCollection` as variables', async () => {
		await client.productCollections({
			maxReturnedEntries: 2,
			maxReturnedEntriesPerCollection: 5
		});
		const [url, argRequestInit]: mockRequestArgs = mockedFetch.mock.lastCall!;
		expect(url).toBe(storefrontEndpoint);
		expect(JSON.parse(argRequestInit?.body?.toString() ?? '')).toMatchObject({
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			query: expect.stringContaining('allProductCollections'),
			variables: {
				filter: { first: 2 },
				maxReturnedEntriesPerCollection: 5
			}
		});
	});

	it('should only include `nacelleEntryIds` if both `nacelleEntryIds` & `handles` are passed', async () => {
		await client.productCollections({
			advancedOptions: {
				entriesPerPage: 5
			},
			cursor: 'abc',
			handles: ['abcdefg'],
			nacelleEntryIds: ['abcdefg_1']
		});
		const [url, argRequestInit]: mockRequestArgs = mockedFetch.mock.lastCall!;
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const requestBody = JSON.parse(argRequestInit?.body?.toString() ?? '');
		expect(url).toBe(storefrontEndpoint);
		expect(requestBody).toMatchObject({
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			query: expect.stringContaining('allProductCollections'),
			variables: {
				filter: { after: 'abc', first: 5, nacelleEntryIds: ['abcdefg_1'] }
			}
		});
		expect(requestBody).not.toMatchObject({
			variables: { filter: { handles: ['abcdefg'] } }
		});
	});

	it('should set `first` based on `entriesPerPage` and `maxReturnedEntries`', async () => {
		await client.productCollections({
			advancedOptions: {
				entriesPerPage: 5
			},
			maxReturnedEntries: 2
		});
		expect(
			JSON.parse(mockedFetch.mock.lastCall![1]?.body?.toString() ?? '')
		).toMatchObject({ variables: { filter: { first: 2 } } });
		mockedFetch.mockRestore();
		mockedFetch.mockResolvedValue(
			getFetchPayload(mockUnpaginatedProductCollection)
		);
		await client.productCollections({
			advancedOptions: {
				entriesPerPage: 5
			},
			maxReturnedEntries: 10
		});
		expect(
			JSON.parse(mockedFetch.mock.lastCall![1]?.body?.toString() ?? '')
		).toMatchObject({ variables: { filter: { first: 5 } } });
		expect(mockedFetch).toBeCalledTimes(1);
	});

	it('should return edges if `edgesToNodes` is `false`', async () => {
		const response = await client.productCollections({
			edgesToNodes: false
		});

		expect(response).toMatchObject(
			mockUnpaginatedProductCollection.data.allProductCollections.edges
		);
	});

	it('should fetch until `hasNextPage === false` if `maxReturnedEntries === -1`', async () => {
		mockedFetch;
		mockedFetch
			.mockResolvedValueOnce(getFetchPayload(mockPaginatedProductCollection))
			.mockResolvedValueOnce(getFetchPayload(mockPaginatedProductCollection))
			.mockResolvedValueOnce(getFetchPayload(mockPaginatedProductCollection));

		const response = await client.productCollections({
			maxReturnedEntries: -1
		});

		expect(mockedFetch).toBeCalledTimes(4);
		// number of edges should be equal to 3 paginated responses + 1 unpaginated responses
		expect(response.length).toBe(
			3 *
				mockPaginatedProductCollection.data.allProductCollections.edges.length +
				mockUnpaginatedProductCollection.data.allProductCollections.edges.length
		);
	});

	it('should stop paginating when the `length` is the value of `maxReturnedEntries`', async () => {
		mockedFetch.mockImplementation(() =>
			Promise.resolve(
				getFetchPayload(
					buildProductCollectionResponse({ nodeCount: 5, hasNextPage: true })
				)
			)
		);

		const response = await client.productCollections({
			maxReturnedEntries: 15
		});
		expect(mockedFetch).toBeCalledTimes(3);
		expect(response.length).toBe(15);
	});

	it('should throw an error if one of the requests errors', async () => {
		mockedFetch
			.mockResolvedValueOnce(getFetchPayload(mockPaginatedProductCollection))
			.mockResolvedValueOnce(
				getFetchPayload({ error: { message: 'GraphQL error' } })
			);
		await expect(client.productCollections()).rejects.toThrow();
		expect(mockedFetch).toBeCalledTimes(2);
	});

	it('should issue a warning when an excessively high `entriesPerPage` value is provided', async () => {
		const warnSpy = vi.spyOn(console, 'warn');
		await client.productCollections();
		expect(warnSpy).toHaveBeenCalledTimes(0);
		mockedFetch.mockRestore();
		mockedFetch.mockResolvedValue(
			getFetchPayload(mockUnpaginatedProductCollection)
		);

		await client.productCollections({
			advancedOptions: {
				entriesPerPage: 101
			}
		});
		expect(warnSpy).toHaveBeenCalledTimes(1);
		expect(warnSpy).toHaveBeenCalledWith(highEntriesPerPageMessage);
	});
});

describe('productCollectionEntries', () => {
	beforeEach(() => {
		mockedFetch.mockRestore();
		mockedFetch.mockImplementation(() =>
			Promise.resolve(getFetchPayload(mockUnpaginatedProductCollectionEntries))
		);
	});

	it('should pass parameters including the collectionEntry as variables', async () => {
		await client.productCollectionEntries({
			advancedOptions: {
				entriesPerPage: 5
			},
			cursor: 'abc',
			collectionEntryId: 'abcdefg_1'
		});
		const [url, argRequestInit]: mockRequestArgs = mockedFetch.mock.lastCall!;
		expect(url).toBe(storefrontEndpoint);
		expect(JSON.parse(argRequestInit?.body?.toString() ?? '')).toMatchObject({
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			query: expect.stringContaining('allProductCollections'),
			variables: {
				entriesAfter: 'abc',
				entriesFirst: 5,
				filter: {
					nacelleEntryIds: ['abcdefg_1']
				}
			}
		});
	});

	it('should pass parameters including the handle as variables', async () => {
		await client.productCollectionEntries({
			advancedOptions: {
				entriesPerPage: 5
			},
			cursor: 'abc',
			handle: 'abcdefg'
		});
		const [url, argRequestInit]: mockRequestArgs = mockedFetch.mock.lastCall!;
		expect(url).toBe(storefrontEndpoint);
		expect(JSON.parse(argRequestInit?.body?.toString() ?? '')).toMatchObject({
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			query: expect.stringContaining('allProductCollections'),
			variables: {
				entriesAfter: 'abc',
				entriesFirst: 5,
				filter: { handles: ['abcdefg'] }
			}
		});
	});

	it('should only include nacelleEntryIds if both collectionEntryId & handle are passed', async () => {
		await client.productCollectionEntries({
			advancedOptions: {
				entriesPerPage: 5
			},
			cursor: 'abc',
			handle: 'abcdefg',
			collectionEntryId: 'abcdefg_1'
		});
		const [url, argRequestInit]: mockRequestArgs = mockedFetch.mock.lastCall!;
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const requestBody = JSON.parse(argRequestInit?.body?.toString() ?? '');
		expect(url).toBe(storefrontEndpoint);
		expect(requestBody).toMatchObject({
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			query: expect.stringContaining('allProductCollections'),
			variables: {
				entriesAfter: 'abc',
				entriesFirst: 5,
				filter: {
					nacelleEntryIds: ['abcdefg_1']
				}
			}
		});
		expect(requestBody).not.toMatchObject({
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			query: expect.stringContaining('allProductCollections'),
			variables: {
				entriesAfter: 'abc',
				entriesFirst: 5,
				filter: { handles: ['abcdefg'] }
			}
		});
	});

	it('should set first based on entriesPerPage and maxReturnedEntries', async () => {
		await client.productCollectionEntries({
			collectionEntryId: 'abcdefg_1',
			advancedOptions: {
				entriesPerPage: 5
			},
			maxReturnedEntries: 2
		});
		expect(
			JSON.parse(mockedFetch.mock.lastCall![1]?.body?.toString() ?? '')
		).toMatchObject({ variables: { entriesFirst: 2 } });
		mockedFetch.mockClear();
		await client.productCollectionEntries({
			collectionEntryId: 'abcdefg_1',
			advancedOptions: {
				entriesPerPage: 5
			},
			maxReturnedEntries: 10
		});
		expect(
			JSON.parse(mockedFetch.mock.lastCall![1]?.body?.toString() ?? '')
		).toMatchObject({ variables: { entriesFirst: 5 } });
		expect(mockedFetch).toBeCalledTimes(1);
	});

	it('should return edges if edgesToNodes is false', async () => {
		const response = await client.productCollectionEntries({
			collectionEntryId: 'abcdefg_1',
			edgesToNodes: false
		});

		expect(response).toMatchObject(
			mockPaginatedProductCollectionEntries.data.allProductCollections.edges[0]
				.node.productConnection.edges
		);
	});

	it('should return empty array if no collection is found', async () => {
		mockedFetch.mockResolvedValueOnce(
			getFetchPayload(mockEmptyProductCollectionEntries)
		);

		const response = await client.productCollectionEntries();

		expect(response).toMatchObject([]);
	});

	it('should fetch until hasNextPage = false if maxReturnedEntries=-1', async () => {
		mockedFetch
			.mockResolvedValueOnce(
				getFetchPayload(mockPaginatedProductCollectionEntries)
			)
			.mockResolvedValueOnce(
				getFetchPayload(mockPaginatedProductCollectionEntries)
			)
			.mockResolvedValueOnce(
				getFetchPayload(mockPaginatedProductCollectionEntries)
			);

		const response = await client.productCollectionEntries({
			collectionEntryId: 'abcdefg_1',
			maxReturnedEntries: -1
		});

		expect(mockedFetch).toBeCalledTimes(4);
		// number of edges should be equal to 3 paginated responses + 1 unpaginated responses
		expect(response.length).toBe(
			3 *
				mockPaginatedProductCollectionEntries.data.allProductCollections
					.edges[0].node.productConnection.edges.length +
				mockUnpaginatedProductCollectionEntries.data.allProductCollections
					.edges[0].node.productConnection.edges.length
		);
	});

	it('should stop paginating when the length is the value of maxReturnedEntries', async () => {
		mockedFetch.mockImplementation(() =>
			Promise.resolve(
				getFetchPayload(
					buildProductCollectionEntriesResponse({
						nodeCount: 5,
						hasNextPage: true
					})
				)
			)
		);

		const response = await client.productCollectionEntries({
			collectionEntryId: 'abcdefg_1',
			maxReturnedEntries: 15
		});
		expect(mockedFetch).toBeCalledTimes(3);
		expect(response.length).toBe(15);
	});

	it('should throw an error if one of the requests errors', async () => {
		mockedFetch
			.mockResolvedValueOnce(
				getFetchPayload(mockPaginatedProductCollectionEntries)
			)
			.mockResolvedValueOnce(
				getFetchPayload({ error: { message: 'GraphQL error' } })
			);
		await expect(
			client.productCollectionEntries({
				collectionEntryId: 'abcdefg_1'
			})
		).rejects.toThrow();

		expect(mockedFetch).toBeCalledTimes(2);
	});

	it('returns data of the expected type', async () => {
		const defaultData = await client.productCollectionEntries();
		const explicitNodesData = await client.productCollectionEntries({
			edgesToNodes: true
		});
		const explicitEdgesData = await client.productCollectionEntries({
			edgesToNodes: false
		});

		expectTypeOf(defaultData).toMatchTypeOf<Product[]>();
		expectTypeOf(explicitNodesData).toMatchTypeOf<Product[]>();
		expectTypeOf(explicitEdgesData).toMatchTypeOf<ProductEdge[]>();
	});
});
