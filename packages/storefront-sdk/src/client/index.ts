import { createClient } from '@urql/core';
import type { Client as UrqlClient } from '@urql/core';
import type { StorefrontClientParams } from '../index.js';

export class StorefrontClient {
	private readonly graphqlClient: UrqlClient;

	constructor(params: StorefrontClientParams) {
		this.graphqlClient = createClient({
			url: params.storefrontEndpoint,
			fetch: params.fetchClient ?? globalThis.fetch
		});
	}

	// NEW METHODS GO HERE :)
	placeholder() {
		return this.graphqlClient.query('', {}).toPromise();
	}
}
