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
	#currencyCode: string | undefined;
	#locale: string | undefined;
	#fetchClient: typeof globalThis.fetch;

	constructor(params: StorefrontClientParams) {
		this.#storefrontEndpoint = params.storefrontEndpoint;
		this.#previewToken = params.previewToken;
		this.#fetchClient = params.fetchClient ?? globalThis.fetch;
		this.#currencyCode = params.currencyCode;
		this.#locale = params.locale;

		let headers = {};
		if (this.#previewToken) {
			headers = { X_NACELLE_PREVIEW_TOKEN: this.#previewToken };
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
			locale: this.#locale,
			currencyCode: this.#currencyCode
		};
	}

	setConfig(setConfigParams: SetConfigParams): SetConfigResponse {
		const currentEndpoint = new URL(this.#storefrontEndpoint);

		let headers = {};

		if (setConfigParams.previewToken) {
			this.#previewToken = setConfigParams.previewToken;
			currentEndpoint.searchParams.set('preview', 'true');
			headers = { X_NACELLE_PREVIEW_TOKEN: this.#previewToken };
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
