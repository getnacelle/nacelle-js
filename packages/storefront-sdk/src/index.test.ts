import { expect, it } from 'vitest';
import {
	StorefrontClient,
	dedupExchange,
	defaultExchanges,
	fetchExchange,
	persistedFetchExchange,
	retryExchange
} from './index.js';
import { errorMessages } from './utils/index.js';
import type { StorefrontClientParams } from './index.js';

const storefrontEndpoint =
	'https://storefront.api.nacelle.com/graphql/v1/spaces/my-space-id';

it('throws an error if the client is initialized without required parameters', () => {
	expect(() => new StorefrontClient({} as StorefrontClientParams)).toThrowError(
		errorMessages.missingEndpoint
	);
});

it('can be correctly initialized when the required parameters are supplied', () => {
	expect(() => new StorefrontClient({ storefrontEndpoint })).not.toThrow();
});

it('returns a `StorefrontClient` instance', () => {
	const client = new StorefrontClient({ storefrontEndpoint });

	expect(client).toBeInstanceOf(StorefrontClient);
});

it('exports the expected exchanges', () => {
	expect(typeof dedupExchange).toBe('function');
	expect(typeof fetchExchange).toBe('function');
	expect(typeof persistedFetchExchange).toBe('function');
	expect(typeof retryExchange).toBe('function');
	expect(Array.isArray(defaultExchanges)).toBe(true);
	expect(defaultExchanges).toStrictEqual([
		dedupExchange,
		retryExchange,
		persistedFetchExchange,
		fetchExchange
	]);
});
