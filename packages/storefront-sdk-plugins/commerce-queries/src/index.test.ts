import { expect, it, beforeEach, describe, vi } from 'vitest';
import commerceQueriesPlugin from './index.js';
import { StorefrontClient } from '@nacelle/storefront-sdk';
import getFetchPayload from '../__mocks__/utils/getFetchPayload.js';
import SpacePropertiesResult from '../__mocks__/gql/spaceProperties.js';

const storefrontEndpoint =
	'https://storefront.api.nacelle.com/graphql/v1/spaces/my-space-id';

const mockedFetch = vi.fn();

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
	expect(typeof client.spaceProperties).toBe('function');
});

describe('spaceProperties', () => {
	beforeEach(() => mockedFetch.mockRestore());

	it('fetches `spaceProperties` with the appropriate query', async () => {
		mockedFetch.mockImplementationOnce(() =>
			Promise.resolve(getFetchPayload({ data: SpacePropertiesResult }))
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

	it('should return the error if one of the requests errors', async () => {
		mockedFetch.mockImplementationOnce(() =>
			Promise.resolve(
				getFetchPayload({
					errors: [
						{
							message: 'xxx',
							extensions: { code: 'xxx' }
						}
					]
				})
			)
		);
		const response = await client.spaceProperties();
		expect(response.error).toBeDefined();
		expect(response.data).toBeUndefined();
	});
});
