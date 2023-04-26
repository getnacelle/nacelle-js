import { expect, it } from 'vitest';
import {
	StorefrontClient,
	defaultExchanges,
	fetchExchange,
	persistedExchange,
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
	expect(typeof fetchExchange).toBe('function');
	expect(typeof persistedExchange).toBe('function');
	expect(typeof retryExchange).toBe('function');
	expect(Array.isArray(defaultExchanges)).toBe(true);
	expect(defaultExchanges).toStrictEqual([
		retryExchange,
		persistedExchange,
		fetchExchange
	]);
});
