import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createClient } from '@urql/core';
import { StorefrontClient } from './index.js';
import { version as packageVersion } from '../../package.json';

vi.mock('@urql/core');

const storefrontEndpoint =
	'https://storefront.api.nacelle.com/graphql/v1/spaces/my-space-id';

describe('`createClient`', () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	it('calls `createClient` with the expected params', () => {
		const client = new StorefrontClient({ storefrontEndpoint });
		expect(createClient).toHaveBeenCalledTimes(1);

		client.setConfig({});
		expect(createClient).toHaveBeenCalledTimes(2);
		expect(createClient).toHaveBeenCalledWith(
			expect.objectContaining({
				url: storefrontEndpoint,
				fetch: globalThis.fetch,
				fetchOptions: {
					headers: {
						'x-nacelle-sdk-version': packageVersion
					}
				}
			})
		);
	});
});
