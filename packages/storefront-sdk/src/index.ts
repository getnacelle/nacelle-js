import type { Exchange } from '@urql/core';

export interface StorefrontClientParams {
	/** Nacelle Storefront GraphQL Endpoint. This can be retrieved from the Nacelle Dashboard. */
	storefrontEndpoint: string;

	/** Nacelle Preview Token. This can be retrieved from the Nacelle Dashboard. */
	previewToken?: string;

	/** An IETF locale string, e.g. 'en-US'.  */
	locale?: string;

	/** A custom fetch implementation. If not supplied, the Storefront SDK will use `globalThis.fetch`. */
	fetchClient?: typeof globalThis.fetch;

	/** Custom urql exchanges. If not provided, the client will use the `defaultExchanges` exported by the Storefront SDK. */
	exchanges?: Exchange[];
}

export {
	defaultExchanges,
	persistedExchange,
	retryExchange,
	StorefrontClient
} from './client/index.js';
export { fetchExchange } from '@urql/core';
export * from './types/plugins.js';
export type { StorefrontResponse, QueryParams } from './client/index.js';
export type { StorefrontConfig } from './types/config.js';
