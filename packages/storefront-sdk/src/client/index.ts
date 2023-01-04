import { createClient } from '@urql/core';
import type {
	Client as UrqlClient,
	TypedDocumentNode,
	AnyVariables,
	CombinedError
} from '@urql/core';
import type { DocumentNode } from 'graphql';
import type { StorefrontClientParams } from '../index.js';

export interface StorefrontResponse<QueryDocumentType> {
	error?: CombinedError;
	data?: QueryDocumentType;
}

export class StorefrontClient {
	readonly #graphqlClient: UrqlClient;

	constructor(params: StorefrontClientParams) {
		this.#graphqlClient = createClient({
			url: params.storefrontEndpoint,
			fetch: params.fetchClient ?? globalThis.fetch
		});
	}

	query<QData = any, QVariables extends AnyVariables = any>({
		query,
		variables
	}: {
		query: TypedDocumentNode<QData, QVariables> | DocumentNode | string;
		variables?: QVariables | string;
	}): Promise<StorefrontResponse<QData>> {
		return this.#graphqlClient
			.query(query, variables as QVariables)
			.toPromise()
			.then((res) => ({ data: res.data, error: res.error }));
	}
}
