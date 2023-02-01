import { requestPaginatedData } from './utils/requestPaginatedData.js';
import {
	SpacePropertiesDocument,
	NavigationDocument
} from './graphql/documents.js';
import {
	entryIdsAndHandlesMessage,
	highEntriesPerPageMessage
} from './utils/messages.js';
import type {
	WithStorefrontQuery,
	WithConfig,
	StorefrontClient,
	StorefrontResponse
} from '@nacelle/storefront-sdk';
import type {
	Content,
	ContentEdge,
	ContentFilterInput,
	NavigationGroup,
	NavigationFilterInput,
	Product,
	ProductCollection,
	ProductCollectionEdge,
	ProductCollectionFilterInput,
	ProductEdge,
	ProductFilterInput,
	SpaceProperties
} from './types/storefront.js';

export interface CommerceQueriesParams {
	nacelleEntryIds?: string[];
	handles?: string[];
	locale?: string;
	maxReturnedEntries?: number;
	cursor?: string;
	edgesToNodes?: boolean;
	advancedOptions?: FetchMethodAdvancedParams;
}
export interface FetchMethodAdvancedParams {
	entriesPerPage?: number;
}

export interface FetchContentMethodParams extends CommerceQueriesParams {
	entryDepth?: number;
	type?: string;
}

export interface FetchProductCollectionsMethodParams
	extends CommerceQueriesParams {
	maxReturnedEntriesPerCollection?: number;
}

function commerceQueriesPlugin<TBase extends WithStorefrontQuery & WithConfig>(
	Base: TBase
) {
	return class CommerceQueries extends Base {
		async spaceProperties(): Promise<StorefrontResponse<SpaceProperties>> {
			const queryResponse = await this.query({
				query: SpacePropertiesDocument
			});

			if (queryResponse.error) {
				return queryResponse as StorefrontResponse<SpaceProperties>;
			}

			const spaceProperties = queryResponse.data
				?.spaceProperties as SpaceProperties;

			return {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-call
				data: await (this as unknown as StorefrontClient)['applyAfter'](
					'spaceProperties',
					spaceProperties
				)
			} as StorefrontResponse<SpaceProperties>;
		}

		async navigation(
			params?: NavigationFilterInput
		): Promise<StorefrontResponse<Array<NavigationGroup>>> {
			const queryResponse = await this.query({
				query: NavigationDocument,
				variables: { filter: params }
			});

			if (queryResponse.error) {
				return { ...queryResponse } as StorefrontResponse<NavigationGroup[]>;
			}

			const navigation = queryResponse.data
				?.navigation as Array<NavigationGroup>;

			return {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-call
				data: await (this as unknown as StorefrontClient)['applyAfter'](
					'navigation',
					navigation
				)
			} as StorefrontResponse<Array<NavigationGroup>>;
		}
		readonly #defaultMaxReturnedEntries = -1;
		readonly #defaultPageFetchLimit = 50;

		async content(
			params?: FetchContentMethodParams
		): Promise<StorefrontResponse<Content[] | ContentEdge[]>> {
			const {
				cursor,
				nacelleEntryIds,
				handles,
				locale = this.getConfig()?.locale,
				maxReturnedEntries = this.#defaultMaxReturnedEntries,
				advancedOptions,
				edgesToNodes = true,
				entryDepth,
				type
			} = params ?? {};

			if (Number(advancedOptions?.entriesPerPage) > 100) {
				console.warn(highEntriesPerPageMessage);
			}

			const first = Math.min(
				...[
					advancedOptions?.entriesPerPage ?? this.#defaultPageFetchLimit,
					maxReturnedEntries
				].filter((n) => n > 0)
			);
			const filter: ContentFilterInput = {
				after: cursor,
				locale,
				first,
				entryDepth,
				type
			};
			// keeping with v1 sdk, only use nacelleEntryIds if both handles and nacelleEntryIds are provided
			if (nacelleEntryIds && handles) {
				console.warn(entryIdsAndHandlesMessage('content'));
			}
			if (nacelleEntryIds) {
				filter.nacelleEntryIds = nacelleEntryIds;
			} else {
				filter.handles = handles;
			}

			const responseData = await requestPaginatedData<
				this,
				Content,
				ContentEdge,
				ContentFilterInput
			>(this, 'allContent', filter, maxReturnedEntries, edgesToNodes);

			if (responseData?.error) {
				return responseData;
			}
			return {
				data: await (this as unknown as StorefrontClient)['applyAfter'](
					'content',
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					responseData.data!
				)
			} as StorefrontResponse<ContentEdge[] | Content[]>;
		}

		async products(params?: CommerceQueriesParams) {
			const {
				cursor,
				nacelleEntryIds,
				handles,
				locale = this.getConfig()?.locale,
				maxReturnedEntries = this.#defaultMaxReturnedEntries,
				advancedOptions,
				edgesToNodes = true
			} = params ?? {};

			if (Number(advancedOptions?.entriesPerPage) > 100) {
				console.warn(highEntriesPerPageMessage);
			}

			const first = Math.min(
				...[
					advancedOptions?.entriesPerPage ?? this.#defaultPageFetchLimit,
					maxReturnedEntries
				].filter((n) => n > 0)
			);

			const filter: ProductFilterInput = {
				after: cursor,
				first,
				locale
			};

			// keeping with v1 sdk, only use nacelleEntryIds if both handles and nacelleEntryIds are provided
			if (nacelleEntryIds && handles) {
				console.warn(entryIdsAndHandlesMessage('products'));
			}
			if (nacelleEntryIds) {
				filter.nacelleEntryIds = nacelleEntryIds;
			} else {
				filter.handles = handles;
			}

			const responseData = await requestPaginatedData<
				this,
				Product,
				ProductEdge,
				ProductFilterInput
			>(this, 'allProducts', filter, maxReturnedEntries, edgesToNodes);

			if (responseData?.error) {
				return responseData;
			}
			return {
				data: await (this as unknown as StorefrontClient)['applyAfter'](
					'products',
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					responseData.data!
				)
			} as StorefrontResponse<ProductEdge[] | Product[]>;
		}

		async productCollections(params?: FetchProductCollectionsMethodParams) {
			const {
				cursor,
				nacelleEntryIds,
				handles,
				locale = this.getConfig()?.locale,
				maxReturnedEntries = this.#defaultMaxReturnedEntries,
				maxReturnedEntriesPerCollection,
				advancedOptions,
				edgesToNodes = true
			} = params ?? {};

			if (Number(advancedOptions?.entriesPerPage) > 100) {
				console.warn(highEntriesPerPageMessage);
			}

			const first = Math.min(
				...[
					advancedOptions?.entriesPerPage ?? this.#defaultPageFetchLimit,
					maxReturnedEntries
				].filter((n) => n > 0)
			);

			const filter: ProductCollectionFilterInput = {
				after: cursor,
				locale,
				first
			};

			// keeping with v1 sdk, only use nacelleEntryIds if both handles and nacelleEntryIds are provided
			if (nacelleEntryIds && handles) {
				console.warn(entryIdsAndHandlesMessage('productCollections'));
			}

			if (nacelleEntryIds) {
				filter.nacelleEntryIds = nacelleEntryIds;
			} else {
				filter.handles = handles;
			}

			const responseData = await requestPaginatedData<
				this,
				ProductCollection,
				ProductCollectionEdge,
				ProductCollectionFilterInput
			>(
				this,
				'allProductCollections',
				filter,
				maxReturnedEntries,
				edgesToNodes,
				maxReturnedEntriesPerCollection
			);

			if (responseData?.error) {
				return responseData;
			}

			return {
				data: await (this as unknown as StorefrontClient)['applyAfter'](
					'productCollections',
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					responseData.data!
				)
			} as StorefrontResponse<ProductCollection[] | ProductCollectionEdge[]>;
		}
	};
}

export default commerceQueriesPlugin;
