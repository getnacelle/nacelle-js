import { expect, it } from 'vitest';
import { StorefrontClient } from './index.js';

const storefrontEndpoint =
	'https://storefront.api.nacelle.com/graphql/v1/spaces/my-space-id';

it('can initialize', () => {
	expect(() => new StorefrontClient({ storefrontEndpoint })).not.toThrow();
	const client = new StorefrontClient({ storefrontEndpoint });
	expect(client).toBeInstanceOf(StorefrontClient);
});
