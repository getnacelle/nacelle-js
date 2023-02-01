import { requestPaginatedData } from './utils/requestPaginatedData.js';
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

export interface FetchCollectionEntriesMethodParams {
	collectionEntryId?: string;
	handle?: string;
	locale?: string;
	maxReturnedEntries?: number;
	cursor?: string;
	edgesToNodes?: boolean;
	advancedOptions?: FetchMethodAdvancedParams;
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

		async productCollectionEntries(
			params?: FetchCollectionEntriesMethodParams
		): Promise<StorefrontResponse<Product[] | ProductEdge[]>> {
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
					return { error: queryResponse.error };
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

			return {
				data: await (this as unknown as StorefrontClient)['applyAfter'](
					'products',
					allEntries
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
