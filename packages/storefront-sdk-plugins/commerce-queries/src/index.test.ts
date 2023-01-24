import { expect, it, beforeEach, describe, vi } from 'vitest';
import commerceQueriesPlugin from './index.js';
import { StorefrontClient } from '@nacelle/storefront-sdk';

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
		mockedFetch.mockImplementationOnce(() => Promise.resolve({ data: null }));
		await client.spaceProperties();

		expect(mockedFetch).toHaveBeenCalledOnce();
		expect(mockedFetch).toHaveBeenCalledWith(
			storefrontEndpoint,
			expect.objectContaining({
				body: expect.stringContaining('spaceProperties') as string
			})
		);
	});
});
