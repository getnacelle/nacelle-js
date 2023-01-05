import { gql } from '@urql/core';
import { expect, it, vi, beforeEach, expectTypeOf, describe } from 'vitest';
import { StorefrontClient } from './index.js';
import { NavigationDocument } from '../types/storefront.js';
import getFetchPayload from '../../__mocks__/utils/getFetchPayload.js';
import NavigationResult from '../../__mocks__/gql/navigation.js';

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
