import type {
	WithStorefrontQuery,
	WithConfig,
	StorefrontClient,
	StorefrontResponse
} from '@nacelle/storefront-sdk';
import {
	SpacePropertiesDocument,
	NavigationDocument
} from './types/storefront.js';
import type {
	SpaceProperties,
	NavigationGroup,
	NavigationFilterInput,
	ContentFilterInput,
	Content,
	ContentEdge
} from './types/storefront.js';

import { requestPaginatedData } from './utils/requestPaginatedData.js';

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
	};
}

export default commerceQueriesPlugin;
