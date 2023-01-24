import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import type { StorefrontClient } from '@nacelle/storefront-sdk';
import type { StorefrontResponse } from 'node_modules/@nacelle/storefront-sdk/dist/types/client/index.js';
import type {
	InputMaybe,
	Node,
	NodeEdge,
	AllContentDocument
} from 'src/types/storefront.js';

type PaginatedQueryName = 'allContent';

type RelayQueryType = typeof AllContentDocument;
interface paginatedFilter {
	first?: InputMaybe<number>;
	after?: InputMaybe<string>;
}

function dataIsNodeOrEdge<NodeType, EdgeType>(
	data: NodeType[] | EdgeType[],
	edgesToNodes: boolean
): data is NodeType[] {
	//use Array.isArray here to keep TS happy about data being defined but never used. Issue where eslint is okay with it but TS is not
	return Array.isArray(data) && edgesToNodes;
}

export const requestPaginatedData = async <
	TBase extends Pick<StorefrontClient, 'query'>,
	NodeType extends Node,
	EdgeType extends NodeEdge,
	TFilter extends paginatedFilter
>(
	storefrontInstance: TBase,
	queryToUse: RelayQueryType,
	queryName: PaginatedQueryName,
	filter: TFilter,
	maxReturnedEntries: number,
	edgesToNodes: boolean
) => {
	let shouldKeepFetching = true;
	const data: NodeType[] | EdgeType[] = [];
	do {
		const queryResponse = await storefrontInstance.query({
			query: queryToUse,
			variables: { filter }
		});
		if (queryResponse.error) {
			// cast here because queryResponse.data should be undefined so the type of data doesn't actually  matter
			return queryResponse as StorefrontResponse<EdgeType[]>;
		}
		if (queryResponse.data) {
			if (dataIsNodeOrEdge<NodeType, EdgeType>(data, edgesToNodes)) {
				data.push(
					...queryResponse.data[queryName].edges.map((edge) => edge.node)
				);
			} else {
				data.push(...queryResponse.data[queryName].edges);
			}
			if (
				queryResponse.data[queryName]?.pageInfo?.hasNextPage &&
				(maxReturnedEntries === -1 || data.length < maxReturnedEntries)
			) {
				filter.after = queryResponse.data[queryName].pageInfo.endCursor;
			} else {
				shouldKeepFetching = false;
			}
		}
	} while (shouldKeepFetching);
	return { data } as StorefrontResponse<NodeType[] | EdgeType[]>;
};
