import { fetchExchange, gql } from '@urql/core';
import { GraphQLError } from 'graphql';
import {
	afterEach,
	beforeEach,
	describe,
	expect,
	expectTypeOf,
	it,
	vi
} from 'vitest';
import { StorefrontClient, retryExchange, retryStatusCodes } from './index.js';
import { NavigationDocument } from '../../__mocks__/gql/operations.js';
import getFetchPayload from '../../__mocks__/utils/getFetchPayload.js';
import NavigationResult from '../../__mocks__/gql/navigation.js';
import {
	errorMessages,
	X_NACELLE_SDK_VERSION,
	X_NACELLE_PREVIEW_TOKEN
} from '../utils/index.js';
import type { StorefrontResponse } from './index.js';
import type {
	NavigationGroup,
	Product,
	SpaceProperties
} from '../types/storefront.js';
import type { StorefrontConfig } from '../types/config.js';
import type { WithStorefrontQuery } from '../index.js';

const storefrontEndpoint =
	'https://storefront.api.nacelle.com/graphql/v1/spaces/my-space-id';

const mockedFetch = vi.fn();
type mockRequestArgs = [RequestInfo | URL, RequestInit | undefined];

const client = new StorefrontClient({
	storefrontEndpoint,
	fetchClient: mockedFetch as (
		input: RequestInfo | URL,
		init?: RequestInit | undefined
	) => Promise<Response>,
	// disable APQ since most tests don't need it
	exchanges: [retryExchange, fetchExchange]
});

describe('create client', () => {
	it('can initialize', () => {
		expect(() => new StorefrontClient({ storefrontEndpoint })).not.toThrow();
		const client = new StorefrontClient({ storefrontEndpoint });
		expect(client).toBeInstanceOf(StorefrontClient);
	});
});

describe('the `after` method', () => {
	// For more robust `after` method tests, let's create
	// a new Storefront SDK plugin that adds a couple
	// of new data-fetching methods.
	function NacelleSpaceQueriesPlugin<TBase extends WithStorefrontQuery>(
		Base: TBase
	) {
		return class CommerceQueries extends Base {
			spaceProperties(): SpaceProperties {
				return {};
			}

			navigation(): NavigationGroup[] {
				return [];
			}
		};
	}

	const ClientWithNacelleSpaceQueries =
		NacelleSpaceQueriesPlugin(StorefrontClient);

	let client = new ClientWithNacelleSpaceQueries({ storefrontEndpoint });

	afterEach(() => {
		client = new ClientWithNacelleSpaceQueries({ storefrontEndpoint });
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
			client.after('query', notCallback as unknown as typeof validCallback)
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
		const { afterSubscriptions } = client.getConfig();
		expect(afterSubscriptions).toStrictEqual({
			spaceProperties: {
				'spaceProperties::0': callback
			}
		});
	});

	it('allows callbacks to operate on arrays of data without type assertions', () => {
		const navigationCallback = (navigation: NavigationGroup[]) => {
			return navigation.map((group, idx) => ({
				...group,
				groupId: `group ${idx}`
			}));
		};

		client.after('navigation', navigationCallback);
		const { afterSubscriptions } = client.getConfig();

		expect(afterSubscriptions).toStrictEqual({
			navigation: {
				'navigation::0': navigationCallback
			}
		});
	});

	it('registers a callback with the provided `callbackId`', () => {
		const callback = (x: SpaceProperties) => x;
		client.after('spaceProperties', callback, 'mySpacePropertiesCallback');

		const { afterSubscriptions } = client.getConfig();
		expect(afterSubscriptions).toStrictEqual({
			spaceProperties: {
				mySpacePropertiesCallback: callback
			}
		});
	});

	it('rewrites callbacks when supplied an already-registered combination of `method` + `callbackId`', () => {
		const callbackA = (input: NavigationGroup[]): NavigationGroup[] => {
			return input.map((navGroup) => ({
				...navGroup,
				updatedBy: '😇'
			}));
		};
		const callbackB = (input: NavigationGroup[]): NavigationGroup[] => {
			return input.map((navGroup) => ({
				...navGroup,
				updatedBy: '🥸'
			}));
		};
		client.after('navigation', callbackA, 'cb');
		client.after('navigation', callbackB, 'cb');
		const { afterSubscriptions } = client.getConfig();

		expect(afterSubscriptions).toStrictEqual({
			navigation: {
				cb: callbackB
			}
		});
	});

	it('deletes callbacks by `callbackId` when a `null` value is supplied as the `callback`', () => {
		const callback = <T>(x: T) => x;
		client.after('navigation', callback, 'temporary-callback');
		client.after('navigation', callback, 'persistent-callback');
		client.after('spaceProperties', callback, 'persistent-callback');
		let { afterSubscriptions } = client.getConfig();

		expect(afterSubscriptions).toStrictEqual({
			navigation: {
				'temporary-callback': callback,
				'persistent-callback': callback
			},
			spaceProperties: {
				'persistent-callback': callback
			}
		});

		client.after('navigation', null, 'temporary-callback');
		afterSubscriptions = client.getConfig().afterSubscriptions;

		expect(afterSubscriptions).toStrictEqual({
			navigation: {
				'persistent-callback': callback
			},
			spaceProperties: {
				'persistent-callback': callback
			}
		});
	});

	it('does not allow `this.#afterSubscriptions` to be mutated outside of the `after` method', () => {
		client.getConfig().afterSubscriptions = {
			spaceProperties: {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				'nefarious-callback': <T>(_x: T) => '🥸' as unknown as T
			}
		};
		expect(client.getConfig().afterSubscriptions).toEqual({});
	});
});

describe('retry logic', () => {
	beforeEach(() => mockedFetch.mockRestore());

	it('retries if response includes a valid error status', async () => {
		for (const status of retryStatusCodes) {
			mockedFetch.mockRestore();
			mockedFetch
				.mockImplementationOnce(() =>
					Promise.resolve(
						getFetchPayload({ message: 'this is an error' }, { status })
					)
				)
				.mockImplementation(() =>
					// return a valid response so we don't loop forever
					Promise.resolve(getFetchPayload({ data: NavigationResult }))
				);
			await client.query({ query: NavigationDocument });
			expect(mockedFetch).toBeCalledTimes(2);
		}
	}, 10_000);

	it('retries if response includes an INTERNAL_SERVER_ERROR in the gql error', async () => {
		mockedFetch
			.mockImplementationOnce(() =>
				Promise.resolve(
					getFetchPayload({
						errors: [
							{
								message: 'INTERNAL_SERVER_ERROR'
							}
						]
					})
				)
			)
			.mockImplementation(() =>
				// return a valid response so we don't loop forever
				Promise.resolve(getFetchPayload({ data: NavigationResult }))
			);
		await client.query({ query: NavigationDocument });
		expect(mockedFetch).toBeCalledTimes(2);
	});

	it("doesn't retry if not an internal server gql error", async () => {
		mockedFetch
			.mockImplementationOnce(() =>
				Promise.resolve(
					getFetchPayload({
						errors: [
							{
								message: 'Request error - your query is invalid'
							}
						]
					})
				)
			)
			.mockImplementation(() =>
				// return a valid response so we don't loop forever
				Promise.resolve(getFetchPayload({ data: NavigationResult }))
			);
		await client.query({ query: NavigationDocument });
		expect(mockedFetch).toBeCalledTimes(1);
	});
});

describe('the `query` method', () => {
	beforeEach(() => mockedFetch.mockRestore());

	it('can use a string for a query', async () => {
		mockedFetch.mockImplementationOnce(() =>
			Promise.resolve(getFetchPayload({ data: { allContent: '{}' } }))
		);
		const query = '{ query { allContent { id } } }';
		const response = await client.query({ query });
		expect(response).toBeTruthy();
		expect(response.data).toBeTruthy();
		expect(response.error).toBeFalsy();
		expect(mockedFetch).toHaveBeenCalledOnce();
	});

	it('can take a gql tagged template literal for a query', async () => {
		mockedFetch.mockImplementationOnce(() => {
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
		mockedFetch.mockImplementationOnce(() =>
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
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		expectTypeOf(data!).toMatchTypeOf(NavigationResult);
	});

	it('takes a stringified object for variables', async () => {
		mockedFetch.mockImplementationOnce(() =>
			Promise.resolve(getFetchPayload({ data: NavigationResult }))
		);
		const query = gql`
			query allContent {
				allContent {
					id
				}
			}
		`;
		const variablesObject = { test: 'hi' };
		const stringifiedVariables = JSON.stringify(variablesObject);
		const result = await client.query({
			query,
			variables: stringifiedVariables
		});
		expect(result.data).toBeTruthy();
		expect(result.error).toBeFalsy();
		const requestBody = JSON.parse(
			(
				((mockedFetch.mock.lastCall as mockRequestArgs).at(1) as RequestInit)
					?.body as BodyInit
			).toString()
		) as {
			query: string;
			operationName: string;
			variables: Record<string, unknown>;
		};

		expect(requestBody.variables).toStrictEqual(variablesObject);
	});

	it('takes an object for variables', async () => {
		mockedFetch.mockImplementationOnce(() =>
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

	it('throws when stringified variables cannot be parsed', () => {
		const query = gql`
			query allContent {
				allContent {
					id
				}
			}
		`;

		expect(() => client.query({ query, variables: '{' })).toThrowError(
			'Could not parse request variables'
		);
	});

	it('applies callbacks registered with the `.after` method', async () => {
		mockedFetch.mockImplementationOnce(() =>
			Promise.resolve(getFetchPayload({ data: NavigationResult }))
		);

		const queryCallback = vi.fn(
			(response: StorefrontResponse<{ navigation: NavigationGroup[] }>) => {
				return {
					...response,
					data: {
						...response.data,
						navigation: {
							...response.data?.navigation.map((navGroup) => ({
								...navGroup,
								groupId: 'new-group-id'
							}))
						}
					}
				};
			}
		);

		client.after('query', queryCallback);
		const { afterSubscriptions } = client.getConfig();
		expect(afterSubscriptions).toStrictEqual({
			query: {
				'query::0': queryCallback
			}
		});

		const query = gql`
			query allContent {
				navigation {
					groupId
				}
			}
		`;

		const { data } = await client.query<{ navigation: NavigationGroup[] }>({
			query
		});

		expect(data?.navigation[0]).toStrictEqual({ groupId: 'new-group-id' });

		// cleanup
		client.after('query', null, 'query::0');
	});

	it('can support legacy error handling with `.after`', async () => {
		client.after('query', null, 'query::0');
		const errorMessage = 'Not enough complexity points available.';

		mockedFetch.mockImplementationOnce(() =>
			Promise.resolve(
				getFetchPayload({
					errors: [
						{
							message: errorMessage,
							path: ['allContent'],
							extensions: {
								requestedQueryCost: 1000,
								throttleStatus: {
									totalCapacity: 10000,
									currentCapacity: 0,
									emptyRate: 17
								},
								code: 'COMPLEXITY_ERROR',
								nacelleErrorId: 'Root=1-631bd95c-56b459876e5466fc16ef20c5'
							}
						}
					]
				})
			)
		);

		const queryCallback = vi.fn(
			(response: StorefrontResponse<Array<Product>>) => {
				if (response.error) {
					throw new Error(response.error.message);
				}

				return response.data;
			}
		);

		client.after('query', queryCallback);
		const { afterSubscriptions } = client.getConfig();

		expect(afterSubscriptions).toStrictEqual({
			query: {
				'query::0': queryCallback
			}
		});

		const query = gql`
			query allContent {
				allContent {
					edges {
						cursor
					}
				}
			}
		`;

		await expect(client.query({ query })).rejects.toThrow(errorMessage);

		// cleanup
		client.after('query', null, 'query::0');
	});

	it('adds the trace id to the error.message if the response returns gql errors', async () => {
		const traceId = 'abcd-123';
		mockedFetch.mockResolvedValueOnce(
			getFetchPayload(
				{ errors: [new GraphQLError('This is a test error')] },
				{ headers: { 'x-amzn-trace-id': traceId }, status: 200 }
			)
		);

		const res = await client.query({ query: NavigationDocument });

		expect(res.error?.message).toContain(traceId);
	});

	it('adds the trace id to the error.message if the response returns an error', async () => {
		const traceId = 'abcd-123';
		mockedFetch.mockResolvedValue(
			getFetchPayload(
				{
					message: 'This is an error'
				},
				{ status: 501, headers: { 'x-amzn-trace-id': traceId } }
			)
		);
		const res = await client.query({ query: NavigationDocument });

		expect(res.error?.message).toContain(traceId);
	});
});

it('sets the expected header and query param when initialized with a `previewToken`', async () => {
	mockedFetch.mockImplementationOnce(() => {
		return Promise.resolve(getFetchPayload({ data: { allContent: '{}' } }));
	});

	const myPreviewToken = 'xxx';
	const client = new StorefrontClient({
		storefrontEndpoint,
		previewToken: myPreviewToken,
		fetchClient: mockedFetch as (
			input: RequestInfo | URL,
			init?: RequestInit | undefined
		) => Promise<Response>
	});

	const { previewToken, storefrontEndpoint: endpoint } = client.getConfig();
	expect(previewToken).toBe(myPreviewToken);

	const storefrontEndpointUrl = new URL(endpoint);
	expect(storefrontEndpointUrl.searchParams.get('preview')).toBe('true');

	await client.query({
		query: `query { allContent { edges { node { nacelleEntryId } } } }`
	});
	expect(mockedFetch.mock.lastCall).not.toBeUndefined();
	const lastFetch = mockedFetch.mock.lastCall as mockRequestArgs;
	const requestHeaders = lastFetch[1]?.headers as HeadersInit & {
		[X_NACELLE_PREVIEW_TOKEN]?: string;
	};
	expect(requestHeaders[X_NACELLE_PREVIEW_TOKEN]).toBe(myPreviewToken);
});

it("sends an 'x-nacelle-sdk-version' header", async () => {
	mockedFetch.mockImplementationOnce(() =>
		Promise.resolve(getFetchPayload({ data: NavigationResult }))
	);
	const variables = { filter: { groupId: 'abc' } };
	await client.query({
		query: NavigationDocument,
		variables
	});

	const lastFetch = mockedFetch.mock.lastCall as mockRequestArgs;
	const requestHeaders = lastFetch[1]?.headers as HeadersInit & {
		[X_NACELLE_SDK_VERSION]?: string;
	};

	expect(requestHeaders[X_NACELLE_SDK_VERSION]).toMatch(
		/\b\d{1,2}.\d{1,2}.\d{1,2}\b/ // three sequences of 1-2 digits separated by periods
	);
});

it('`getConfig` retrieves config', () => {
	const client = new StorefrontClient({
		storefrontEndpoint,
		locale: 'en-US'
	});

	expect(client.getConfig()).toStrictEqual<StorefrontConfig>({
		afterSubscriptions: {},
		storefrontEndpoint:
			'https://storefront.api.nacelle.com/graphql/v1/spaces/my-space-id',
		previewToken: undefined,
		locale: 'en-US'
	});
});

it('sets the `previewToken`, query param, and header when a `previewToken` is supplied to `setConfig`', async () => {
	mockedFetch.mockImplementationOnce(() => {
		return Promise.resolve(getFetchPayload({ data: { allContent: '{}' } }));
	});

	const myPreviewToken = 'xxx';
	const client = new StorefrontClient({
		storefrontEndpoint,
		locale: 'en-US',
		fetchClient: mockedFetch as (
			input: RequestInfo | URL,
			init?: RequestInit | undefined
		) => Promise<Response>
	});

	client.setConfig({ previewToken: myPreviewToken });
	const { previewToken, storefrontEndpoint: endpoint } = client.getConfig();

	expect(previewToken).toBe(myPreviewToken);
	expect(new URL(endpoint).searchParams.get('preview')).toBe('true');

	await client.query({
		query: `query { allContent { edges { node { nacelleEntryId } } } }`
	});
	expect(mockedFetch.mock.lastCall).not.toBeUndefined();
	const lastFetch = mockedFetch.mock.lastCall as mockRequestArgs;
	const requestHeaders = lastFetch[1]?.headers as HeadersInit & {
		[X_NACELLE_PREVIEW_TOKEN]?: string;
	};
	expect(requestHeaders[X_NACELLE_PREVIEW_TOKEN]).toBe(myPreviewToken);
});

it('unsets the `previewToken`, query param, and header when `setConfig` is called with `previewToken: null`', async () => {
	const myPreviewToken = 'xxx';
	const client = new StorefrontClient({
		storefrontEndpoint,
		previewToken: myPreviewToken,
		fetchClient: mockedFetch as (
			input: RequestInfo | URL,
			init?: RequestInit | undefined
		) => Promise<Response>
	});
	expect(client.getConfig().previewToken).toBe(myPreviewToken);

	client.setConfig({ previewToken: null });
	const { previewToken, storefrontEndpoint: endpoint } = client.getConfig();
	expect(previewToken).toBe(undefined);
	expect(new URL(endpoint).searchParams.get('preview')).toBe(null);

	await client.query({
		query: `query { allContent { edges { node { nacelleEntryId } } } }`
	});
	expect(mockedFetch.mock.lastCall).not.toBeUndefined();
	const lastFetch = mockedFetch.mock.lastCall as mockRequestArgs;
	const requestHeaders = lastFetch[1]?.headers as HeadersInit & {
		[X_NACELLE_PREVIEW_TOKEN]?: string;
	};
	expect(requestHeaders[X_NACELLE_PREVIEW_TOKEN]).toBeUndefined();
});

it("makes requests with APQ enabled when `exchanges` aren't set", async () => {
	const client = new StorefrontClient({
		storefrontEndpoint,
		fetchClient: mockedFetch as (
			input: RequestInfo | URL,
			init?: RequestInit | undefined
		) => Promise<Response>
	});
	mockedFetch.mockImplementationOnce(() =>
		Promise.resolve(getFetchPayload({ data: NavigationResult }))
	);
	const variables = { filter: { groupId: 'abc' } };
	await client.query({
		query: NavigationDocument,
		variables
	});

	const lastFetch = mockedFetch.mock.lastCall as mockRequestArgs;
	expect(lastFetch[1]?.body).toBeUndefined();
	expect(lastFetch[1]?.method).toEqual('GET');
	const requestUrl = new URL(lastFetch[0].toString());
	expect(requestUrl.searchParams.get('operationName')).toEqual('Navigation');
});

it('makes requests with APQ disabled', async () => {
	const client = new StorefrontClient({
		storefrontEndpoint,
		fetchClient: mockedFetch as (
			input: RequestInfo | URL,
			init?: RequestInit | undefined
		) => Promise<Response>,
		exchanges: [retryExchange, fetchExchange]
	});
	mockedFetch.mockImplementationOnce(() =>
		Promise.resolve(getFetchPayload({ data: NavigationResult }))
	);
	const variables = { filter: { groupId: 'abc' } };
	await client.query({
		query: NavigationDocument,
		variables
	});

	const lastFetch = mockedFetch.mock.lastCall as mockRequestArgs;
	expect(lastFetch[0]).toEqual(storefrontEndpoint);
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	expect(JSON.parse(lastFetch[1]!.body!.toString())).toMatchObject(
		expect.objectContaining({
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			query: expect.stringContaining('query Navigation'),
			variables
		})
	);
});
