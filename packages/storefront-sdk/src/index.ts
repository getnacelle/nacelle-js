import { StorefrontClient } from './client/index.js';
import { errorMessages } from './utils/index.js';

export interface StorefrontClientParams {
	/** Nacelle Storefront GraphQL Endpoint. This can be retrieved from the Nacelle Dashboard. */
	storefrontEndpoint: string;

	/** Nacelle Preview Token. This can be retrieved from the Nacelle Dashboard. */
	previewToken?: string;

	/** An IETF locale string, e.g. 'en-US'.  */
	locale?: string;

	/** Optional fetch implementation. If not supplied, the Storefront SDK will use `globalThis.fetch`. */
	fetchClient?: typeof globalThis.fetch;
}

export function Storefront(params: StorefrontClientParams) {
	if (!params?.storefrontEndpoint) {
		throw new Error(errorMessages.missingEndpoint);
	}

	return new StorefrontClient(params);
}

export { StorefrontClient };
export * from './types/plugins.js';
