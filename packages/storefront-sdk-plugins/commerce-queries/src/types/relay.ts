import type { CommerceQueriesParams } from '../index.js';
import type {
	Content,
	ContentEdge,
	Product,
	ProductCollection,
	ProductCollectionEdge,
	ProductEdge
} from './storefront.js';

export type EdgesToNodesParam = Pick<CommerceQueriesParams, 'edgesToNodes'>;

/**
 * By default, Commerce Queries methods should return node types
 * if `edgesToNodes` is either not specified, or is explicitly set
 * to `true`. If `edgesToNodes` is explicitly set to `false`, then
 * the methods should return edge types.
 */
export type RelayResponse<
	Params extends EdgesToNodesParam,
	NodeType extends Content | Product | ProductCollection,
	EdgeType extends ContentEdge | ProductEdge | ProductCollectionEdge
> = Params extends { edgesToNodes: false } ? EdgeType[] : NodeType[];

export type ContentResponse<Params extends EdgesToNodesParam> = RelayResponse<
	Params,
	Content,
	ContentEdge
>;

export type ProductsResponse<Params extends EdgesToNodesParam> = RelayResponse<
	Params,
	Product,
	ProductEdge
>;

export type ProductCollectionsResponse<Params extends EdgesToNodesParam> =
	RelayResponse<Params, ProductCollection, ProductCollectionEdge>;

export type ProductCollectionEntriesResponse<Params extends EdgesToNodesParam> =
	RelayResponse<Params, Product, ProductEdge>;
