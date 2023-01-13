import { expect, it } from 'vitest';
import commerceQueriesPlugin from './index.js';
import { StorefrontClient } from '@nacelle/storefront-sdk';

const storefrontEndpoint =
	'https://storefront.api.nacelle.com/graphql/v1/spaces/my-space-id';

it('does not error when composed with the `StorefrontClient` class', () => {
	const ClientWithCommerceQueries = commerceQueriesPlugin(StorefrontClient);

	expect(
		() => new ClientWithCommerceQueries({ storefrontEndpoint })
	).not.toThrow();
});

it('adds the expected methods to the `StorefrontClient` class', () => {
	const ClientWithCommerceQueries = commerceQueriesPlugin(StorefrontClient);
	const client = new ClientWithCommerceQueries({ storefrontEndpoint });

	expect(typeof client.placeholder).toBe('function');
});
