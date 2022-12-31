import type {
	SpaceProperties,
	Product,
	Content,
	ContentEdge,
	NavigationGroup,
	ProductEdge,
	ProductCollection,
	ProductCollectionEdge
} from './storefront.js';
import type { dataFetchingMethods } from '../utils/index.js';

export type DataFetchingMethodName = typeof dataFetchingMethods[number];

export type AfterCallback<T> = (responseObj: T) => Promise<T> | T;

export type MethodData = {
	products: Product[] | ProductEdge[];
	productCollections: ProductCollection[] | ProductCollectionEdge[];
	productCollectionEntries: Product[] | ProductEdge[];
	content: Content[] | ContentEdge[];
	navigation: NavigationGroup[];
	spaceProperties: SpaceProperties;
	query: Record<string, unknown> | Array<Record<string, unknown>>;
};

export type AfterCallbackWithId<MethodName extends DataFetchingMethodName> = {
	[id: string]: AfterCallback<MethodData[MethodName]>;
};

export type MethodCallbacks<MethodName extends DataFetchingMethodName> = Record<
	MethodName,
	AfterCallbackWithId<MethodName>
>;

export type AfterSubscriptions<MethodName extends DataFetchingMethodName> =
	Partial<Record<MethodName, AfterCallbackWithId<MethodName>>>;
