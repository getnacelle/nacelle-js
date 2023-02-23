import { requestPaginatedData } from './utils/requestPaginatedData.js';
import handleErrors from './utils/handle-errors.js';
import {
	SpacePropertiesDocument,
	NavigationDocument,
	ProductCollectionEntriesDocument
} from './graphql/documents.js';
import {
	entryIdsAndHandlesMessage,
	highEntriesPerPageMessage
} from './utils/messages.js';
import type {
	WithStorefrontQuery,
	WithConfig,
	StorefrontClient
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
import type {
	ContentResponse,
	ProductsResponse,
	ProductCollectionsResponse,
	ProductCollectionEntriesResponse
} from './types/relay.js';

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

export interface FetchCollectionEntriesMethodParams {
	collectionEntryId?: string;
	handle?: string;
	locale?: string;
	maxReturnedEntries?: number;
	cursor?: string;
	edgesToNodes?: boolean;
	advancedOptions?: FetchMethodAdvancedParams;
}

function commerceQueriesPlugin<TBase extends WithStorefrontQuery & WithConfig>(
	Base: TBase
) {
	return class CommerceQueries extends Base {
		async spaceProperties(): Promise<SpaceProperties> {
			const queryResponse = await this.query({
				query: SpacePropertiesDocument
			});

			if (queryResponse.error) {
				handleErrors(queryResponse.error);
			}

			const spaceProperties = queryResponse.data
				?.spaceProperties as SpaceProperties;

			return await (this as unknown as StorefrontClient)['applyAfter'](
				'spaceProperties',
				spaceProperties
			);
		}

		async navigation(
			params?: NavigationFilterInput
		): Promise<Array<NavigationGroup>> {
			const queryResponse = await this.query({
				query: NavigationDocument,
				variables: { filter: params }
			});

			if (queryResponse.error) {
				handleErrors(queryResponse.error);
			}

			const navigation = queryResponse.data
				?.navigation as Array<NavigationGroup>;

			return await (this as unknown as StorefrontClient)['applyAfter'](
				'navigation',
				navigation
			);
		}
		readonly #defaultMaxReturnedEntries = -1;
		readonly #defaultPageFetchLimit = 50;

		async content<Params extends FetchContentMethodParams>(
			params?: Params
		): Promise<ContentResponse<Params>> {
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

			return (await (this as unknown as StorefrontClient)['applyAfter'](
				'content',
				responseData
			)) as ContentResponse<Params>;
		}

		async products<Params extends CommerceQueriesParams>(
			params?: Params
		): Promise<ProductsResponse<Params>> {
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

			return (await (this as unknown as StorefrontClient)['applyAfter'](
				'products',
				responseData
			)) as ProductsResponse<Params>;
		}
		async productCollections<
			Params extends FetchProductCollectionsMethodParams
		>(params?: Params): Promise<ProductCollectionsResponse<Params>> {
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

			return (await (this as unknown as StorefrontClient)['applyAfter'](
				'productCollections',
				responseData
			)) as ProductCollectionsResponse<Params>;
		}
		async productCollectionEntries<
			Params extends FetchCollectionEntriesMethodParams
		>(params?: Params): Promise<ProductCollectionEntriesResponse<Params>> {
			const {
				collectionEntryId,
				handle,
				locale = this.getConfig()?.locale,
				maxReturnedEntries = this.#defaultMaxReturnedEntries,
				cursor,
				edgesToNodes = true,
				advancedOptions
			} = params ?? {};
			if (collectionEntryId && handle) {
				console.warn(
					'You have supplied both a collectionEntryId and handle. This method will use collectionEntryId for querying.'
				);
			}

			if (!collectionEntryId && !handle) {
				console.warn('You must provide either a collectionEntryId or handle.');
			}

			const entriesFirst = Math.min(
				...[
					advancedOptions?.entriesPerPage ?? this.#defaultPageFetchLimit,
					maxReturnedEntries
				].filter((v) => v > 0)
			);

			let entriesAfter = cursor;
			let allEntries: Product[] | ProductEdge[] = [];
			let keepFetching = true;

			do {
				const queryResponse = await this.query({
					query: ProductCollectionEntriesDocument,
					variables: {
						filter: {
							...(collectionEntryId && {
								nacelleEntryIds: [collectionEntryId]
							}),
							...(!collectionEntryId && handle ? { handles: [handle] } : {}),
							...(locale && { locale })
						},
						entriesFirst,
						...(entriesAfter && { entriesAfter })
					}
				});

				if (queryResponse.error) {
					handleErrors(queryResponse.error);
				}

				if (queryResponse.data) {
					const collectionEdges =
						queryResponse.data.allProductCollections.edges;
					if (collectionEdges.length === 0) {
						console.warn('No collections matching query');
						keepFetching = false;
					} else {
						const entries = collectionEdges[0].node.productConnection;
						if (entries) {
							const { pageInfo, edges } = entries;
							const {
								hasNextPage,
								endCursor
							}: { hasNextPage: boolean; endCursor: string } = pageInfo;
							const items = edgesToNodes
								? edges.map(({ node }) => node)
								: edges;

							allEntries = [...allEntries, ...items] as
								| Product[]
								| ProductEdge[];

							if (
								hasNextPage &&
								(maxReturnedEntries === -1 ||
									allEntries.length < maxReturnedEntries)
							) {
								entriesAfter = endCursor;
							} else {
								keepFetching = false;
							}
						}
					}
				}
			} while (keepFetching);

			return (await (this as unknown as StorefrontClient)['applyAfter'](
				'productCollectionEntries',
				allEntries
			)) as ProductCollectionEntriesResponse<Params>;
		}
	};
}

export default commerceQueriesPlugin;
