import type {
	WithStorefrontQuery,
	WithConfig,
	StorefrontClient,
	StorefrontResponse
} from '@nacelle/storefront-sdk';
import {
	SpacePropertiesDocument,
	NavigationDocument,
	AllContentDocument
} from './types/storefront.js';
import type {
	SpaceProperties,
	NavigationGroup,
	NavigationFilterInput,
	ContentFilterInput,
	Content,
	ContentEdge
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

function dataIsNodeOrEdge<NodeType, EdgeType>(
	data: NodeType[] | EdgeType[],
	edgesToNodes: boolean
): data is NodeType[] {
	//use Array.isArray here to keep TS happy about data being defined but never used. Issue where eslint is okay with it but TS is not
	return Array.isArray(data) && edgesToNodes;
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
				console.warn(
					'You have supplied both a nacelleEntryIds and handles. This method will use nacelleEntryIds for querying.'
				);
			}
			if (nacelleEntryIds) {
				filter.nacelleEntryIds = nacelleEntryIds;
			} else {
				filter.handles = handles;
			}

			// const responseData = await requestPaginatedData<
			// 	this,
			// 	Content,
			// 	ContentEdge,
			// 	ContentFilterInput
			// >(
			// 	this,
			// 	AllContentDocument,
			// 	'allContent',
			// 	filter,
			// 	maxReturnedEntries,
			// 	edgesToNodes
			// );

			// if (responseData?.error) {
			// 	return responseData;
			// }

			let shouldKeepFetching = true;
			const data: Content[] | ContentEdge[] = [];
			do {
				const queryResponse = await this.query({
					query: AllContentDocument,
					variables: { filter }
				});
				if (queryResponse.error) {
					// cast here because queryResponse.data should be undefined os the type doesn't actually  matter
					return queryResponse as StorefrontResponse<ContentEdge[]>;
				}
				if (queryResponse.data) {
					if (dataIsNodeOrEdge<Content, ContentEdge>(data, edgesToNodes)) {
						data.push(
							...queryResponse.data.allContent.edges.map((edge) => edge.node)
						);
					} else {
						data.push(
							...(queryResponse.data.allContent.edges as ContentEdge[])
						);
					}
					if (
						queryResponse.data.allContent.pageInfo.hasNextPage &&
						(maxReturnedEntries === -1 || data.length < maxReturnedEntries)
					) {
						filter.after = queryResponse.data?.allContent.pageInfo.endCursor;
					} else {
						shouldKeepFetching = false;
					}
				}
			} while (shouldKeepFetching);

			return {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-call
				data: await (this as unknown as StorefrontClient)['applyAfter'](
					'content',
					data
				)
			} as StorefrontResponse<ContentEdge[] | Content[]>;
		}
	};
}

export default commerceQueriesPlugin;
