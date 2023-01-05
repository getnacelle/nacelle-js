import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createClient } from '@urql/core';
import { StorefrontClient } from './index.js';

vi.mock('@urql/core');

const storefrontEndpoint =
	'https://storefront.api.nacelle.com/graphql/v1/spaces/my-space-id';
const previewToken = 'xxx';

describe('`createClient`', () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	it('calls `createClient` with the expected params', () => {
		const client = new StorefrontClient({
			storefrontEndpoint,
			locale: 'en-US'
		});
		client.setConfig({});

		expect(createClient).toHaveBeenCalledTimes(2);
		expect(createClient).toHaveBeenCalledWith({
			url: storefrontEndpoint,
			fetch: globalThis.fetch,
			fetchOptions: {
				headers: {}
			}
		});
	});

	it('calls `createClient` with the expected params when `preview` is true', () => {
		const client = new StorefrontClient({
			storefrontEndpoint,
			locale: 'en-US',
			previewToken
		});
		client.setConfig({ previewToken });

		expect(createClient).toHaveBeenCalledTimes(2);
		expect(createClient).toHaveBeenCalledWith({
			url: storefrontEndpoint + '?preview=true',
			fetch: globalThis.fetch,
			fetchOptions: {
				headers: { 'x-nacelle-space-token': previewToken }
			}
		});
	});
});
