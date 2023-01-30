import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
	[K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
	Decimal: any;
	JSON: any;
};

export type CollectionContent = Node & {
	__typename?: 'CollectionContent';
	/** [sys] Reference to collection by Nacelle ID. */
	collectionEntryId: Scalars['ID'];
	/** [source] The Unix timestamp in seconds when the collection content was created. */
	createdAt?: Maybe<Scalars['Int']>;
	/** [source] The description for a collection. */
	description?: Maybe<Scalars['String']>;
	/** [source] The primary media for a collection. */
	featuredMedia?: Maybe<Media>;
	/** [source] Custom fields from a dynamic CMS source. */
	fields?: Maybe<Scalars['JSON']>;
	/** [sys] Reference to collection by handle. */
	handle?: Maybe<Scalars['String']>;
	/** [sys] Timestamp of when Nacelle last indexed this entry. */
	indexedAt?: Maybe<Scalars['Int']>;
	/** [source] The locale of product collection to be presented. [IETF language tag] (ie. en-US) */
	locale?: Maybe<Scalars['String']>;
	/** [source] List of metafields associated with the product collection. */
	metafields: Array<Metafield>;
	/** [sys] The Nacelle ID of the entry. */
	nacelleEntryId: Scalars['ID'];
	/** [source] Specifies if the collection content has been published. */
	published?: Maybe<Scalars['Boolean']>;
	/** [source] SEO fields for a collection */
	seo?: Maybe<Seo>;
	/** [source] The ID for the content from its system of origin (i.e. Shopify). */
	sourceEntryId: Scalars['ID'];
	/** [source] The ID for the system of origin. */
	sourceId: Scalars['ID'];
	/** [source] The title for a collection. */
	title?: Maybe<Scalars['String']>;
	/** [source] The Unix timestamp in seconds when the collection content was last modified. */
	updatedAt?: Maybe<Scalars['Int']>;
};

/** Represents master pieces of content like a page, article, employee, press-release, etc. */
export type Content = Node & {
	__typename?: 'Content';
	/** [source] The Unix timestamp in seconds when the content was created. */
	createdAt?: Maybe<Scalars['Int']>;
	/** [source] Stringified JSON representing custom fields from a dynamic CMS source. */
	fields?: Maybe<Scalars['JSON']>;
	/** [source] A human-friendly unique string for the content. */
	handle?: Maybe<Scalars['String']>;
	/** [sys] Timestamp of when Nacelle last indexed this entry. */
	indexedAt?: Maybe<Scalars['Int']>;
	/** [source] The locale of the content to be presented. [IETF language tag] (ie. en-US) */
	locale?: Maybe<Scalars['String']>;
	/** [sys] The Nacelle ID of the entry. */
	nacelleEntryId: Scalars['ID'];
	/** [source] Specifies if the content has been published. */
	published?: Maybe<Scalars['Boolean']>;
	/** [source] The ID for the content from its system of origin (i.e. Shopify). */
	sourceEntryId: Scalars['ID'];
	/** [source] The ID for the system of origin. */
	sourceId: Scalars['ID'];
	/** [source] List of tags that have been associated to the content. */
	tags: Array<Scalars['String']>;
	/** [source] The title for the content. */
	title?: Maybe<Scalars['String']>;
	/** [source] The categorization for the content, often used for search and filter. */
	type?: Maybe<Scalars['String']>;
	/** [source] The Unix timestamp in seconds when the content was last modified. */
	updatedAt?: Maybe<Scalars['Int']>;
};

/** Represents a collection of content: articles for a blog, employees for an About Us page, press releases for a News page, etc. */
export type ContentCollection = Node & {
	__typename?: 'ContentCollection';
	/** [source] Localized content associated with the content collection. */
	content?: Maybe<CollectionContent>;
	/** [source] List of content entries with Relay-style pagination */
	contentConnection: ContentConnection;
	/** [source] The Unix timestamp in seconds when the content collection was created. */
	createdAt?: Maybe<Scalars['Int']>;
	/**
	 * [source] List of content entries for a given content collection.
	 * @deprecated `contentConnection` should be used for paginated content queries.
	 */
	entries: Array<Content>;
	/** [sys] Timestamp of when Nacelle last indexed this entry. */
	indexedAt?: Maybe<Scalars['Int']>;
	/** [source] List of metafields associated with the content collection. */
	metafields: Array<Metafield>;
	/** [sys] The Nacelle ID of the entry. */
	nacelleEntryId: Scalars['ID'];
	/** [source] The ID for the content from its system of origin (i.e. Shopify). */
	sourceEntryId: Scalars['ID'];
	/** [source] The ID for the system of origin. */
	sourceId: Scalars['ID'];
	/** [source] List of tags that have been associated to the collection. */
	tags: Array<Scalars['String']>;
	/** [source] The Unix timestamp in seconds when the content collection was last modified. */
	updatedAt?: Maybe<Scalars['Int']>;
};

/** Represents a collection of content: articles for a blog, employees for an About Us page, press releases for a News page, etc. */
export type ContentCollectionContentConnectionArgs = {
	after?: InputMaybe<Scalars['String']>;
	first?: InputMaybe<Scalars['Int']>;
};

/** Represents a collection of content: articles for a blog, employees for an About Us page, press releases for a News page, etc. */
export type ContentCollectionEntriesArgs = {
	after?: InputMaybe<Scalars['String']>;
	first?: InputMaybe<Scalars['Int']>;
};

/** Result of a ContentCollection Query with pagination info */
export type ContentCollectionConnection = NodeConnection & {
	__typename?: 'ContentCollectionConnection';
	edges: Array<ContentCollectionEdge>;
	pageInfo: PageInfo;
};

/** Implementation of an Edge type for ContentCollection entries */
export type ContentCollectionEdge = NodeEdge & {
	__typename?: 'ContentCollectionEdge';
	cursor: Scalars['String'];
	node: ContentCollection;
};

/** Filter results for product collection */
export type ContentCollectionFilterInput = {
	/** Returns elements after a cursor nacelleEntryId */
	after?: InputMaybe<Scalars['String']>;
	/** Returns the first n collections of a query. Defaults to 100. Max value of 500 */
	first?: InputMaybe<Scalars['Int']>;
	/** Filter content collection entries by entry handle. */
	handles?: InputMaybe<Array<Scalars['String']>>;
	/** Filter items based on locale. [IETF language tag] (ie. en-US) */
	locale?: InputMaybe<Scalars['String']>;
	/** Filter content collection entries by Nacelle entry id. */
	nacelleEntryIds?: InputMaybe<Array<Scalars['String']>>;
};

/** Result of a Content Query with pagination info */
export type ContentConnection = NodeConnection & {
	__typename?: 'ContentConnection';
	edges: Array<ContentEdge>;
	/** [source] Returns filtered number of entries for backend search, defaults to null */
	filteredCount?: Maybe<Scalars['Int']>;
	pageInfo: PageInfo;
	/** [source] Returns total number of entries in a collection for collection queries, null for content queries */
	totalCount?: Maybe<Scalars['Int']>;
};

/** Implementation of an Edge type for Content entries */
export type ContentEdge = NodeEdge & {
	__typename?: 'ContentEdge';
	cursor: Scalars['String'];
	node: Content;
};

/** Filter results for content */
export type ContentFilterInput = {
	/** Returns elements after a cursor nacelleEntryId */
	after?: InputMaybe<Scalars['String']>;
	/** Determines how many levels of nested content entries should be returned */
	entryDepth?: InputMaybe<Scalars['Int']>;
	/** Returns the first n content entries of a query. Defaults to 100. Max value of 500 */
	first?: InputMaybe<Scalars['Int']>;
	/** Filter content entries by entry handle. Requires type filter or defaults to type of 'page'. */
	handles?: InputMaybe<Array<Scalars['String']>>;
	/** Filter items based on locale. [IETF language tag] (ie. en-US) */
	locale?: InputMaybe<Scalars['String']>;
	/** Filter content entries by Nacelle entry id. */
	nacelleEntryIds?: InputMaybe<Array<Scalars['String']>>;
	/** The backend search filter */
	searchFilter?: InputMaybe<ContentSearchOptions>;
	/** Filter content entries by content type (ie. 'article', 'page', etc.) */
	type?: InputMaybe<Scalars['String']>;
};

/** List of Content ids grouped for a specific purpose. */
export type ContentList = {
	__typename?: 'ContentList';
	ids: Array<Scalars['ID']>;
	listHandle?: Maybe<Scalars['String']>;
	title?: Maybe<Scalars['String']>;
};

/** Searchable fields for content */
export type ContentSearchFields = 'HANDLE' | 'TITLE' | 'TYPE';

/** Search options for content */
export type ContentSearchOptions = {
	/** The searchable fields for content */
	fields?: InputMaybe<Array<ContentSearchFields>>;
	/** The field by which to sort by */
	sortField?: InputMaybe<ProductCollectionSearchFields>;
	/** The order by which to sort */
	sortOrder?: InputMaybe<ProductCollectionSortOrder>;
	/** The search term of the entry to search */
	term?: InputMaybe<Scalars['String']>;
};

/** A piece of media that can represent an Image, 3dModel, or Video. */
export type Media = {
	__typename?: 'Media';
	altText?: Maybe<Scalars['String']>;
	id?: Maybe<Scalars['ID']>;
	mimeType?: Maybe<Scalars['String']>;
	src: Scalars['String'];
	thumbnailSrc?: Maybe<Scalars['String']>;
	type: Scalars['String'];
};

/** Metafields represent custom metadata attached to a resource. Metafields can be sorted into namespaces and are comprised of keys, values */
export type Metafield = {
	__typename?: 'Metafield';
	id?: Maybe<Scalars['ID']>;
	key: Scalars['String'];
	namespace?: Maybe<Scalars['String']>;
	value: Scalars['String'];
};

export type Mutation = {
	__typename?: 'Mutation';
	root?: Maybe<Scalars['String']>;
};

/** The filter to apply, when selecting navigation items. */
export type NavigationFilterInput = {
	/** The navigation group to filter by */
	groupId?: InputMaybe<Scalars['String']>;
};

export type NavigationGroup = {
	__typename?: 'NavigationGroup';
	/** Created-at timestamp */
	createdAt?: Maybe<Scalars['String']>;
	/** The unique identifier of the navigation group */
	groupId: Scalars['String'];
	/** Items within a navigation group */
	items?: Maybe<Array<NavigationGroupItem>>;
	/** Navigation properties */
	properties?: Maybe<Array<NavigationPropertyItem>>;
	/** Displayable title of a navigation group */
	title?: Maybe<Scalars['String']>;
	/** Updated-at timestamp */
	updatedAt?: Maybe<Scalars['String']>;
	/** Updated-by user ID */
	updatedBy?: Maybe<Scalars['String']>;
};

export type NavigationGroupItem = {
	__typename?: 'NavigationGroupItem';
	/** Navigation items */
	items?: Maybe<Array<NavigationGroupItem>>;
	/** Navigation media items */
	media?: Maybe<Array<NavigationMediaItem>>;
	/** Navigation properties */
	properties?: Maybe<Array<NavigationPropertyItem>>;
	/** Displayable title of a navigation item */
	title: Scalars['String'];
	/** Item type */
	type?: Maybe<NavigationPropertyType>;
	/** Route to a navigation item */
	url: Scalars['String'];
};

export type NavigationMediaItem = {
	__typename?: 'NavigationMediaItem';
	/** URL that links to the media item */
	url?: Maybe<Scalars['String']>;
};

export type NavigationPropertyItem = {
	__typename?: 'NavigationPropertyItem';
	key: Scalars['String'];
	value: Scalars['String'];
};

export type NavigationPropertyType =
	| 'BLOG'
	| 'COLLECTION'
	| 'EXTERNAL'
	| 'GENERAL'
	| 'PAGE'
	| 'PRODUCT';

/** An entry with a Globally Unique ID */
export type Node = {
	/** The Nacelle ID of the entry. */
	nacelleEntryId: Scalars['ID'];
};

/** An object containing an array of Node data and pagination information */
export type NodeConnection = {
	edges: Array<NodeEdge>;
	pageInfo: PageInfo;
};

/** An object containing a node with Nacelle data and a cursor for pagination and filtering */
export type NodeEdge = {
	cursor: Scalars['String'];
	node: Node;
};

/** Pagination object indicating if there are more pages of data and where the next page starts. */
export type PageInfo = {
	__typename?: 'PageInfo';
	endCursor: Scalars['String'];
	hasNextPage: Scalars['Boolean'];
	hasPreviousPage: Scalars['Boolean'];
	startCursor: Scalars['String'];
};

/** A price break definition. */
export type PriceBreak = {
	__typename?: 'PriceBreak';
	/** [source] List of metafields associated with the price break. */
	metafields: Array<Metafield>;
	/** [source] The price associated with this price break. */
	price?: Maybe<Scalars['Decimal']>;
	/** [source] Maximum quantity of variant needed to apply price break. */
	quantityMax?: Maybe<Scalars['Int']>;
	/** [source] Minimum quantity of variant needed to apply price break. */
	quantityMin?: Maybe<Scalars['Int']>;
};

/** A price rule definition. */
export type PriceRule = {
	__typename?: 'PriceRule';
	/** [source] Array of customer segment ids. Unused. */
	availableTo: Array<Scalars['String']>;
	/** [source] The compare at price of the price rule. This can be used to mark a variant as on sale. */
	comparedAtPrice?: Maybe<Scalars['Decimal']>;
	/** [source] Country code associated with this price rule. Distinct from currency code. */
	country?: Maybe<Scalars['String']>;
	/** [source] Identifying handle of price rule if applicable. */
	handle: Scalars['String'];
	/** [source] The id of the source price rule if applicable. */
	id?: Maybe<Scalars['ID']>;
	/** [source] List of metafields associated with the price rule. */
	metafields: Array<Metafield>;
	/** [source] The price associated with this price rule. */
	price: Scalars['Decimal'];
	/** [source] Used for changing a variant's price based on quantity selected. */
	priceBreaks: Array<PriceBreak>;
	/** [source] The currency code for this price rule. */
	priceCurrency: Scalars['String'];
	/** [source] The title of the price rule. */
	title: Scalars['String'];
};

/** A product represents an individual item for sale. Products are often physical, but they don't have to be. For example, a digital download (such as a movie, music or ebook file) also qualifies as a product, as do services (such as equipment rental, work for hire, customization of another product or an extended warranty). */
export type Product = Node & {
	__typename?: 'Product';
	/** [source] Specifies if at least one product variant is available for sale. */
	availableForSale?: Maybe<Scalars['Boolean']>;
	/** [source] Localized content for the product. */
	content?: Maybe<ProductContent>;
	/** [source] The Unix timestamp in seconds when the product was created. */
	createdAt?: Maybe<Scalars['Int']>;
	/** [sys] Timestamp of when Nacelle last indexed this entry. */
	indexedAt?: Maybe<Scalars['Int']>;
	/** [source] List of metafields associated with the product. */
	metafields: Array<Metafield>;
	/** [sys] The Nacelle ID of the entry. */
	nacelleEntryId: Scalars['ID'];
	/** [source] The categorization for a product, often used for search and filter. */
	productType?: Maybe<Scalars['String']>;
	/** [source] The ID for the product from its system of origin (i.e. Shopify). */
	sourceEntryId: Scalars['ID'];
	/** [source] The ID for the system of origin. */
	sourceId: Scalars['ID'];
	/** [source] List of tags that have been associated to the product. */
	tags: Array<Scalars['String']>;
	/** [source] The Unix timestamp in seconds when the product was last modified. */
	updatedAt?: Maybe<Scalars['Int']>;
	/** [source] List of variants for the product. */
	variants: Array<Variant>;
	/** [source] Vendor name for product. */
	vendor?: Maybe<Scalars['String']>;
};

/** Represents a collection of products. */
export type ProductCollection = Node & {
	__typename?: 'ProductCollection';
	/** [source] Localized content associated with the product collection. */
	content?: Maybe<CollectionContent>;
	/** [source] The Unix timestamp in seconds when the product collection was created. */
	createdAt?: Maybe<Scalars['Int']>;
	/** [sys] Timestamp of when Nacelle last indexed this entry. */
	indexedAt?: Maybe<Scalars['Int']>;
	/** [source] List of metafields associated with the product collection. */
	metafields: Array<Metafield>;
	/** [sys] The Nacelle ID of the entry. */
	nacelleEntryId: Scalars['ID'];
	/** [source] List of products entries with Relay-style pagination */
	productConnection: ProductConnection;
	/**
	 * [source] List of products for a given product collection.
	 * @deprecated `productConnection` should be used for paginated product queries.
	 */
	products: Array<Product>;
	/** [source] The ID for the content from its system of origin (i.e. Shopify). */
	sourceEntryId: Scalars['ID'];
	/** [source] The ID for the system of origin. */
	sourceId: Scalars['ID'];
	/** [source] List of tags that have been associated to the collection. */
	tags: Array<Scalars['String']>;
	/** [source] The Unix timestamp in seconds when the product collection was last modified. */
	updatedAt?: Maybe<Scalars['Int']>;
};

/** Represents a collection of products. */
export type ProductCollectionProductConnectionArgs = {
	after?: InputMaybe<Scalars['String']>;
	first?: InputMaybe<Scalars['Int']>;
};

/** Represents a collection of products. */
export type ProductCollectionProductsArgs = {
	after?: InputMaybe<Scalars['String']>;
	first?: InputMaybe<Scalars['Int']>;
};

/** Result of a Content Query with pagination info */
export type ProductCollectionConnection = NodeConnection & {
	__typename?: 'ProductCollectionConnection';
	edges: Array<ProductCollectionEdge>;
	/** [source] Returns filtered number of collections for backend search, defaults to null */
	filteredCount?: Maybe<Scalars['Int']>;
	pageInfo: PageInfo;
	/** [source] Returns total number of collections for backend search, defaults to null */
	totalCount?: Maybe<Scalars['Int']>;
};

/** Implementation of an Edge type for Content entries */
export type ProductCollectionEdge = NodeEdge & {
	__typename?: 'ProductCollectionEdge';
	cursor: Scalars['String'];
	node: ProductCollection;
};

/** Filter results for product collection */
export type ProductCollectionFilterInput = {
	/** Returns elements after a cursor nacelleEntryId */
	after?: InputMaybe<Scalars['String']>;
	/** Returns the first n collections of a query. Defaults to 100. Max value of 500 */
	first?: InputMaybe<Scalars['Int']>;
	/** Filter product collection entries by entry handle. */
	handles?: InputMaybe<Array<Scalars['String']>>;
	/** Filter items based on locale. [IETF language tag] (ie. en-US) */
	locale?: InputMaybe<Scalars['String']>;
	/** Filter product collection entries by Nacelle entry id. */
	nacelleEntryIds?: InputMaybe<Array<Scalars['String']>>;
	/** The backend search filter */
	searchFilter?: InputMaybe<ProductCollectionSearchOptions>;
	/** Filter content entries by content type (ie. 'article', 'page', etc.) */
	type?: InputMaybe<Scalars['String']>;
};

/** Searchable fields for product collection */
export type ProductCollectionSearchFields = 'HANDLE' | 'TITLE';

/** Search options for Product Collection */
export type ProductCollectionSearchOptions = {
	/** The searchable fields for product collections */
	fields?: InputMaybe<Array<ProductCollectionSearchFields>>;
	/** The field by which to sort by */
	sortField?: InputMaybe<ProductCollectionSearchFields>;
	/** The order by which to sort */
	sortOrder?: InputMaybe<ProductCollectionSortOrder>;
	/** The search term of the entry to search */
	term?: InputMaybe<Scalars['String']>;
};

/** Order by which to sort */
export type ProductCollectionSortOrder = 'ASC' | 'DESC';

/** Result of a Content Query with pagination info */
export type ProductConnection = NodeConnection & {
	__typename?: 'ProductConnection';
	edges: Array<ProductEdge>;
	/** [source] Returns filtered number of products for backend search, defaults to null */
	filteredCount?: Maybe<Scalars['Int']>;
	pageInfo: PageInfo;
	/** [source] Returns total number of products in a collection for collection queries, null for product queries */
	totalCount?: Maybe<Scalars['Int']>;
};

/** A piece of product content represents the localized version of data points, with more flexibility. */
export type ProductContent = Node & {
	__typename?: 'ProductContent';
	/** [source] The Unix timestamp in seconds when the product content was created. */
	createdAt?: Maybe<Scalars['Int']>;
	/** [source] The description for a product. */
	description?: Maybe<Scalars['String']>;
	/** [source] The primary media for a product. */
	featuredMedia?: Maybe<Media>;
	/** [source] Custom fields from a dynamic CMS source. */
	fields?: Maybe<Scalars['JSON']>;
	/** [sys] Reference to product by handle. */
	handle?: Maybe<Scalars['String']>;
	/** [sys] Timestamp of when Nacelle last indexed this entry. */
	indexedAt?: Maybe<Scalars['Int']>;
	/** [source] The locale of product content to be presented. [IETF language tag] (ie. en-US) */
	locale?: Maybe<Scalars['String']>;
	/** [source] List of media for a product */
	media: Array<Media>;
	/** [source] List of metafields associated with the product content. */
	metafields: Array<Metafield>;
	/** [sys] The Nacelle ID of the entry. */
	nacelleEntryId: Scalars['ID'];
	/** [source] List of product options. */
	options: Array<ProductOption>;
	/** [sys] Reference to product by Nacelle ID. */
	productEntryId?: Maybe<Scalars['ID']>;
	/** [source] Specifies if the product content has been published. */
	published?: Maybe<Scalars['Boolean']>;
	/** [source] SEO fields for a product */
	seo?: Maybe<Seo>;
	/** [source] The ID for the product content from its system of origin (i.e. Shopify). */
	sourceEntryId: Scalars['ID'];
	/** [source] The ID for the system of origin. */
	sourceId: Scalars['ID'];
	/** [source] The title for a product. */
	title?: Maybe<Scalars['String']>;
	/** [source] The Unix timestamp in seconds when the product content was last modified. */
	updatedAt?: Maybe<Scalars['Int']>;
};

/** Implementation of an Edge type for Product entries */
export type ProductEdge = NodeEdge & {
	__typename?: 'ProductEdge';
	cursor: Scalars['String'];
	node: Product;
};

/** Filter results for product */
export type ProductFilterInput = {
	/** Returns elements after a cursor nacelleEntryId */
	after?: InputMaybe<Scalars['String']>;
	/** Returns the first n products of a query. Defaults to 100. Max value of 500 */
	first?: InputMaybe<Scalars['Int']>;
	/** Filter product entries by entry handle. */
	handles?: InputMaybe<Array<Scalars['String']>>;
	/** Filter items based on locale. [IETF language tag] (ie. en-US) */
	locale?: InputMaybe<Scalars['String']>;
	/** Filter product entries by Nacelle entry id. */
	nacelleEntryIds?: InputMaybe<Array<Scalars['String']>>;
	/** The backend search filter */
	searchFilter?: InputMaybe<ProductSearchOptions>;
};

/** List of Product ids grouped for a specific purpose. */
export type ProductList = {
	__typename?: 'ProductList';
	ids: Array<Scalars['ID']>;
	listHandle?: Maybe<Scalars['String']>;
	title?: Maybe<Scalars['String']>;
};

/** Product property names like Size, Color, and Material that the customers can select. Variants are selected based on permutations of these options. */
export type ProductOption = {
	__typename?: 'ProductOption';
	name: Scalars['String'];
	values: Array<Scalars['String']>;
};

/** Searchable fields for product */
export type ProductSearchFields = 'HANDLE' | 'SKU' | 'TAGS' | 'TITLE';

/** Search options for product */
export type ProductSearchOptions = {
	/** The searchable fields for product */
	fields?: InputMaybe<Array<ProductSearchFields>>;
	/** The field by which to sort by */
	sortField?: InputMaybe<ProductCollectionSearchFields>;
	/** The order by which to sort */
	sortOrder?: InputMaybe<ProductCollectionSortOrder>;
	/** The search term of the entry to search */
	term?: InputMaybe<Scalars['String']>;
};

export type Query = {
	__typename?: 'Query';
	/** Query a list of content entries with Relay-style pagination */
	allContent: ContentConnection;
	/** Query a list of content collection entries with Relay-style pagination */
	allContentCollections: ContentCollectionConnection;
	/** Query a list of ProductCollection entries with Relay-style pagination */
	allProductCollections: ProductCollectionConnection;
	/** Query a list of products entries with Relay-style pagination */
	allProducts: ProductConnection;
	/**
	 * Query a list of content entries.
	 * @deprecated `allContent` should be used for paginated content queries.
	 */
	content: Array<Content>;
	/**
	 * Query a collection of contents
	 * @deprecated `allContentCollections` should be used for paginated content collection queries.
	 */
	contentCollections: Array<ContentCollection>;
	/** Get navigation groups for a space */
	navigation: Array<NavigationGroup>;
	/**
	 * Query a collection of products
	 * @deprecated `allProductCollections` should be used for paginated product collection queries.
	 */
	productCollections: Array<ProductCollection>;
	/**
	 * Query a list of products.
	 * @deprecated `allProducts` should be used for paginated product queries.
	 */
	products: Array<Product>;
	root?: Maybe<Scalars['String']>;
	/** Space properties data for a space */
	spaceProperties: SpaceProperties;
};

export type QueryAllContentArgs = {
	filter?: InputMaybe<ContentFilterInput>;
};

export type QueryAllContentCollectionsArgs = {
	filter?: InputMaybe<ContentCollectionFilterInput>;
};

export type QueryAllProductCollectionsArgs = {
	filter?: InputMaybe<ProductCollectionFilterInput>;
};

export type QueryAllProductsArgs = {
	filter?: InputMaybe<ProductFilterInput>;
};

export type QueryContentArgs = {
	filter?: InputMaybe<ContentFilterInput>;
};

export type QueryContentCollectionsArgs = {
	filter?: InputMaybe<ContentCollectionFilterInput>;
};

export type QueryNavigationArgs = {
	filter?: InputMaybe<NavigationFilterInput>;
};

export type QueryProductCollectionsArgs = {
	filter?: InputMaybe<ProductCollectionFilterInput>;
};

export type QueryProductsArgs = {
	filter?: InputMaybe<ProductFilterInput>;
};

/** A simple response indicating that an indexing event was received. Processing will occur in the background. */
export type QueryResponse = {
	__typename?: 'QueryResponse';
	message: Scalars['String'];
};

/** A field used to provide SEO data for web crawlers */
export type Seo = {
	__typename?: 'SEO';
	description: Scalars['String'];
	title: Scalars['String'];
};

/** Properties used by customers to select a product variant. Products can have multiple options, like different sizes or colors. */
export type SelectedOption = {
	__typename?: 'SelectedOption';
	label?: Maybe<Scalars['String']>;
	name: Scalars['String'];
	value: Scalars['String'];
};

export type SpaceProperties = {
	__typename?: 'SpaceProperties';
	/** List of space properties grouped by namespace */
	properties?: Maybe<Array<Maybe<SpacePropertyNamespace>>>;
	/** Updated-at timestamp */
	updatedAt?: Maybe<Scalars['String']>;
	/** Updated-by user ID */
	updatedBy?: Maybe<Scalars['String']>;
};

export type SpacePropertyItem = {
	__typename?: 'SpacePropertyItem';
	/** Property name */
	key: Scalars['String'];
	/** Property value */
	value: Scalars['String'];
};

export type SpacePropertyNamespace = {
	__typename?: 'SpacePropertyNamespace';
	/** List of space properties items */
	items?: Maybe<Array<Maybe<SpacePropertyItem>>>;
	/** Namespace name */
	namespace?: Maybe<Scalars['String']>;
};

/** A product variant represents a different version of a product, such as differing sizes or differing colors. */
export type Variant = Node & {
	__typename?: 'Variant';
	/** [source] Specifies if the variant is available for sale. */
	availableForSale?: Maybe<Scalars['Boolean']>;
	/** [source] The compare at price of the variant. This can be used to mark a variant as on sale. */
	compareAtPrice?: Maybe<Scalars['Decimal']>;
	/** [source] Localized content for the variant. */
	content?: Maybe<VariantContent>;
	/** [source] The Unix timestamp in seconds when the variant was created. */
	createdAt?: Maybe<Scalars['Int']>;
	/** [sys] Timestamp of when Nacelle last indexed this entry. */
	indexedAt?: Maybe<Scalars['Int']>;
	/** [source] List of metafields associated with the variant. */
	metafields: Array<Metafield>;
	/** [sys] The Nacelle ID of the entry. */
	nacelleEntryId: Scalars['ID'];
	/** [source] The price of the variant. */
	price?: Maybe<Scalars['Decimal']>;
	/** [source] The currency of the variant price. */
	priceCurrency?: Maybe<Scalars['String']>;
	/** [source] List of pricing rules associated with the variant */
	priceRules: Array<PriceRule>;
	/** [sys] Reference to parent product by Nacelle ID. */
	productEntryId?: Maybe<Scalars['ID']>;
	/** [sys] Reference to parent product by handle. */
	productHandle?: Maybe<Scalars['String']>;
	/** [source] The total sellable quantity of the variant for online sales channels. */
	quantityAvailable?: Maybe<Scalars['Int']>;
	/** [source] The SKU (stock keeping unit) associated with the variant. */
	sku?: Maybe<Scalars['String']>;
	/** [source] The ID for the product variant from its system of origin (i.e. Shopify). */
	sourceEntryId: Scalars['ID'];
	/** [source] The ID for the system of origin. */
	sourceId: Scalars['ID'];
	/** [source] The Unix timestamp in seconds when the variant was last modified. */
	updatedAt?: Maybe<Scalars['Int']>;
	/** [source] The variant sort position. */
	variantPosition?: Maybe<Scalars['Int']>;
	/** [source] The weight of the variant in the unit specified with weightUnit. */
	weight?: Maybe<Scalars['Float']>;
	/** [source] The unit of measurement for weight. */
	weightUnit?: Maybe<Scalars['String']>;
};

/** A piece of variant content represents the localized version of data points, with more flexibility. */
export type VariantContent = Node & {
	__typename?: 'VariantContent';
	/** [source] The Unix timestamp in seconds when the variant content was created. */
	createdAt?: Maybe<Scalars['Int']>;
	/** [source] The description for a variant. */
	description?: Maybe<Scalars['String']>;
	/** [source] The primary media for a variant. */
	featuredMedia?: Maybe<Media>;
	/** [source] Custom fields from a dynamic CMS source. */
	fields?: Maybe<Scalars['JSON']>;
	/** [sys] Timestamp of when Nacelle last indexed this entry. */
	indexedAt?: Maybe<Scalars['Int']>;
	/** [source] The locale of variant content to be presented. [IETF language tag] (ie. en-US) */
	locale?: Maybe<Scalars['String']>;
	/** [source] List of media for a variant */
	media: Array<Media>;
	/** [source] List of metafields associated with the variant content. */
	metafields: Array<Metafield>;
	/** [sys] The Nacelle ID of the entry. */
	nacelleEntryId: Scalars['ID'];
	/** [sys] Reference to parent product by Nacelle ID. */
	productEntryId?: Maybe<Scalars['ID']>;
	/** [sys] Reference to parent product by handle. */
	productHandle?: Maybe<Scalars['String']>;
	/** [source] Specifies if the variant content has been published. */
	published?: Maybe<Scalars['Boolean']>;
	/** [source] List of product options applied to the variant. */
	selectedOptions: Array<SelectedOption>;
	/** [source] The ID for the variant content from its system of origin (i.e. Shopify). */
	sourceEntryId: Scalars['ID'];
	/** [source] The ID for the system of origin. */
	sourceId: Scalars['ID'];
	/** [source] Source url of variant swatch. */
	swatchSrc?: Maybe<Scalars['String']>;
	/** [source] The title for a variant. */
	title?: Maybe<Scalars['String']>;
	/** [source] The Unix timestamp in seconds when the variant content was last modified. */
	updatedAt?: Maybe<Scalars['Int']>;
	/** [sys] Reference to parent variant by Nacelle ID. */
	variantEntryId?: Maybe<Scalars['ID']>;
};

export type Content_ContentFragment = {
	__typename?: 'Content';
	createdAt?: number | null;
	fields?: any | null;
	handle?: string | null;
	indexedAt?: number | null;
	locale?: string | null;
	nacelleEntryId: string;
	published?: boolean | null;
	sourceEntryId: string;
	sourceId: string;
	tags: Array<string>;
	title?: string | null;
	type?: string | null;
	updatedAt?: number | null;
};

export type Media_MediaFragment = {
	__typename?: 'Media';
	altText?: string | null;
	id?: string | null;
	mimeType?: string | null;
	src: string;
	thumbnailSrc?: string | null;
	type: string;
};

export type Metafield_MetafieldFragment = {
	__typename?: 'Metafield';
	id?: string | null;
	key: string;
	namespace?: string | null;
	value: string;
};

export type NavigationItem_NavigationItemFragment = {
	__typename?: 'NavigationGroupItem';
	title: string;
	type?: NavigationPropertyType | null;
	url: string;
	media?: Array<{
		__typename?: 'NavigationMediaItem';
		url?: string | null;
	}> | null;
	properties?: Array<{
		__typename?: 'NavigationPropertyItem';
		key: string;
		value: string;
	}> | null;
};

export type Product_ProductFragment = {
	__typename?: 'Product';
	availableForSale?: boolean | null;
	createdAt?: number | null;
	indexedAt?: number | null;
	nacelleEntryId: string;
	productType?: string | null;
	sourceEntryId: string;
	sourceId: string;
	tags: Array<string>;
	updatedAt?: number | null;
	vendor?: string | null;
	metafields: Array<{
		__typename?: 'Metafield';
		id?: string | null;
		key: string;
		namespace?: string | null;
		value: string;
	}>;
	variants: Array<{
		__typename?: 'Variant';
		availableForSale?: boolean | null;
		compareAtPrice?: any | null;
		createdAt?: number | null;
		indexedAt?: number | null;
		nacelleEntryId: string;
		price?: any | null;
		priceCurrency?: string | null;
		productEntryId?: string | null;
		productHandle?: string | null;
		quantityAvailable?: number | null;
		sku?: string | null;
		sourceEntryId: string;
		sourceId: string;
		updatedAt?: number | null;
		weight?: number | null;
		weightUnit?: string | null;
		content?: {
			__typename?: 'VariantContent';
			createdAt?: number | null;
			description?: string | null;
			fields?: any | null;
			indexedAt?: number | null;
			locale?: string | null;
			nacelleEntryId: string;
			productEntryId?: string | null;
			productHandle?: string | null;
			published?: boolean | null;
			sourceEntryId: string;
			sourceId: string;
			swatchSrc?: string | null;
			title?: string | null;
			updatedAt?: number | null;
			variantEntryId?: string | null;
			featuredMedia?: {
				__typename?: 'Media';
				altText?: string | null;
				id?: string | null;
				mimeType?: string | null;
				src: string;
				thumbnailSrc?: string | null;
				type: string;
			} | null;
			media: Array<{
				__typename?: 'Media';
				altText?: string | null;
				id?: string | null;
				mimeType?: string | null;
				src: string;
				thumbnailSrc?: string | null;
				type: string;
			}>;
			metafields: Array<{
				__typename?: 'Metafield';
				id?: string | null;
				key: string;
				namespace?: string | null;
				value: string;
			}>;
			selectedOptions: Array<{
				__typename?: 'SelectedOption';
				label?: string | null;
				name: string;
				value: string;
			}>;
		} | null;
		metafields: Array<{
			__typename?: 'Metafield';
			id?: string | null;
			key: string;
			namespace?: string | null;
			value: string;
		}>;
		priceRules: Array<{
			__typename?: 'PriceRule';
			comparedAtPrice?: any | null;
			country?: string | null;
			id?: string | null;
			price: any;
			priceCurrency: string;
			title: string;
			metafields: Array<{
				__typename?: 'Metafield';
				id?: string | null;
				key: string;
				namespace?: string | null;
				value: string;
			}>;
			priceBreaks: Array<{
				__typename?: 'PriceBreak';
				price?: any | null;
				quantityMax?: number | null;
				quantityMin?: number | null;
				metafields: Array<{
					__typename?: 'Metafield';
					id?: string | null;
					key: string;
					namespace?: string | null;
					value: string;
				}>;
			}>;
		}>;
	}>;
	content?: {
		__typename?: 'ProductContent';
		createdAt?: number | null;
		description?: string | null;
		fields?: any | null;
		handle?: string | null;
		indexedAt?: number | null;
		locale?: string | null;
		nacelleEntryId: string;
		productEntryId?: string | null;
		published?: boolean | null;
		sourceEntryId: string;
		sourceId: string;
		title?: string | null;
		updatedAt?: number | null;
		featuredMedia?: {
			__typename?: 'Media';
			altText?: string | null;
			id?: string | null;
			mimeType?: string | null;
			src: string;
			thumbnailSrc?: string | null;
			type: string;
		} | null;
		media: Array<{
			__typename?: 'Media';
			altText?: string | null;
			id?: string | null;
			mimeType?: string | null;
			src: string;
			thumbnailSrc?: string | null;
			type: string;
		}>;
		metafields: Array<{
			__typename?: 'Metafield';
			id?: string | null;
			key: string;
			namespace?: string | null;
			value: string;
		}>;
		options: Array<{
			__typename?: 'ProductOption';
			name: string;
			values: Array<string>;
		}>;
		seo?: { __typename?: 'SEO'; title: string; description: string } | null;
	} | null;
};

export type ProductContent_ProductContentFragment = {
	__typename?: 'ProductContent';
	createdAt?: number | null;
	description?: string | null;
	fields?: any | null;
	handle?: string | null;
	indexedAt?: number | null;
	locale?: string | null;
	nacelleEntryId: string;
	productEntryId?: string | null;
	published?: boolean | null;
	sourceEntryId: string;
	sourceId: string;
	title?: string | null;
	updatedAt?: number | null;
	featuredMedia?: {
		__typename?: 'Media';
		altText?: string | null;
		id?: string | null;
		mimeType?: string | null;
		src: string;
		thumbnailSrc?: string | null;
		type: string;
	} | null;
	media: Array<{
		__typename?: 'Media';
		altText?: string | null;
		id?: string | null;
		mimeType?: string | null;
		src: string;
		thumbnailSrc?: string | null;
		type: string;
	}>;
	metafields: Array<{
		__typename?: 'Metafield';
		id?: string | null;
		key: string;
		namespace?: string | null;
		value: string;
	}>;
	options: Array<{
		__typename?: 'ProductOption';
		name: string;
		values: Array<string>;
	}>;
	seo?: { __typename?: 'SEO'; title: string; description: string } | null;
};

export type ProductOption_ProductOptionFragment = {
	__typename?: 'ProductOption';
	name: string;
	values: Array<string>;
};

export type ProductPriceBreak_ProductPriceBreakFragment = {
	__typename?: 'PriceBreak';
	price?: any | null;
	quantityMax?: number | null;
	quantityMin?: number | null;
	metafields: Array<{
		__typename?: 'Metafield';
		id?: string | null;
		key: string;
		namespace?: string | null;
		value: string;
	}>;
};

export type ProductPriceRules_ProductPriceRulesFragment = {
	__typename?: 'PriceRule';
	comparedAtPrice?: any | null;
	country?: string | null;
	id?: string | null;
	price: any;
	priceCurrency: string;
	title: string;
	metafields: Array<{
		__typename?: 'Metafield';
		id?: string | null;
		key: string;
		namespace?: string | null;
		value: string;
	}>;
	priceBreaks: Array<{
		__typename?: 'PriceBreak';
		price?: any | null;
		quantityMax?: number | null;
		quantityMin?: number | null;
		metafields: Array<{
			__typename?: 'Metafield';
			id?: string | null;
			key: string;
			namespace?: string | null;
			value: string;
		}>;
	}>;
};

export type Seo_SeoFragment = {
	__typename?: 'SEO';
	title: string;
	description: string;
};

export type Variant_VariantFragment = {
	__typename?: 'Variant';
	availableForSale?: boolean | null;
	compareAtPrice?: any | null;
	createdAt?: number | null;
	indexedAt?: number | null;
	nacelleEntryId: string;
	price?: any | null;
	priceCurrency?: string | null;
	productEntryId?: string | null;
	productHandle?: string | null;
	quantityAvailable?: number | null;
	sku?: string | null;
	sourceEntryId: string;
	sourceId: string;
	updatedAt?: number | null;
	weight?: number | null;
	weightUnit?: string | null;
	content?: {
		__typename?: 'VariantContent';
		createdAt?: number | null;
		description?: string | null;
		fields?: any | null;
		indexedAt?: number | null;
		locale?: string | null;
		nacelleEntryId: string;
		productEntryId?: string | null;
		productHandle?: string | null;
		published?: boolean | null;
		sourceEntryId: string;
		sourceId: string;
		swatchSrc?: string | null;
		title?: string | null;
		updatedAt?: number | null;
		variantEntryId?: string | null;
		featuredMedia?: {
			__typename?: 'Media';
			altText?: string | null;
			id?: string | null;
			mimeType?: string | null;
			src: string;
			thumbnailSrc?: string | null;
			type: string;
		} | null;
		media: Array<{
			__typename?: 'Media';
			altText?: string | null;
			id?: string | null;
			mimeType?: string | null;
			src: string;
			thumbnailSrc?: string | null;
			type: string;
		}>;
		metafields: Array<{
			__typename?: 'Metafield';
			id?: string | null;
			key: string;
			namespace?: string | null;
			value: string;
		}>;
		selectedOptions: Array<{
			__typename?: 'SelectedOption';
			label?: string | null;
			name: string;
			value: string;
		}>;
	} | null;
	metafields: Array<{
		__typename?: 'Metafield';
		id?: string | null;
		key: string;
		namespace?: string | null;
		value: string;
	}>;
	priceRules: Array<{
		__typename?: 'PriceRule';
		comparedAtPrice?: any | null;
		country?: string | null;
		id?: string | null;
		price: any;
		priceCurrency: string;
		title: string;
		metafields: Array<{
			__typename?: 'Metafield';
			id?: string | null;
			key: string;
			namespace?: string | null;
			value: string;
		}>;
		priceBreaks: Array<{
			__typename?: 'PriceBreak';
			price?: any | null;
			quantityMax?: number | null;
			quantityMin?: number | null;
			metafields: Array<{
				__typename?: 'Metafield';
				id?: string | null;
				key: string;
				namespace?: string | null;
				value: string;
			}>;
		}>;
	}>;
};

export type VariantContent_VariantContentFragment = {
	__typename?: 'VariantContent';
	createdAt?: number | null;
	description?: string | null;
	fields?: any | null;
	indexedAt?: number | null;
	locale?: string | null;
	nacelleEntryId: string;
	productEntryId?: string | null;
	productHandle?: string | null;
	published?: boolean | null;
	sourceEntryId: string;
	sourceId: string;
	swatchSrc?: string | null;
	title?: string | null;
	updatedAt?: number | null;
	variantEntryId?: string | null;
	featuredMedia?: {
		__typename?: 'Media';
		altText?: string | null;
		id?: string | null;
		mimeType?: string | null;
		src: string;
		thumbnailSrc?: string | null;
		type: string;
	} | null;
	media: Array<{
		__typename?: 'Media';
		altText?: string | null;
		id?: string | null;
		mimeType?: string | null;
		src: string;
		thumbnailSrc?: string | null;
		type: string;
	}>;
	metafields: Array<{
		__typename?: 'Metafield';
		id?: string | null;
		key: string;
		namespace?: string | null;
		value: string;
	}>;
	selectedOptions: Array<{
		__typename?: 'SelectedOption';
		label?: string | null;
		name: string;
		value: string;
	}>;
};

export type AllContentQueryVariables = Exact<{
	filter?: InputMaybe<ContentFilterInput>;
}>;

export type AllContentQuery = {
	__typename?: 'Query';
	allContent: {
		__typename?: 'ContentConnection';
		pageInfo: {
			__typename?: 'PageInfo';
			hasNextPage: boolean;
			endCursor: string;
		};
		edges: Array<{
			__typename?: 'ContentEdge';
			cursor: string;
			node: {
				__typename?: 'Content';
				createdAt?: number | null;
				fields?: any | null;
				handle?: string | null;
				indexedAt?: number | null;
				locale?: string | null;
				nacelleEntryId: string;
				published?: boolean | null;
				sourceEntryId: string;
				sourceId: string;
				tags: Array<string>;
				title?: string | null;
				type?: string | null;
				updatedAt?: number | null;
			};
		}>;
	};
};

export type NavigationQueryVariables = Exact<{
	filter?: InputMaybe<NavigationFilterInput>;
}>;

export type NavigationQuery = {
	__typename?: 'Query';
	navigation: Array<{
		__typename?: 'NavigationGroup';
		groupId: string;
		title?: string | null;
		updatedAt?: string | null;
		updatedBy?: string | null;
		items?: Array<{
			__typename?: 'NavigationGroupItem';
			title: string;
			type?: NavigationPropertyType | null;
			url: string;
			items?: Array<{
				__typename?: 'NavigationGroupItem';
				title: string;
				type?: NavigationPropertyType | null;
				url: string;
				items?: Array<{
					__typename?: 'NavigationGroupItem';
					title: string;
					type?: NavigationPropertyType | null;
					url: string;
					items?: Array<{
						__typename?: 'NavigationGroupItem';
						title: string;
						type?: NavigationPropertyType | null;
						url: string;
						items?: Array<{
							__typename?: 'NavigationGroupItem';
							title: string;
							type?: NavigationPropertyType | null;
							url: string;
							media?: Array<{
								__typename?: 'NavigationMediaItem';
								url?: string | null;
							}> | null;
							properties?: Array<{
								__typename?: 'NavigationPropertyItem';
								key: string;
								value: string;
							}> | null;
						}> | null;
						media?: Array<{
							__typename?: 'NavigationMediaItem';
							url?: string | null;
						}> | null;
						properties?: Array<{
							__typename?: 'NavigationPropertyItem';
							key: string;
							value: string;
						}> | null;
					}> | null;
					media?: Array<{
						__typename?: 'NavigationMediaItem';
						url?: string | null;
					}> | null;
					properties?: Array<{
						__typename?: 'NavigationPropertyItem';
						key: string;
						value: string;
					}> | null;
				}> | null;
				media?: Array<{
					__typename?: 'NavigationMediaItem';
					url?: string | null;
				}> | null;
				properties?: Array<{
					__typename?: 'NavigationPropertyItem';
					key: string;
					value: string;
				}> | null;
			}> | null;
			media?: Array<{
				__typename?: 'NavigationMediaItem';
				url?: string | null;
			}> | null;
			properties?: Array<{
				__typename?: 'NavigationPropertyItem';
				key: string;
				value: string;
			}> | null;
		}> | null;
	}>;
};

export type AllProductsQueryVariables = Exact<{
	filter?: InputMaybe<ProductFilterInput>;
}>;

export type AllProductsQuery = {
	__typename?: 'Query';
	allProducts: {
		__typename?: 'ProductConnection';
		pageInfo: {
			__typename?: 'PageInfo';
			hasNextPage: boolean;
			endCursor: string;
		};
		edges: Array<{
			__typename?: 'ProductEdge';
			cursor: string;
			node: {
				__typename?: 'Product';
				availableForSale?: boolean | null;
				createdAt?: number | null;
				indexedAt?: number | null;
				nacelleEntryId: string;
				productType?: string | null;
				sourceEntryId: string;
				sourceId: string;
				tags: Array<string>;
				updatedAt?: number | null;
				vendor?: string | null;
				metafields: Array<{
					__typename?: 'Metafield';
					id?: string | null;
					key: string;
					namespace?: string | null;
					value: string;
				}>;
				variants: Array<{
					__typename?: 'Variant';
					availableForSale?: boolean | null;
					compareAtPrice?: any | null;
					createdAt?: number | null;
					indexedAt?: number | null;
					nacelleEntryId: string;
					price?: any | null;
					priceCurrency?: string | null;
					productEntryId?: string | null;
					productHandle?: string | null;
					quantityAvailable?: number | null;
					sku?: string | null;
					sourceEntryId: string;
					sourceId: string;
					updatedAt?: number | null;
					weight?: number | null;
					weightUnit?: string | null;
					content?: {
						__typename?: 'VariantContent';
						createdAt?: number | null;
						description?: string | null;
						fields?: any | null;
						indexedAt?: number | null;
						locale?: string | null;
						nacelleEntryId: string;
						productEntryId?: string | null;
						productHandle?: string | null;
						published?: boolean | null;
						sourceEntryId: string;
						sourceId: string;
						swatchSrc?: string | null;
						title?: string | null;
						updatedAt?: number | null;
						variantEntryId?: string | null;
						featuredMedia?: {
							__typename?: 'Media';
							altText?: string | null;
							id?: string | null;
							mimeType?: string | null;
							src: string;
							thumbnailSrc?: string | null;
							type: string;
						} | null;
						media: Array<{
							__typename?: 'Media';
							altText?: string | null;
							id?: string | null;
							mimeType?: string | null;
							src: string;
							thumbnailSrc?: string | null;
							type: string;
						}>;
						metafields: Array<{
							__typename?: 'Metafield';
							id?: string | null;
							key: string;
							namespace?: string | null;
							value: string;
						}>;
						selectedOptions: Array<{
							__typename?: 'SelectedOption';
							label?: string | null;
							name: string;
							value: string;
						}>;
					} | null;
					metafields: Array<{
						__typename?: 'Metafield';
						id?: string | null;
						key: string;
						namespace?: string | null;
						value: string;
					}>;
					priceRules: Array<{
						__typename?: 'PriceRule';
						comparedAtPrice?: any | null;
						country?: string | null;
						id?: string | null;
						price: any;
						priceCurrency: string;
						title: string;
						metafields: Array<{
							__typename?: 'Metafield';
							id?: string | null;
							key: string;
							namespace?: string | null;
							value: string;
						}>;
						priceBreaks: Array<{
							__typename?: 'PriceBreak';
							price?: any | null;
							quantityMax?: number | null;
							quantityMin?: number | null;
							metafields: Array<{
								__typename?: 'Metafield';
								id?: string | null;
								key: string;
								namespace?: string | null;
								value: string;
							}>;
						}>;
					}>;
				}>;
				content?: {
					__typename?: 'ProductContent';
					createdAt?: number | null;
					description?: string | null;
					fields?: any | null;
					handle?: string | null;
					indexedAt?: number | null;
					locale?: string | null;
					nacelleEntryId: string;
					productEntryId?: string | null;
					published?: boolean | null;
					sourceEntryId: string;
					sourceId: string;
					title?: string | null;
					updatedAt?: number | null;
					featuredMedia?: {
						__typename?: 'Media';
						altText?: string | null;
						id?: string | null;
						mimeType?: string | null;
						src: string;
						thumbnailSrc?: string | null;
						type: string;
					} | null;
					media: Array<{
						__typename?: 'Media';
						altText?: string | null;
						id?: string | null;
						mimeType?: string | null;
						src: string;
						thumbnailSrc?: string | null;
						type: string;
					}>;
					metafields: Array<{
						__typename?: 'Metafield';
						id?: string | null;
						key: string;
						namespace?: string | null;
						value: string;
					}>;
					options: Array<{
						__typename?: 'ProductOption';
						name: string;
						values: Array<string>;
					}>;
					seo?: {
						__typename?: 'SEO';
						title: string;
						description: string;
					} | null;
				} | null;
			};
		}>;
	};
};

export type SpacePropertiesQueryVariables = Exact<{ [key: string]: never }>;

export type SpacePropertiesQuery = {
	__typename?: 'Query';
	spaceProperties: {
		__typename?: 'SpaceProperties';
		updatedAt?: string | null;
		updatedBy?: string | null;
		properties?: Array<{
			__typename?: 'SpacePropertyNamespace';
			namespace?: string | null;
			items?: Array<{
				__typename?: 'SpacePropertyItem';
				key: string;
				value: string;
			} | null> | null;
		} | null> | null;
	};
};

export const Content_ContentFragmentDoc = {
	kind: 'Document',
	definitions: [
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'Content_content' },
			typeCondition: {
				kind: 'NamedType',
				name: { kind: 'Name', value: 'Content' }
			},
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{ kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'fields' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'handle' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'indexedAt' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'locale' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'nacelleEntryId' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'published' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'sourceEntryId' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'sourceId' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'tags' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'title' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'type' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
				]
			}
		}
	]
} as unknown as DocumentNode<Content_ContentFragment, unknown>;
export const NavigationItem_NavigationItemFragmentDoc = {
	kind: 'Document',
	definitions: [
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'NavigationItem_navigationItem' },
			typeCondition: {
				kind: 'NamedType',
				name: { kind: 'Name', value: 'NavigationGroupItem' }
			},
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{ kind: 'Field', name: { kind: 'Name', value: 'title' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'type' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'url' } },
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'media' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'url' } }
							]
						}
					},
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'properties' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'key' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'value' } }
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<NavigationItem_NavigationItemFragment, unknown>;
export const Metafield_MetafieldFragmentDoc = {
	kind: 'Document',
	definitions: [
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'Metafield_metafield' },
			typeCondition: {
				kind: 'NamedType',
				name: { kind: 'Name', value: 'Metafield' }
			},
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'key' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'namespace' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'value' } }
				]
			}
		}
	]
} as unknown as DocumentNode<Metafield_MetafieldFragment, unknown>;
export const Media_MediaFragmentDoc = {
	kind: 'Document',
	definitions: [
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'Media_media' },
			typeCondition: {
				kind: 'NamedType',
				name: { kind: 'Name', value: 'Media' }
			},
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{ kind: 'Field', name: { kind: 'Name', value: 'altText' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'mimeType' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'src' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'thumbnailSrc' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'type' } }
				]
			}
		}
	]
} as unknown as DocumentNode<Media_MediaFragment, unknown>;
export const VariantContent_VariantContentFragmentDoc = {
	kind: 'Document',
	definitions: [
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'VariantContent_variantContent' },
			typeCondition: {
				kind: 'NamedType',
				name: { kind: 'Name', value: 'VariantContent' }
			},
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{ kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'description' } },
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'featuredMedia' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'FragmentSpread',
									name: { kind: 'Name', value: 'Media_media' }
								}
							]
						}
					},
					{ kind: 'Field', name: { kind: 'Name', value: 'fields' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'indexedAt' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'locale' } },
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'media' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'FragmentSpread',
									name: { kind: 'Name', value: 'Media_media' }
								}
							]
						}
					},
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'metafields' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'FragmentSpread',
									name: { kind: 'Name', value: 'Metafield_metafield' }
								}
							]
						}
					},
					{ kind: 'Field', name: { kind: 'Name', value: 'nacelleEntryId' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'productEntryId' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'productHandle' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'published' } },
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'selectedOptions' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'label' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'name' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'value' } }
							]
						}
					},
					{ kind: 'Field', name: { kind: 'Name', value: 'sourceEntryId' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'sourceId' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'swatchSrc' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'title' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'variantEntryId' } }
				]
			}
		}
	]
} as unknown as DocumentNode<VariantContent_VariantContentFragment, unknown>;
export const ProductPriceBreak_ProductPriceBreakFragmentDoc = {
	kind: 'Document',
	definitions: [
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'ProductPriceBreak_productPriceBreak' },
			typeCondition: {
				kind: 'NamedType',
				name: { kind: 'Name', value: 'PriceBreak' }
			},
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'metafields' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'FragmentSpread',
									name: { kind: 'Name', value: 'Metafield_metafield' }
								}
							]
						}
					},
					{ kind: 'Field', name: { kind: 'Name', value: 'price' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'quantityMax' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'quantityMin' } }
				]
			}
		}
	]
} as unknown as DocumentNode<
	ProductPriceBreak_ProductPriceBreakFragment,
	unknown
>;
export const ProductPriceRules_ProductPriceRulesFragmentDoc = {
	kind: 'Document',
	definitions: [
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'ProductPriceRules_productPriceRules' },
			typeCondition: {
				kind: 'NamedType',
				name: { kind: 'Name', value: 'PriceRule' }
			},
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{ kind: 'Field', name: { kind: 'Name', value: 'comparedAtPrice' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'country' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'metafields' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'FragmentSpread',
									name: { kind: 'Name', value: 'Metafield_metafield' }
								}
							]
						}
					},
					{ kind: 'Field', name: { kind: 'Name', value: 'price' } },
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'priceBreaks' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'FragmentSpread',
									name: {
										kind: 'Name',
										value: 'ProductPriceBreak_productPriceBreak'
									}
								}
							]
						}
					},
					{ kind: 'Field', name: { kind: 'Name', value: 'priceCurrency' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'title' } }
				]
			}
		}
	]
} as unknown as DocumentNode<
	ProductPriceRules_ProductPriceRulesFragment,
	unknown
>;
export const Variant_VariantFragmentDoc = {
	kind: 'Document',
	definitions: [
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'Variant_variant' },
			typeCondition: {
				kind: 'NamedType',
				name: { kind: 'Name', value: 'Variant' }
			},
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{ kind: 'Field', name: { kind: 'Name', value: 'availableForSale' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'compareAtPrice' } },
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'content' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'FragmentSpread',
									name: { kind: 'Name', value: 'VariantContent_variantContent' }
								}
							]
						}
					},
					{ kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'indexedAt' } },
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'metafields' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'FragmentSpread',
									name: { kind: 'Name', value: 'Metafield_metafield' }
								}
							]
						}
					},
					{ kind: 'Field', name: { kind: 'Name', value: 'nacelleEntryId' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'price' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'priceCurrency' } },
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'priceRules' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'FragmentSpread',
									name: {
										kind: 'Name',
										value: 'ProductPriceRules_productPriceRules'
									}
								}
							]
						}
					},
					{ kind: 'Field', name: { kind: 'Name', value: 'productEntryId' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'productHandle' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'quantityAvailable' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'sku' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'sourceEntryId' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'sourceId' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'weight' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'weightUnit' } }
				]
			}
		}
	]
} as unknown as DocumentNode<Variant_VariantFragment, unknown>;
export const ProductOption_ProductOptionFragmentDoc = {
	kind: 'Document',
	definitions: [
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'ProductOption_productOption' },
			typeCondition: {
				kind: 'NamedType',
				name: { kind: 'Name', value: 'ProductOption' }
			},
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{ kind: 'Field', name: { kind: 'Name', value: 'name' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'values' } }
				]
			}
		}
	]
} as unknown as DocumentNode<ProductOption_ProductOptionFragment, unknown>;
export const Seo_SeoFragmentDoc = {
	kind: 'Document',
	definitions: [
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'SEO_seo' },
			typeCondition: {
				kind: 'NamedType',
				name: { kind: 'Name', value: 'SEO' }
			},
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{ kind: 'Field', name: { kind: 'Name', value: 'title' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'description' } }
				]
			}
		}
	]
} as unknown as DocumentNode<Seo_SeoFragment, unknown>;
export const ProductContent_ProductContentFragmentDoc = {
	kind: 'Document',
	definitions: [
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'ProductContent_productContent' },
			typeCondition: {
				kind: 'NamedType',
				name: { kind: 'Name', value: 'ProductContent' }
			},
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{ kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'description' } },
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'featuredMedia' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'FragmentSpread',
									name: { kind: 'Name', value: 'Media_media' }
								}
							]
						}
					},
					{ kind: 'Field', name: { kind: 'Name', value: 'fields' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'handle' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'indexedAt' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'locale' } },
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'media' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'FragmentSpread',
									name: { kind: 'Name', value: 'Media_media' }
								}
							]
						}
					},
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'metafields' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'FragmentSpread',
									name: { kind: 'Name', value: 'Metafield_metafield' }
								}
							]
						}
					},
					{ kind: 'Field', name: { kind: 'Name', value: 'nacelleEntryId' } },
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'options' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'FragmentSpread',
									name: { kind: 'Name', value: 'ProductOption_productOption' }
								}
							]
						}
					},
					{ kind: 'Field', name: { kind: 'Name', value: 'productEntryId' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'published' } },
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'seo' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'FragmentSpread',
									name: { kind: 'Name', value: 'SEO_seo' }
								}
							]
						}
					},
					{ kind: 'Field', name: { kind: 'Name', value: 'sourceEntryId' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'sourceId' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'title' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
				]
			}
		}
	]
} as unknown as DocumentNode<ProductContent_ProductContentFragment, unknown>;
export const Product_ProductFragmentDoc = {
	kind: 'Document',
	definitions: [
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'Product_product' },
			typeCondition: {
				kind: 'NamedType',
				name: { kind: 'Name', value: 'Product' }
			},
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{ kind: 'Field', name: { kind: 'Name', value: 'availableForSale' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'indexedAt' } },
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'metafields' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'FragmentSpread',
									name: { kind: 'Name', value: 'Metafield_metafield' }
								}
							]
						}
					},
					{ kind: 'Field', name: { kind: 'Name', value: 'nacelleEntryId' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'productType' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'sourceEntryId' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'sourceId' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'tags' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'vendor' } },
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'variants' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'FragmentSpread',
									name: { kind: 'Name', value: 'Variant_variant' }
								}
							]
						}
					},
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'content' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'FragmentSpread',
									name: { kind: 'Name', value: 'ProductContent_productContent' }
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<Product_ProductFragment, unknown>;
export const AllContentDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'allContent' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'filter' }
					},
					type: {
						kind: 'NamedType',
						name: { kind: 'Name', value: 'ContentFilterInput' }
					}
				}
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'allContent' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'filter' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'filter' }
								}
							}
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'pageInfo' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'hasNextPage' }
											},
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'endCursor' }
											}
										]
									}
								},
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'edges' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'cursor' }
											},
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'node' },
												selectionSet: {
													kind: 'SelectionSet',
													selections: [
														{
															kind: 'FragmentSpread',
															name: { kind: 'Name', value: 'Content_content' }
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		},
		...Content_ContentFragmentDoc.definitions
	]
} as unknown as DocumentNode<AllContentQuery, AllContentQueryVariables>;
export const NavigationDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'Navigation' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'filter' }
					},
					type: {
						kind: 'NamedType',
						name: { kind: 'Name', value: 'NavigationFilterInput' }
					}
				}
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'navigation' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'filter' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'filter' }
								}
							}
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'groupId' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'title' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'updatedBy' } },
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'items' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{
												kind: 'FragmentSpread',
												name: {
													kind: 'Name',
													value: 'NavigationItem_navigationItem'
												}
											},
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'items' },
												selectionSet: {
													kind: 'SelectionSet',
													selections: [
														{
															kind: 'FragmentSpread',
															name: {
																kind: 'Name',
																value: 'NavigationItem_navigationItem'
															}
														},
														{
															kind: 'Field',
															name: { kind: 'Name', value: 'items' },
															selectionSet: {
																kind: 'SelectionSet',
																selections: [
																	{
																		kind: 'FragmentSpread',
																		name: {
																			kind: 'Name',
																			value: 'NavigationItem_navigationItem'
																		}
																	},
																	{
																		kind: 'Field',
																		name: { kind: 'Name', value: 'items' },
																		selectionSet: {
																			kind: 'SelectionSet',
																			selections: [
																				{
																					kind: 'FragmentSpread',
																					name: {
																						kind: 'Name',
																						value:
																							'NavigationItem_navigationItem'
																					}
																				},
																				{
																					kind: 'Field',
																					name: {
																						kind: 'Name',
																						value: 'items'
																					},
																					selectionSet: {
																						kind: 'SelectionSet',
																						selections: [
																							{
																								kind: 'FragmentSpread',
																								name: {
																									kind: 'Name',
																									value:
																										'NavigationItem_navigationItem'
																								}
																							}
																						]
																					}
																				}
																			]
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		},
		...NavigationItem_NavigationItemFragmentDoc.definitions
	]
} as unknown as DocumentNode<NavigationQuery, NavigationQueryVariables>;
export const AllProductsDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'allProducts' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'filter' }
					},
					type: {
						kind: 'NamedType',
						name: { kind: 'Name', value: 'ProductFilterInput' }
					}
				}
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'allProducts' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'filter' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'filter' }
								}
							}
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'pageInfo' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'hasNextPage' }
											},
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'endCursor' }
											}
										]
									}
								},
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'edges' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'cursor' }
											},
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'node' },
												selectionSet: {
													kind: 'SelectionSet',
													selections: [
														{
															kind: 'FragmentSpread',
															name: { kind: 'Name', value: 'Product_product' }
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		},
		...Product_ProductFragmentDoc.definitions,
		...Metafield_MetafieldFragmentDoc.definitions,
		...Variant_VariantFragmentDoc.definitions,
		...VariantContent_VariantContentFragmentDoc.definitions,
		...Media_MediaFragmentDoc.definitions,
		...ProductPriceRules_ProductPriceRulesFragmentDoc.definitions,
		...ProductPriceBreak_ProductPriceBreakFragmentDoc.definitions,
		...ProductContent_ProductContentFragmentDoc.definitions,
		...ProductOption_ProductOptionFragmentDoc.definitions,
		...Seo_SeoFragmentDoc.definitions
	]
} as unknown as DocumentNode<AllProductsQuery, AllProductsQueryVariables>;
export const SpacePropertiesDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'SpaceProperties' },
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'spaceProperties' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'properties' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'items' },
												selectionSet: {
													kind: 'SelectionSet',
													selections: [
														{
															kind: 'Field',
															name: { kind: 'Name', value: 'key' }
														},
														{
															kind: 'Field',
															name: { kind: 'Name', value: 'value' }
														}
													]
												}
											},
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'namespace' }
											}
										]
									}
								},
								{ kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'updatedBy' } }
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	SpacePropertiesQuery,
	SpacePropertiesQueryVariables
>;
