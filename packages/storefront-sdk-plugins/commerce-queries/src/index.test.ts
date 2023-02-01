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
	) => Promise<Response>
});

it('does not error when composed with the `StorefrontClient` class', () => {
	expect(
		() => new ClientWithCommerceQueries({ storefrontEndpoint })
	).not.toThrow();
});

it('adds the expected methods to the `StorefrontClient` class', () => {
	expect(typeof client.content).toBe('function');
	expect(typeof client.navigation).toBe('function');
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

		const { data } = await client.spaceProperties();

		expectTypeOf(data!).toMatchTypeOf<SpaceProperties>();
	});

	it('fetches `spaceProperties` with the appropriate query', async () => {
		// mock a persisted query not found error so we can get a post request sent so it's easier to inspect
		mockedFetch
			.mockResolvedValueOnce(
				getFetchPayload({
					errors: [
						{
							message: 'PersistedQueryNotFound',
							extensions: { code: 'PERSISTED_QUERY_NOT_FOUND' }
						}
					]
				})
			)
			.mockResolvedValueOnce(getFetchPayload({ data: SpacePropertiesResult }));

		await client.spaceProperties();

		expect(mockedFetch).toHaveBeenCalledTimes(2);
		expect(mockedFetch).toHaveBeenCalledWith(
			storefrontEndpoint,
			expect.objectContaining({
				body: expect.stringContaining('spaceProperties') as string
			})
		);
	});

	it('should return the error if one of the requests errors', async () => {
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
		const response = await client.spaceProperties();
		expect(response.error).toBeDefined();
		expect(response.data).toBeUndefined();
	});
});

describe('navigation', () => {
	beforeEach(() => mockedFetch.mockRestore());

	it('returns data of the expected type', async () => {
		mockedFetch.mockResolvedValueOnce(
			getFetchPayload({ data: NavigationResult })
		);
		const { data } = await client.navigation();

		expectTypeOf(data!).toMatchTypeOf<NavigationGroup[]>();
	});

	it('fetches `navigation` with the appropriate query', async () => {
		// mock a persisted query not found error so we can get a post request sent so it's easier to inspect
		mockedFetch
			.mockResolvedValueOnce(
				getFetchPayload({
					errors: [
						{
							message: 'PersistedQueryNotFound',
							extensions: { code: 'PERSISTED_QUERY_NOT_FOUND' }
						}
					]
				})
			)
			.mockResolvedValueOnce(getFetchPayload({ data: NavigationResult }));

		await client.navigation({ groupId: 'groupId' });

		expect(mockedFetch).toHaveBeenCalledTimes(2);
		expect(mockedFetch).toHaveBeenCalledWith(
			storefrontEndpoint,
			expect.objectContaining({
				body: expect.stringMatching('(?=.*navigation)(?=.*groupId)') as string
			})
		);
	});

	it('should return the error if one of the requests errors', async () => {
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
		const response = await client.navigation();
		expect(response.error).toBeDefined();
		expect(response.data).toBeUndefined();
	});
});

describe('content', () => {
	beforeEach(() => {
		mockedFetch.mockRestore();
		mockedFetch.mockResolvedValue(getFetchPayload(mockUnpaginatedContent));
	});

	it('returns data of the expected type', async () => {
		const { data } = await client.content();

		expectTypeOf(data!).toMatchTypeOf<Content[] | ContentEdge[]>();
	});

	it('should pass parameters including the `nacelleEntryId` as variables', async () => {
		// mock a persisted query not found error so we can get a post request sent so it's easier to inspect
		mockedFetch.mockResolvedValueOnce(
			getFetchPayload({
				errors: [
					{
						message: 'PersistedQueryNotFound',
						extensions: { code: 'PERSISTED_QUERY_NOT_FOUND' }
					}
				]
			})
		);
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
		// mock a persisted query not found error so we can get a post request sent so it's easier to inspect
		mockedFetch.mockResolvedValueOnce(
			getFetchPayload({
				errors: [
					{
						message: 'PersistedQueryNotFound',
						extensions: { code: 'PERSISTED_QUERY_NOT_FOUND' }
					}
				]
			})
		);

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
		// mock a persisted query not found error so we can get a post request sent so it's easier to inspect
		mockedFetch.mockResolvedValueOnce(
			getFetchPayload({
				errors: [
					{
						message: 'PersistedQueryNotFound',
						extensions: { code: 'PERSISTED_QUERY_NOT_FOUND' }
					}
				]
			})
		);
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
		// since apq doesn't hash variables, can just get variables param off the url instead of mocking an apq error and getting it from the body.
		expect(
			JSON.parse(
				new URL(mockedFetch.mock.lastCall![0] as URL | string).searchParams.get(
					'variables'
				) ?? ''
			)
		).toMatchObject({ filter: { first: 2 } });
		mockedFetch.mockClear();
		await client.content({
			advancedOptions: {
				entriesPerPage: 5
			},
			maxReturnedEntries: 10
		});
		expect(
			JSON.parse(
				new URL(mockedFetch.mock.lastCall![0] as URL | string).searchParams.get(
					'variables'
				) ?? ''
			)
		).toMatchObject({ filter: { first: 5 } });
		expect(mockedFetch).toBeCalledTimes(1);
	});

	it('should return edges if `edgesToNodes` is `false`', async () => {
		const response = await client.content({
			edgesToNodes: false
		});

		expect(response.data).toMatchObject(
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
		expect(response.data!.length).toBe(
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
		expect(response.data!.length).toBe(15);
	});

	it('should return the error if one of the requests errors', async () => {
		mockedFetch
			.mockResolvedValueOnce(getFetchPayload(mockPaginatedContent))
			.mockResolvedValueOnce(
				getFetchPayload({ error: { message: 'GraphQL error' } })
			);

		const response = await client.content();
		expect(mockedFetch).toBeCalledTimes(2);
		expect(response.error).toBeDefined();
		expect(response.data).toBeUndefined();
	});

	it('should issue a warning when an excessively high `entriesPerPage` value is provided', async () => {
		const warnSpy = vi.spyOn(console, 'warn');
		await client.content();
		expect(warnSpy).toHaveBeenCalledTimes(0);

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
		mockedFetch.mockResolvedValue(getFetchPayload(mockUnpaginatedProduct));
	});

	it('returns data of the expected type', async () => {
		const { data } = await client.products();

		expectTypeOf(data!).toMatchTypeOf<Product[] | ProductEdge[]>();
	});

	it('should pass parameters including the `nacelleEntryId` as variables', async () => {
		// mock a persisted query not found error so we can get a post request sent so it's easier to inspect
		mockedFetch.mockResolvedValueOnce(
			getFetchPayload({
				errors: [
					{
						message: 'PersistedQueryNotFound',
						extensions: { code: 'PERSISTED_QUERY_NOT_FOUND' }
					}
				]
			})
		);

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
		// mock a persisted query not found error so we can get a post request sent so it's easier to inspect
		mockedFetch.mockResolvedValueOnce(
			getFetchPayload({
				errors: [
					{
						message: 'PersistedQueryNotFound',
						extensions: { code: 'PERSISTED_QUERY_NOT_FOUND' }
					}
				]
			})
		);

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
		// mock a persisted query not found error so we can get a post request sent so it's easier to inspect
		mockedFetch.mockResolvedValueOnce(
			getFetchPayload({
				errors: [
					{
						message: 'PersistedQueryNotFound',
						extensions: { code: 'PERSISTED_QUERY_NOT_FOUND' }
					}
				]
			})
		);

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
			JSON.parse(
				new URL(mockedFetch.mock.lastCall![0] as URL | string).searchParams.get(
					'variables'
				) ?? ''
			)
		).toMatchObject({ filter: { first: 2 } });
		mockedFetch.mockClear();
		await client.products({
			advancedOptions: {
				entriesPerPage: 5
			},
			maxReturnedEntries: 10
		});
		expect(
			JSON.parse(
				new URL(mockedFetch.mock.lastCall![0] as URL | string).searchParams.get(
					'variables'
				) ?? ''
			)
		).toMatchObject({ filter: { first: 5 } });
		expect(mockedFetch).toBeCalledTimes(1);
	});

	it('should return edges if `edgesToNodes` is `false`', async () => {
		const response = await client.products({
			edgesToNodes: false
		});

		expect(response.data).toMatchObject(
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
		expect(response.data!.length).toBe(
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
		expect(response.data!.length).toBe(15);
	});

	it('should return the error if one of the requests errors', async () => {
		mockedFetch
			.mockResolvedValueOnce(getFetchPayload(mockPaginatedProduct))
			.mockResolvedValueOnce(
				getFetchPayload({ error: { message: 'GraphQL error' } })
			);
		const response = await client.products();
		expect(mockedFetch).toBeCalledTimes(2);
		expect(response.error).toBeDefined();
		expect(response.data).toBeUndefined();
	});

	it('should issue a warning when an excessively high `entriesPerPage` value is provided', async () => {
		const warnSpy = vi.spyOn(console, 'warn');
		await client.products();
		expect(warnSpy).toHaveBeenCalledTimes(0);

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
		mockedFetch.mockResolvedValue(
			getFetchPayload(mockUnpaginatedProductCollection)
		);
	});

	it('returns data of the expected type', async () => {
		const { data } = await client.productCollections();

		expectTypeOf(data!).toMatchTypeOf<
			ProductCollection[] | ProductCollectionEdge[]
		>();
	});

	it('should pass parameters including the `nacelleEntryId` as variables', async () => {
		// mock a persisted query not found error so we can get a post request sent so it's easier to inspect
		mockedFetch.mockResolvedValueOnce(
			getFetchPayload({
				errors: [
					{
						message: 'PersistedQueryNotFound',
						extensions: { code: 'PERSISTED_QUERY_NOT_FOUND' }
					}
				]
			})
		);

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
		// mock a persisted query not found error so we can get a post request sent so it's easier to inspect
		mockedFetch.mockResolvedValueOnce(
			getFetchPayload({
				errors: [
					{
						message: 'PersistedQueryNotFound',
						extensions: { code: 'PERSISTED_QUERY_NOT_FOUND' }
					}
				]
			})
		);

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
		// mock a persisted query not found error so we can get a post request sent so it's easier to inspect
		mockedFetch.mockResolvedValueOnce(
			getFetchPayload({
				errors: [
					{
						message: 'PersistedQueryNotFound',
						extensions: { code: 'PERSISTED_QUERY_NOT_FOUND' }
					}
				]
			})
		);

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
		// mock a persisted query not found error so we can get a post request sent so it's easier to inspect
		mockedFetch.mockResolvedValueOnce(
			getFetchPayload({
				errors: [
					{
						message: 'PersistedQueryNotFound',
						extensions: { code: 'PERSISTED_QUERY_NOT_FOUND' }
					}
				]
			})
		);

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
		// since apq doesn't hash variables, can just get variables param off the url instead of mocking an apq error and getting it from the body.
		expect(
			JSON.parse(
				new URL(mockedFetch.mock.lastCall![0] as URL | string).searchParams.get(
					'variables'
				) ?? ''
			)
		).toMatchObject({ filter: { first: 2 } });
		mockedFetch.mockClear();
		await client.productCollections({
			advancedOptions: {
				entriesPerPage: 5
			},
			maxReturnedEntries: 10
		});
		expect(
			JSON.parse(
				new URL(mockedFetch.mock.lastCall![0] as URL | string).searchParams.get(
					'variables'
				) ?? ''
			)
		).toMatchObject({ filter: { first: 5 } });
		expect(mockedFetch).toBeCalledTimes(1);
	});

	it('should return edges if `edgesToNodes` is `false`', async () => {
		const response = await client.productCollections({
			edgesToNodes: false
		});

		expect(response.data).toMatchObject(
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
		expect(response.data!.length).toBe(
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
		expect(response.data!.length).toBe(15);
	});

	it('should return the error if one of the requests errors', async () => {
		mockedFetch
			.mockResolvedValueOnce(getFetchPayload(mockPaginatedProductCollection))
			.mockResolvedValueOnce(
				getFetchPayload({ error: { message: 'GraphQL error' } })
			);
		const response = await client.productCollections();
		expect(mockedFetch).toBeCalledTimes(2);
		expect(response.error).toBeDefined();
		expect(response.data).toBeUndefined();
	});

	it('should issue a warning when an excessively high `entriesPerPage` value is provided', async () => {
		const warnSpy = vi.spyOn(console, 'warn');
		await client.productCollections();
		expect(warnSpy).toHaveBeenCalledTimes(0);

		await client.productCollections({
			advancedOptions: {
				entriesPerPage: 101
			}
		});
		expect(warnSpy).toHaveBeenCalledTimes(1);
		expect(warnSpy).toHaveBeenCalledWith(highEntriesPerPageMessage);
	});
});
