import { createClient } from '@urql/core';
import type { Client as UrqlClient } from '@urql/core';
import type { StorefrontClientParams } from '../index.js';
import type {
	SetConfigParams,
	SetConfigResponse,
	StorefrontConfig
} from '../types/config.js';

export class StorefrontClient {
	#graphqlClient: UrqlClient;
	#storefrontEndpoint: string;
	#previewToken: string | undefined;
	#locale: string;
	#fetchClient: typeof globalThis.fetch;

	constructor(params: StorefrontClientParams) {
		this.#storefrontEndpoint = params.storefrontEndpoint;
		this.#previewToken = params.previewToken;
		this.#fetchClient = params.fetchClient ?? globalThis.fetch;
		this.#locale = params.locale || 'en-US';

		let headers = {};
		if (this.#previewToken) {
			headers = { 'x-nacelle-space-token': this.#previewToken };
		}

		this.#graphqlClient = createClient({
			url: this.#storefrontEndpoint,
			fetch: this.#fetchClient,
			fetchOptions: {
				headers
			}
		});
	}

	getConfig(): StorefrontConfig {
		return {
			storefrontEndpoint: this.#storefrontEndpoint,
			previewToken: this.#previewToken,
			locale: this.#locale
		};
	}

	setConfig(setConfigParams: SetConfigParams): SetConfigResponse {
		const currentEndpoint = new URL(this.#storefrontEndpoint);

		let headers = {};

		if (setConfigParams.previewToken) {
			this.#previewToken = setConfigParams.previewToken;
			currentEndpoint.searchParams.set('preview', 'true');
			headers = { 'x-nacelle-space-token': this.#previewToken };
		} else {
			this.#previewToken = undefined;
			currentEndpoint.searchParams.delete('preview');
		}

		this.#storefrontEndpoint = currentEndpoint.toString();

		this.#graphqlClient = createClient({
			url: this.#storefrontEndpoint,
			fetch: this.#fetchClient,
			fetchOptions: {
				headers
			}
		});
		return {
			endpoint: this.#storefrontEndpoint,
			previewToken: this.#previewToken
		};
	}

	// NEW METHODS GO HERE :)
	placeholder() {
		return this.#graphqlClient.query('', {}).toPromise();
	}
}
