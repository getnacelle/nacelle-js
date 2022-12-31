import { gql } from '@urql/core';
import {
	afterEach,
	beforeEach,
	describe,
	expect,
	expectTypeOf,
	it,
	vi
} from 'vitest';
import { StorefrontClient } from './index.js';
import { NavigationDocument } from '../types/storefront.js';
import getFetchPayload from '../../__mocks__/utils/getFetchPayload.js';
import NavigationResult from '../../__mocks__/gql/navigation.js';
import { errorMessages, isProductArray } from '../utils/index.js';
import type {
	NavigationGroup,
	Product,
	ProductEdge,
	SpaceProperties
} from '../types/storefront.js';

const storefrontEndpoint =
	'https://storefront.api.nacelle.com/graphql/v1/spaces/my-space-id';

const mockedFetch = vi.fn();
type mockRequestArgs = [RequestInfo | URL, RequestInit | undefined];
const client = new StorefrontClient({
	storefrontEndpoint: 'http://localhost:5000',
	fetchClient: mockedFetch as (
		input: RequestInfo | URL,
		init?: RequestInit | undefined
	) => Promise<Response>
});

describe('create client', () => {
	it('can initialize', () => {
		expect(() => new StorefrontClient({ storefrontEndpoint })).not.toThrow();
		const client = new StorefrontClient({ storefrontEndpoint });
		expect(client).toBeInstanceOf(StorefrontClient);
	});
});

describe('query', () => {
	beforeEach(() => mockedFetch.mockRestore());

	it('can use a string for a query', async () => {
		mockedFetch.mockImplementation(() =>
			Promise.resolve(getFetchPayload({ data: { allContent: '{}' } }))
		);
		const query = '{query {allContent {id}}}';
		const response = await client.query({ query });
		expect(response).toBeTruthy();
		expect(response.data).toBeTruthy();
		expect(response.error).toBeFalsy();
		expect(mockedFetch).toHaveBeenCalledOnce();
	});

	it('can take a gql tagged template literal for a query', async () => {
		mockedFetch.mockImplementation(() => {
			return Promise.resolve(getFetchPayload({ data: { allContent: '{}' } }));
		});
		const query = gql`
			query allContent {
				allContent {
					id
				}
			}
		`;
		const result = await client.query({ query });
		expect(result).toBeTruthy();
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const { data, error } = result;
		expect(data).toBeTruthy();
		expect(error).toBeFalsy();
		expect(mockedFetch).toHaveBeenCalledOnce();
	});

	it('can use TypedDocumentNodes', async () => {
		mockedFetch.mockImplementation(() =>
			Promise.resolve(getFetchPayload({ data: NavigationResult }))
		);
		const variables = { filter: { groupId: 'abc' } };
		const result = await client.query({
			query: NavigationDocument,
			variables
		});

		const { data, error } = result;

		expect(data).toBeTruthy();
		expect(error).toBeFalsy();
		expectTypeOf(data!).toMatchTypeOf(NavigationResult);
	});

	it('takes a stringified object for variables', async () => {
		mockedFetch.mockImplementation(() =>
			Promise.resolve(getFetchPayload({ data: NavigationResult }))
		);
		const query = gql`
			query allContent {
				allContent {
					id
				}
			}
		`;
		const variables = JSON.stringify({ test: 'hi' });
		const result = await client.query({ query, variables });
		expect(result.data).toBeTruthy();
		expect(result.error).toBeFalsy();
		expect(
			(mockedFetch.mock.lastCall as mockRequestArgs)[1]?.body
				?.toString()
				.includes(JSON.stringify(variables))
		).toBeTruthy();
	});

	it('takes an object for variables', async () => {
		mockedFetch.mockImplementation(() =>
			Promise.resolve(getFetchPayload({ data: NavigationResult }))
		);
		const query = gql`
			query allContent {
				allContent {
					id
				}
			}
		`;
		const variables = { test: 'hi' };
		const result = await client.query({ query, variables });
		expect(result.data).toBeTruthy();
		expect(result.error).toBeFalsy();
		expect(
			(mockedFetch.mock.lastCall as mockRequestArgs)[1]?.body
				?.toString()
				.includes(JSON.stringify(variables))
		).toBeTruthy();
	});
});

describe('the `after` method', () => {
	let client = new StorefrontClient({ storefrontEndpoint });

	afterEach(() => {
		client = new StorefrontClient({ storefrontEndpoint });
	});

	it('exists on the client instance', () => {
		expect(typeof client.after).toBe('function');
	});

	it('throws the expected error when an invalid `method` is supplied', () => {
		expect(() =>
			client.after('spaceProperties', (x: SpaceProperties) => x)
		).not.toThrow();

		const notQuiteSpaceProperties = 'spåçe prøpertîés';
		expect(() =>
			client.after(
				notQuiteSpaceProperties as 'spaceProperties',
				(x: SpaceProperties) => x
			)
		).toThrowError(errorMessages.afterMethodInvalid(notQuiteSpaceProperties));
	});

	it('throws the expected error when an invalid `callback` is supplied', () => {
		const validCallback = (x: SpaceProperties) => x;
		const notCallback = { message: '🙀' };

		expect(() =>
			client.after(
				'spaceProperties',
				notCallback as unknown as typeof validCallback
			)
		).toThrowError(errorMessages.afterMethodCallbackInvalid(notCallback));
	});

	it('throws the expected error when an invalid `callbackId` is supplied', () => {
		expect(() =>
			client.after(
				'spaceProperties',
				(x: SpaceProperties) => x,
				true as unknown as string
			)
		).toThrowError(errorMessages.afterMethodCallbackIdInvalid(true));
	});

	it('adds a callback to `this.#afterSubscriptions`', () => {
		const callback = (x: SpaceProperties) => x;
		client.after('spaceProperties', callback);

		expect(client.afterSubscriptions).toStrictEqual({
			spaceProperties: {
				'spaceProperties::0': callback
			}
		});
	});

	it('allows callbacks to operate on arrays of data without type assertions', () => {
		// NOTE: The noteable exception to "without type assertions" is when the
		// method is capable of returning more than one type, as is the case for
		// the `.products`, `.content`, etc. methods. To avoid errors when their
		// `.after` callbacks run, users will need to either stick  to a single
		// format (either edges or nodes) or write their `.after` callbacks to be
		// capable of dealing with either edges or nodes.
		const navigationCallback = (navigation: NavigationGroup[]) => {
			return navigation.map((group, idx) => ({
				...group,
				groupId: `group ${idx}`
			}));
		};

		client.after('navigation', navigationCallback);

		expect(client.afterSubscriptions).toStrictEqual({
			navigation: {
				'navigation::0': navigationCallback
			}
		});
	});

	it('registers a callback with the provided `callbackId`', () => {
		const callback = (x: SpaceProperties) => x;
		client.after('spaceProperties', callback, 'mySpacePropertiesCallback');

		expect(client.afterSubscriptions).toStrictEqual({
			spaceProperties: {
				mySpacePropertiesCallback: callback
			}
		});
	});

	it('rewrites callbacks when supplied an already-registered combination of `method` + `callbackId`', () => {
		const callbackA = (
			input: Product[] | ProductEdge[]
		): Product[] | ProductEdge[] => input;
		const callbackB = (
			input: Product[] | ProductEdge[]
		): Product[] | ProductEdge[] => {
			if (isProductArray(input)) {
				return input.map((product) => ({
					...product,
					tags: ['On Sale']
				}));
			}

			return input.map((edge) => ({
				...edge,
				node: {
					...edge.node,
					tags: ['On Sale']
				}
			}));
		};
		client.after('products', callbackA, 'cb');
		client.after('productCollectionEntries', callbackA, 'cb');
		client.after('products', callbackB, 'cb');

		expect(client.afterSubscriptions).toStrictEqual({
			products: {
				cb: callbackB
			},
			productCollectionEntries: {
				cb: callbackA
			}
		});
	});

	it('deletes callbacks by `callbackId` when a `null` value is supplied as the `callback`', () => {
		const callback = <T>(x: T) => x;
		client.after('navigation', callback, 'temporary-callback');
		client.after('navigation', callback, 'persistent-callback');
		client.after('spaceProperties', callback, 'persistent-callback');

		expect(client.afterSubscriptions).toStrictEqual({
			navigation: {
				'temporary-callback': callback,
				'persistent-callback': callback
			},
			spaceProperties: {
				'persistent-callback': callback
			}
		});

		client.after('navigation', null, 'temporary-callback');

		expect(client.afterSubscriptions).toStrictEqual({
			navigation: {
				'persistent-callback': callback
			},
			spaceProperties: {
				'persistent-callback': callback
			}
		});
	});

	it('does not allow `this.#afterSubscriptions` to be mutated outside of the `after` method', () => {
		expect(() => {
			(
				client as { afterSubscriptions: typeof client.afterSubscriptions }
			).afterSubscriptions = {
				spaceProperties: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					'nefarious-callback': <T>(_x: T) => '🥸' as unknown as T
				}
			};
		}).toThrow();
	});
});
