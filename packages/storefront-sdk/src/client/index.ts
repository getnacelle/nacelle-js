import { createClient } from '@urql/core';
import { errorMessages, dataFetchingMethods } from '../utils/index.js';
import type {
	Client as UrqlClient,
	TypedDocumentNode,
	AnyVariables,
	CombinedError
} from '@urql/core';
import type { DocumentNode } from 'graphql';
import type { StorefrontClientParams } from '../index.js';
import type {
	SetConfigParams,
	SetConfigResponse,
	StorefrontConfig
} from '../types/config.js';
import type {
	AfterCallback,
	AfterCallbackWithId,
	AfterSubscriptions,
	DataFetchingMethodName,
	MethodData
} from '../types/after.js';

export interface StorefrontResponse<QueryDocumentType> {
	error?: CombinedError;
	data?: QueryDocumentType;
}

export interface QueryParams<QData, QVariables extends AnyVariables> {
	/** GraphQL query */
	query: TypedDocumentNode<QData, QVariables> | DocumentNode | string;

	/** GraphQL query variables */
	variables?: QVariables | string;
}

export class StorefrontClient {
	#graphqlClient: UrqlClient;
	#config: {
		fetchClient: typeof globalThis.fetch;
		storefrontEndpoint: string;
		previewToken: string | undefined;
		locale: string;
	};
	readonly #afterSubscriptions: AfterSubscriptions<DataFetchingMethodName>;

	constructor(params: StorefrontClientParams) {
		this.#config = {
			fetchClient: params.fetchClient ?? globalThis.fetch,
			storefrontEndpoint: params.storefrontEndpoint,
			previewToken: params.previewToken,
			locale: params.locale ?? 'en-US'
		};

		let headers = {};
		if (this.#config.previewToken) {
			headers = { 'x-nacelle-space-token': this.#config.previewToken };
		}

		this.#graphqlClient = createClient({
			url: this.#config.storefrontEndpoint,
			fetch: this.#config.fetchClient,
			fetchOptions: {
				headers
			}
		});
		this.#afterSubscriptions = {};
	}

	getConfig(): StorefrontConfig {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { fetchClient, ...rest } = this.#config;
		return {
			...rest,
			afterSubscriptions: this.#afterSubscriptions
		};
	}

	setConfig(setConfigParams: SetConfigParams): SetConfigResponse {
		const currentEndpoint = new URL(this.#config.storefrontEndpoint);

		let headers = {};

		if (setConfigParams.previewToken) {
			this.#config.previewToken = setConfigParams.previewToken;
			currentEndpoint.searchParams.set('preview', 'true');
			headers = { 'x-nacelle-space-token': this.#config.previewToken };
		} else {
			this.#config.previewToken = undefined;
			currentEndpoint.searchParams.delete('preview');
		}

		this.#config.storefrontEndpoint = currentEndpoint.toString();

		this.#graphqlClient = createClient({
			url: this.#config.storefrontEndpoint,
			fetch: this.#config.fetchClient,
			fetchOptions: {
				headers
			}
		});
		return {
			endpoint: this.#config.storefrontEndpoint,
			previewToken: this.#config.previewToken
		};
	}

	/**
	 * Register a callback function that gets applied to the return value of a data-fetching method. When a callback is registered, it is applied every time the data-fetching method runs.
	 * @param method The method to apply the `callback` to. Possible values: `'content'`, `'navigation'`, `'products'`, `'productCollections'`, `'productCollectionEntries'`, `'query'`, and `'spaceProperties'`.
	 * @param callback The callback that gets applied to the data returned by the `method` of interest.
	 * @param callbackId Optional ID. If not provided, an ID will be assigned. A `callback` will be overwritten if a new `callback` is registered to the same `method` with the same `callbackId`.
	 */
	after<MethodName extends DataFetchingMethodName>(
		method: MethodName,
		callback: AfterCallback<MethodData[MethodName]> | null,
		callbackId?: string
	) {
		if (!dataFetchingMethods.includes(method)) {
			throw new Error(errorMessages.afterMethodInvalid(method));
		}

		if (
			typeof callback === 'undefined' ||
			(typeof callback !== 'function' && callback !== null)
		) {
			throw new Error(errorMessages.afterMethodCallbackInvalid(callback));
		}

		if (typeof callbackId !== 'undefined' && typeof callbackId !== 'string') {
			throw new Error(errorMessages.afterMethodCallbackIdInvalid(callbackId));
		}

		let methodSubscriptions = this.#afterSubscriptions[method];

		if (typeof methodSubscriptions === 'undefined') {
			methodSubscriptions = this.#afterSubscriptions[method] = {};
		}

		const id =
			callbackId ?? `${method}::${Object.values(methodSubscriptions).length}`;

		if (typeof callback === 'function') {
			(methodSubscriptions as unknown as AfterCallbackWithId<MethodName>)[id] =
				callback;
		} else if (callback === null) {
			delete methodSubscriptions[id];
		}
	}

	/**
	 * Apply the `afterSubscriptions` to a method of interest.
	 * @param method The method of interest. Possible values: `'content'`, `'navigation'`, `'products'`, `'productCollections'`, `'productCollectionEntries'`, `'query'`, and `'spaceProperties'`.
	 * @param response The data returned by the method of interest.
	 * @returns Data that has possibly been transformed by the callback functions registered to the method of interest.
	 *
	 * @example
	 * const navigationData = await this.query({ query: navigationQuery });
	 * const navigationDataResult = await this.applyAfter('navigation', navigationData);
	 */
	private async applyAfter<
		M extends DataFetchingMethodName,
		T extends MethodData[M]
	>(method: M, response: T): Promise<T> {
		const subscriptionsForMethod = this.#afterSubscriptions[method];

		if (typeof subscriptionsForMethod === 'undefined') {
			return response;
		}

		let result = response;

		for (const callback of Object.values(subscriptionsForMethod)) {
			result = (await callback(result)) as T;
		}

		return result;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	query<QData = any, QVariables extends AnyVariables = any>({
		query,
		variables
	}: QueryParams<QData, QVariables>): Promise<StorefrontResponse<QData>> {
		return this.#graphqlClient
			.query(query, variables as QVariables)
			.toPromise()
			.then(({ data, error }) => this.applyAfter('query', { data, error }));
	}
}
