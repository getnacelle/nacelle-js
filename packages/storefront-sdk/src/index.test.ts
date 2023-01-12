import { expect, it } from 'vitest';
import { Storefront, StorefrontClient } from './index.js';
import { errorMessages } from './utils/index.js';
import type { StorefrontClientParams } from './index.js';

const storefrontEndpoint =
	'https://storefront.api.nacelle.com/graphql/v1/spaces/my-space-id';

it('throws an error if the client is initialized without required parameters', () => {
	expect(() => Storefront({} as StorefrontClientParams)).toThrowError(
		errorMessages.missingEndpoint
	);
});

it('can be correctly initialized when the required parameters are supplied', () => {
	expect(() => Storefront({ storefrontEndpoint })).not.toThrow();
});

it('returns a `StorefrontClient` instance', () => {
	const client = Storefront({ storefrontEndpoint });

	expect(client).toBeInstanceOf(StorefrontClient);
});
