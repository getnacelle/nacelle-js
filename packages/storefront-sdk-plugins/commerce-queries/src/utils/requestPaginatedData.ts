import {
	AllContentDocument,
	AllProductsDocument,
	AllProductCollectionsDocument
} from '../graphql/documents.js';
import type {
	StorefrontClient,
	StorefrontResponse
} from '@nacelle/storefront-sdk';
import type {
	InputMaybe,
	Content,
	ContentEdge,
	Product,
	ProductCollection,
	ProductEdge,
	ProductCollectionEdge
} from '../types/storefront.js';

/** These are concrete unions of the different query names. As new paginated queries are added, they should be added to this union.*/
type PaginatedQueryName =
	| 'allContent'
	| 'allProducts'
	| 'allProductCollections';

interface QueryData<EdgeType> {
	pageInfo: { hasNextPage: boolean; endCursor: string };
	edges: EdgeType[];
}

type PaginatedQueryType<EdgeType> = {
	[Property in PaginatedQueryName]?: QueryData<EdgeType>;
};

/** Kinds of Node types that the paginated methods can return. As new queries are added, their corresponding Node types should be added here. */
type DataNodeType = Content | Product | ProductCollection;
/** Kinds of Node types that the paginated methods can return. As new queries are added, their corresponding Node types should be added here. */
type DataEdgeType = ContentEdge | ProductEdge | ProductCollectionEdge;

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

/** Returns the query based on the queryName. As new queries are added, they should be added to this switch case block. This helps us be confident that the query will have the correct key based on the queryName passed to the pagination function */
function queryFromName(queryName: PaginatedQueryName) {
	switch (queryName) {
		case 'allContent':
			return AllContentDocument;
		case 'allProducts':
			return AllProductsDocument;
		case 'allProductCollections':
			return AllProductCollectionsDocument;
	}
}

/** Makes paginated requests to the storefront api so that the method can return multiple "pages" of data in a single method call.  */
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
	edgesToNodes: boolean,
	maxReturnedEntriesPerCollection?: number
) => {
	let shouldKeepFetching = true;
	const queryToUse = queryFromName(queryName);
	const data: NodeType[] | EdgeType[] = [];
	do {
		const variables: {
			filter: TFilter;
			maxReturnedEntriesPerCollection?: number;
		} = { filter };

		if (Number.isInteger(maxReturnedEntriesPerCollection)) {
			variables.maxReturnedEntriesPerCollection =
				maxReturnedEntriesPerCollection;
		}

		// cast to an abstract type to make TS happy with access via queryResponse.data[queryName] since we know that the query chosen is guaranteed to have a field `queryName` but there's not a good way to handle that.
		const queryResponse = (await storefrontInstance.query({
			query: queryToUse,
			variables
		})) as unknown as StorefrontResponse<PaginatedQueryType<EdgeType>>;
		if (queryResponse.error) {
			return { error: queryResponse.error };
		}
		if (queryResponse.data) {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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
