import { expect, it } from 'vitest';
import { StorefrontClient } from './index.js';

const storefrontEndpoint =
	'https://storefront.api.nacelle.com/graphql/v1/spaces/my-space-id';

it('can initialize', () => {
	expect(() => new StorefrontClient({ storefrontEndpoint })).not.toThrow();
	const client = new StorefrontClient({ storefrontEndpoint });
	expect(client).toBeInstanceOf(StorefrontClient);
});

it('can initialize with preview token', () => {
	const client = new StorefrontClient({
		storefrontEndpoint,
		previewToken: 'xxx'
	});
	expect(client).toBeInstanceOf(StorefrontClient);
});

it('`setConfig` sets preview data', () => {
	const client = new StorefrontClient({
		storefrontEndpoint,
		locale: 'en-US'
	});

	expect(client.setConfig({ previewToken: 'xxx' })).toStrictEqual({
		endpoint:
			'https://storefront.api.nacelle.com/graphql/v1/spaces/my-space-id?preview=true',
		previewToken: 'xxx'
	});
	expect(client.setConfig({})).toStrictEqual({
		endpoint:
			'https://storefront.api.nacelle.com/graphql/v1/spaces/my-space-id',
		previewToken: undefined
	});
});

it('`getConfig` retrieves config', () => {
	const client = new StorefrontClient({
		storefrontEndpoint,
		locale: 'en-US'
	});

	expect(client.getConfig()).toStrictEqual({
		storefrontEndpoint:
			'https://storefront.api.nacelle.com/graphql/v1/spaces/my-space-id',
		previewToken: undefined,
		locale: 'en-US'
	});
});
