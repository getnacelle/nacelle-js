import { StorefrontClient } from './client/index.js';
import type { StorefrontResponse, QueryParams } from './client/index.js';

export interface StorefrontClientAdvancedOptions {
	/**
	 * Controls whether or not Automatic Persisted Queries should be enabled when making requests. This is enabled by default and allows Nacelle to provide improved performance for repeated queries.
	 * @defaultValue true
	 */
	enableApq?: boolean;
}

export interface StorefrontClientParams {
	/** Nacelle Storefront GraphQL Endpoint. This can be retrieved from the Nacelle Dashboard. */
	storefrontEndpoint: string;

	/** Nacelle Preview Token. This can be retrieved from the Nacelle Dashboard. */
	previewToken?: string;

	/** An IETF locale string, e.g. 'en-US'.  */
	locale?: string;

	/** Optional fetch implementation. If not supplied, the Storefront SDK will use `globalThis.fetch`. */
	fetchClient?: typeof globalThis.fetch;

	/** Advanced options for configuring the Storefront SDK. These default to the recommended settings for most users. */
	advancedOptions?: StorefrontClientAdvancedOptions;
}

export { StorefrontClient };
export * from './types/plugins.js';
export type { StorefrontResponse, QueryParams };
export type { StorefrontConfig } from './types/config.js';
export type { AnyVariables } from '@urql/core';
