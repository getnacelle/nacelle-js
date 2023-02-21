import { createClient, dedupExchange, fetchExchange } from '@urql/core';
import type {
	Client as UrqlClient,
	TypedDocumentNode,
	AnyVariables,
	CombinedError,
	Exchange
} from '@urql/core';
import type { DocumentNode } from 'graphql';
import { retryExchange } from '@urql/exchange-retry';
import { persistedFetchExchange } from '@urql/exchange-persisted-fetch';
import { errorMessages, dataFetchingMethods } from '../utils/index.js';
import type {
	StorefrontClientAdvancedOptions,
	StorefrontClientParams
} from '../index.js';
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

/**
 * Response from Nacelle's Storefront API.
 */
export interface StorefrontResponse<QueryDocumentType> {
	/**
	 * Errors returned during the request. This could be Network Errors or GraphQL Errors. Based on urql's {@link https://formidable.com/open-source/urql/docs/api/core/#combinederror CombinedError} type.
	 */
	error?: CombinedError;
	/**
	 * Response of a successful request.
	 */
	data?: QueryDocumentType;
}

export interface QueryParams<QData, QVariables extends AnyVariables> {
	/** GraphQL query */
	query: TypedDocumentNode<QData, QVariables> | DocumentNode | string;

	/** GraphQL query variables */
	variables?: QVariables | string;
}

export const retryStatusCodes = [
	429, // Too Many Requests
	500, // Internal Server Error
	502, // Bad Gateway
	503, // Service Unavailable
	504 // Gateway Timeout
];

export class StorefrontClient {
	#graphqlClient: UrqlClient;
	#config: {
		fetchClient: typeof globalThis.fetch;
		storefrontEndpoint: string;
		previewToken: string | undefined;
		locale: string;
		advancedOptions: StorefrontClientAdvancedOptions;
	};
	readonly #afterSubscriptions: AfterSubscriptions<DataFetchingMethodName>;
	readonly #retryExchange: Exchange = retryExchange({
		maxDelayMs: 5000,
		maxNumberAttempts: 5,
		initialDelayMs: 500,
		retryIf: (error) => {
			// if it's a network error, retry if specific error codes
			if (error.networkError) {
				const statusCode = (error.response as globalThis.Response)?.status;
				return retryStatusCodes.includes(statusCode);
			} else {
				// only retry if graphQL error is related to internal error
				return error.graphQLErrors.some((err) =>
					err.message.includes('INTERNAL_SERVER_ERROR')
				);
			}
		}
	});
	constructor(params: StorefrontClientParams) {
		this.#config = {
			fetchClient: params.fetchClient ?? globalThis.fetch,
			storefrontEndpoint: params.storefrontEndpoint,
			previewToken: params.previewToken,
			locale: params.locale ?? 'en-US',
			advancedOptions: { enableApq: true, ...(params.advancedOptions ?? {}) }
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
			},
			exchanges: [
				dedupExchange,
				this.#retryExchange,
				// only include persistedFetchExchange if `enableApq` is true
				...(this.#config.advancedOptions.enableApq
					? [persistedFetchExchange({ preferGetForPersistedQueries: true })]
					: []),
				fetchExchange
			],
			requestPolicy: 'network-only'
		});
		this.#afterSubscriptions = {};
	}

	/**
	 * @returns an object containing the Storefront SDK configuration parameters: `storefrontEndpoint`, `previewToken`, `locale` and `afterSubscriptions`.
	 */
	getConfig(): StorefrontConfig {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { fetchClient, ...rest } = this.#config;
		return {
			...rest,
			afterSubscriptions: this.#afterSubscriptions
		};
	}

	/**
	 * Turn preview mode on or off on-the-fly by setting a `previewToken` in the SDK config. The `previewToken` can be generated in the Nacelle Dashboard.
	 * @param setConfigParams an object containing the `previewToken` property  and/or the advancedOptions. Providing a value of `null`, `undefined`, or an empty string for the previewTokenValue will disable preview mode.
	 *
	 * @example
	 * Enable preview mode by providing a `previewToken`:
	 * ```
	 * client.setConfig({ previewToken: '<my-nacelle-preview-token>' });
	 * ```
	 *
	 * @example
	 * Disable preview mode by providing `previewToken: null`:
	 * ```
	 * client.setConfig({ previewToken: null });
	 * ```
	 */
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

		if (setConfigParams.advancedOptions) {
			this.#config.advancedOptions = {
				...this.#config.advancedOptions,
				...setConfigParams.advancedOptions
			};
		}

		this.#config.storefrontEndpoint = currentEndpoint.toString();

		this.#graphqlClient = createClient({
			url: this.#config.storefrontEndpoint,
			fetch: this.#config.fetchClient,
			fetchOptions: {
				headers
			},
			exchanges: [
				dedupExchange,
				this.#retryExchange,
				// only include persistedFetchExchange if `enableApq` is true
				...(this.#config.advancedOptions.enableApq
					? [persistedFetchExchange({ preferGetForPersistedQueries: true })]
					: []),
				fetchExchange
			],
			requestPolicy: 'network-only'
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
	protected async applyAfter<
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

	/**
	 * @param {QueryParams} queryParams - The arguments for your GraphQL query. The `query` field accepts strings, GraphQL ASTs, or TypedDocumentNodes. If using TypeScript, you can use {@link https://github.com/dotansimha/graphql-typed-document-node#how-to-use TypedDocumentNode} to get typed responses on your queries.
	 * @returns {Promise<StorefrontResponse>} storefrontResponse - the results of your query. If the query succeeds, the data will be on the `data` field. If there are errors, they will be contained within the `error` field.
	 *
	 * @example
	 * const { data, error } = await client.query({
	 * 	query: myQuery,
	 * 	variables: queryVariables
	 * });
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	query<QData = any, QVariables extends AnyVariables = any>({
		query,
		variables
	}: QueryParams<QData, QVariables>): Promise<StorefrontResponse<QData>> {
		return this.#graphqlClient
			.query(query, variables as QVariables)
			.toPromise()
			.then(({ data, error }) => {
				if (error) {
					const traceHeader = (error.response as Response)?.headers?.get(
						'x-amzn-trace-id'
					);
					if (traceHeader) {
						error.message = `${error.message}\nTrace ID: ${traceHeader}. Please include this Trace ID in support requests.`;
					}
				}
				return { data, error };
			})
			.then(({ data, error }) => this.applyAfter('query', { data, error }));
	}
}
