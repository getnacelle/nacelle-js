import type { StorefrontClient } from '@nacelle/storefront-sdk';
import type { StorefrontResponse } from 'node_modules/@nacelle/storefront-sdk/dist/types/client/index.js';
import type { InputMaybe, Content, ContentEdge } from 'src/types/storefront.js';
import { AllContentDocument } from '../types/storefront.js';

/** These are concrete unions of the different queries  */

type PaginatedQueryName = 'allContent';

interface QueryData<EdgeType> {
	pageInfo: { hasNextPage: boolean; endCursor: string };
	edges: EdgeType[];
}

type PaginatedQueryType<EdgeType> = {
	[Property in PaginatedQueryName]?: QueryData<EdgeType>;
};

type DataNodeType = Content;
type DataEdgeType = ContentEdge;

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

function queryFromName(queryName: PaginatedQueryName) {
	switch (queryName) {
		case 'allContent':
			return AllContentDocument;
	}
}

export const requestPaginatedData = async <
	TBase extends Pick<StorefrontClient, 'query'>,
	NodeType extends DataNodeType,
	EdgeType extends DataEdgeType,
	TFilter extends paginatedFilter
>(
	storefrontInstance: TBase,
	queryName: PaginatedQueryName,
	filter: TFilter,
	maxReturnedEntries: number,
	edgesToNodes: boolean
) => {
	let shouldKeepFetching = true;
	const queryToUse = queryFromName(queryName);
	const data: NodeType[] | EdgeType[] = [];
	do {
		// cast to an abstract type to make TS happy with access via queryResponse.data[queryName] since we know that the query chosen is guaranteed to have a field `queryName` but there's not a good way to handle that.
		const queryResponse = (await storefrontInstance.query({
			query: queryToUse,
			variables: { filter }
		})) as unknown as StorefrontResponse<PaginatedQueryType<EdgeType>>;
		if (queryResponse.error) {
			// cast here because queryResponse.data should be undefined so the type of data doesn't actually  matter
			return queryResponse as StorefrontResponse<EdgeType[]>;
		}
		if (queryResponse.data) {
			const responseData: QueryData<EdgeType> = queryResponse.data[queryName]!;
			if (dataIsNodeOrEdge<NodeType, EdgeType>(data, edgesToNodes)) {
				data.push(
					...(responseData.edges.map((edge) => edge.node) as NodeType[])
				);
			} else {
				data.push(...responseData.edges);
			}
			if (
				responseData?.pageInfo?.hasNextPage &&
				(maxReturnedEntries === -1 || data.length < maxReturnedEntries)
			) {
				filter.after = responseData.pageInfo.endCursor;
			} else {
				shouldKeepFetching = false;
			}
		}
	} while (shouldKeepFetching);
	return { data } as StorefrontResponse<typeof data>;
};
