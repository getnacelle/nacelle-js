import type {
	Content,
	ContentEdge,
	NodeEdge,
	Product,
	ProductCollection,
	ProductCollectionEdge,
	ProductEdge
} from '../types/storefront.js';

// TODO: Determine if these identity utils should only be used
// internally (e.g. in tests) or if they are useful enough to
// justify exporting them in the package bundle. If we export
// them, we should add unit tests.

/* c8 ignore start */
const isObject = (input: unknown): input is Record<string, unknown> =>
	typeof input === 'object' && input !== null && !Array.isArray(input);

export const isContent = (input: unknown): input is Content =>
	isObject(input) && 'type' in input && 'type' in input && 'handle' in input;

export const isProduct = (input: unknown): input is Product =>
	isObject(input) &&
	'variants' in input &&
	Array.isArray((input as Product).variants);

export const isProductCollection = (
	input: unknown
): input is ProductCollection =>
	isObject(input) &&
	'productConnection' in input &&
	isProductEdgeArray((input as ProductCollection).productConnection?.edges);

const isEdge = (input: unknown): input is NodeEdge =>
	isObject(input) && 'cursor' in input && 'node' in input;

export const isContentEdge = (input: unknown): input is ContentEdge =>
	isEdge(input) && isContent(input.node);

export const isProductEdge = (input: unknown): input is ProductEdge =>
	isEdge(input) && isProduct(input.node);

export const isProductCollectionEdge = (
	input: unknown
): input is ProductCollectionEdge =>
	isEdge(input) && isProductCollection(input.node);

export const isContentArray = (input: unknown[]): input is Content[] =>
	Array.isArray(input) && input.every((x) => isContent(x));

export const isContentEdgeArray = (input: unknown[]): input is ContentEdge[] =>
	Array.isArray(input) && input.every((x) => isContentEdge(x));

export const isProductArray = (input: unknown[]): input is Product[] =>
	Array.isArray(input) && input.every((x) => isProduct(x));

export const isProductEdgeArray = (input: unknown[]): input is ProductEdge[] =>
	Array.isArray(input) && input.every((x) => isProductEdge(x));

export const isProductCollectionArray = (
	input: unknown
): input is ProductCollection[] =>
	Array.isArray(input) && input.every((x) => isProductCollection(x));

export const isProductCollectionEdgeArray = (
	input: unknown
): input is ProductCollectionEdge[] =>
	Array.isArray(input) && input.every((x) => isProductCollectionEdge(x));
/* c8 ignore stop */
