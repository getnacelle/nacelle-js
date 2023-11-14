/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A signed decimal number, which supports arbitrary precision and is serialized as a string. Example value: "29.99". */
  Decimal: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
};

export type CollectionContent = Node & {
  __typename?: 'CollectionContent';
  /** [sys] Reference to collection by Nacelle ID. */
  collectionEntryId: Scalars['ID']['output'];
  /** [source] The Unix timestamp in seconds when the collection content was created. */
  createdAt?: Maybe<Scalars['Int']['output']>;
  /** [source] The description for a collection. */
  description?: Maybe<Scalars['String']['output']>;
  /** [source] The primary media for a collection. */
  featuredMedia?: Maybe<Media>;
  /** [source] Custom fields from a dynamic CMS source. */
  fields?: Maybe<Scalars['JSON']['output']>;
  /** [sys] Reference to collection by handle. */
  handle?: Maybe<Scalars['String']['output']>;
  /** [sys] Timestamp of when Nacelle last indexed this entry. */
  indexedAt?: Maybe<Scalars['Int']['output']>;
  /** [source] The locale of product collection to be presented. [IETF language tag] (ie. en-US) */
  locale?: Maybe<Scalars['String']['output']>;
  /** [source] List of metafields associated with the product collection. */
  metafields: Array<Metafield>;
  /** [sys] The Nacelle ID of the entry. */
  nacelleEntryId: Scalars['ID']['output'];
  /** [source] Specifies if the collection content has been published. */
  published?: Maybe<Scalars['Boolean']['output']>;
  /** [source] SEO fields for a collection */
  seo?: Maybe<Seo>;
  /** [source] The ID for the content from its system of origin (i.e. Shopify). */
  sourceEntryId: Scalars['ID']['output'];
  /** [source] The ID for the system of origin. */
  sourceId: Scalars['ID']['output'];
  /** [source] The title for a collection. */
  title?: Maybe<Scalars['String']['output']>;
  /** [source] The Unix timestamp in seconds when the collection content was last modified. */
  updatedAt?: Maybe<Scalars['Int']['output']>;
};

/** Represents master pieces of content like a page, article, employee, press-release, etc. */
export type Content = Node & {
  __typename?: 'Content';
  /** [source] The Unix timestamp in seconds when the content was created. */
  createdAt?: Maybe<Scalars['Int']['output']>;
  /** [source] Stringified JSON representing custom fields from a dynamic CMS source. */
  fields?: Maybe<Scalars['JSON']['output']>;
  /** [source] Specifies genesis data if exists. */
  genesis?: Maybe<Genesis>;
  /** [source] A human-friendly unique string for the content. */
  handle?: Maybe<Scalars['String']['output']>;
  /** [sys] Timestamp of when Nacelle last indexed this entry. */
  indexedAt?: Maybe<Scalars['Int']['output']>;
  /** [source] The locale of the content to be presented. [IETF language tag] (ie. en-US) */
  locale?: Maybe<Scalars['String']['output']>;
  /** [sys] The Nacelle ID of the entry. */
  nacelleEntryId: Scalars['ID']['output'];
  /** [source] Specifies if the content has been published. */
  published?: Maybe<Scalars['Boolean']['output']>;
  /** [source] The ID for the content from its system of origin (i.e. Shopify). */
  sourceEntryId: Scalars['ID']['output'];
  /** [source] The ID for the system of origin. */
  sourceId: Scalars['ID']['output'];
  /** [source] List of tags that have been associated to the content. */
  tags: Array<Scalars['String']['output']>;
  /** [source] The title for the content. */
  title?: Maybe<Scalars['String']['output']>;
  /** [source] The categorization for the content, often used for search and filter. */
  type?: Maybe<Scalars['String']['output']>;
  typedFields?: Maybe<ContentTypedFields>;
  /** [source] The Unix timestamp in seconds when the content was last modified. */
  updatedAt?: Maybe<Scalars['Int']['output']>;
};

/** Represents a collection of content: articles for a blog, employees for an About Us page, press releases for a News page, etc. */
export type ContentCollection = Node & {
  __typename?: 'ContentCollection';
  /** [source] Localized content associated with the content collection. */
  content?: Maybe<CollectionContent>;
  /** [source] List of content entries with Relay-style pagination */
  contentConnection: ContentConnection;
  /** [source] The Unix timestamp in seconds when the content collection was created. */
  createdAt?: Maybe<Scalars['Int']['output']>;
  /**
   * [source] List of content entries for a given content collection.
   * @deprecated `contentConnection` should be used for paginated content queries.
   */
  entries: Array<Content>;
  /** [sys] Timestamp of when Nacelle last indexed this entry. */
  indexedAt?: Maybe<Scalars['Int']['output']>;
  /** [source] List of metafields associated with the content collection. */
  metafields: Array<Metafield>;
  /** [sys] The Nacelle ID of the entry. */
  nacelleEntryId: Scalars['ID']['output'];
  /** [source] The ID for the content from its system of origin (i.e. Shopify). */
  sourceEntryId: Scalars['ID']['output'];
  /** [source] The ID for the system of origin. */
  sourceId: Scalars['ID']['output'];
  /** [source] List of tags that have been associated to the collection. */
  tags: Array<Scalars['String']['output']>;
  /** [source] The Unix timestamp in seconds when the content collection was last modified. */
  updatedAt?: Maybe<Scalars['Int']['output']>;
};


/** Represents a collection of content: articles for a blog, employees for an About Us page, press releases for a News page, etc. */
export type ContentCollectionContentConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


/** Represents a collection of content: articles for a blog, employees for an About Us page, press releases for a News page, etc. */
export type ContentCollectionEntriesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
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
  cursor: Scalars['String']['output'];
  node: ContentCollection;
};

/** Filter results for product collection */
export type ContentCollectionFilterInput = {
  /** Returns elements after a cursor nacelleEntryId */
  after?: InputMaybe<Scalars['String']['input']>;
  /** Returns the first n collections of a query. Defaults to 100. Max value of 500 */
  first?: InputMaybe<Scalars['Int']['input']>;
  /** Filter content collection entries by entry handle. */
  handles?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Filter items based on locale. [IETF language tag] (ie. en-US) */
  locale?: InputMaybe<Scalars['String']['input']>;
  /** Filter content collection entries by Nacelle entry id. */
  nacelleEntryIds?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Filter content collection entries by source entry id. */
  sourceEntryIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** Result of a Content Query with pagination info */
export type ContentConnection = NodeConnection & {
  __typename?: 'ContentConnection';
  edges: Array<ContentEdge>;
  /** [source] Returns filtered number of entries for backend search, defaults to null */
  filteredCount?: Maybe<Scalars['Int']['output']>;
  pageInfo: PageInfo;
  /** [source] Returns total number of entries in a collection for collection queries, null for content queries */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** Implementation of an Edge type for Content entries */
export type ContentEdge = NodeEdge & {
  __typename?: 'ContentEdge';
  cursor: Scalars['String']['output'];
  node: Content;
};

/** Filter results for content */
export type ContentFilterInput = {
  /** Returns elements after a cursor nacelleEntryId */
  after?: InputMaybe<Scalars['String']['input']>;
  /** Experimental: Filter content entries by audience segment */
  audienceSegment?: InputMaybe<Scalars['String']['input']>;
  /** Determines how many levels of nested content entries should be returned */
  entryDepth?: InputMaybe<Scalars['Int']['input']>;
  /** Returns the first n content entries of a query. Defaults to 100. Max value of 500 */
  first?: InputMaybe<Scalars['Int']['input']>;
  /** Filter content entries by entry handle. Requires type filter or defaults to type of 'page'. */
  handles?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Filter items based on locale. [IETF language tag] (ie. en-US) */
  locale?: InputMaybe<Scalars['String']['input']>;
  /** Filter content entries by Nacelle entry id. */
  nacelleEntryIds?: InputMaybe<Array<Scalars['String']['input']>>;
  /** The backend search filter */
  searchFilter?: InputMaybe<ContentSearchOptions>;
  /** Filter content entries by source entry id. */
  sourceEntryIds?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Experimental: Filter content entries by source id. */
  sourceId?: InputMaybe<Scalars['String']['input']>;
  /** Filter content entries by content type (ie. 'article', 'page', etc.) */
  type?: InputMaybe<Scalars['String']['input']>;
};

/** List of Content ids grouped for a specific purpose. */
export type ContentList = {
  __typename?: 'ContentList';
  ids: Array<Scalars['ID']['output']>;
  listHandle?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

/** Searchable fields for content */
export enum ContentSearchFields {
  Handle = 'HANDLE',
  Title = 'TITLE',
  Type = 'TYPE'
}

/** Search options for content */
export type ContentSearchOptions = {
  /** The searchable fields for content */
  fields?: InputMaybe<Array<ContentSearchFields>>;
  /** The field by which to sort by */
  sortField?: InputMaybe<ProductCollectionSearchFields>;
  /** The order by which to sort */
  sortOrder?: InputMaybe<ProductCollectionSortOrder>;
  /** The search term of the entry to search */
  term?: InputMaybe<Scalars['String']['input']>;
};

export type ContentTypedFields = TypedFieldsExampleArticleFields | TypedFieldsExampleAuthorFields | TypedFieldsExampleLinksFields | TypedFieldsExamplePageFields;

/** Represents a ISO 6709 coordinate. */
export type Coordinate = {
  __typename?: 'Coordinate';
  /** [source] Location north or south of the equator. */
  latitude: Scalars['Float']['output'];
  /** [source] Location east or west of the prime meridian. */
  longitude: Scalars['Float']['output'];
};

/** Genesis object indicating which entries map to remixed ones. */
export type Genesis = {
  __typename?: 'Genesis';
  audienceSegment: Scalars['String']['output'];
  originalContentHandle?: Maybe<Scalars['String']['output']>;
  originalContentId: Scalars['String']['output'];
};

/** Fields available for inventory item */
export type InventoryItem = {
  __typename?: 'InventoryItem';
  /** [source] An identifier associated with the item. */
  key?: Maybe<Scalars['String']['output']>;
  /** [source] List of inventory levels for the item. */
  levels?: Maybe<Array<InventoryLevel>>;
  /** [source] List of metafields associated with the item. */
  metafields?: Maybe<Scalars['JSON']['output']>;
  /** [sys] The Nacelle ID of the entry. */
  nacelleEntryId: Scalars['ID']['output'];
  /** [source] The SKU (stock keeping unit) associated with the item. */
  sku?: Maybe<Scalars['String']['output']>;
  /** [source] The ID for the item from its system of origin (i.e. Shopify). */
  sourceEntryId: Scalars['ID']['output'];
  /** [sys] Reference to parent variant by Nacelle ID. */
  variantEntryId: Scalars['ID']['output'];
};

/** Fields available for inventory level */
export type InventoryLevel = {
  __typename?: 'InventoryLevel';
  /** [source] Specifies if the item is available for pickup at the location. */
  availableForPickup?: Maybe<Scalars['Boolean']['output']>;
  /** [source] The location for the inventory item. */
  location?: Maybe<InventoryLocation>;
  /** [source] List of metafields associated with the level. */
  metafields?: Maybe<Scalars['JSON']['output']>;
  /** [sys] The Nacelle ID of the entry. */
  nacelleEntryId: Scalars['ID']['output'];
  /** [source] The total sellable quantity of the inventory item. */
  quantityAvailable?: Maybe<Scalars['Int']['output']>;
  /** [source] The ID for the level from its system of origin (i.e. Shopify). */
  sourceEntryId: Scalars['ID']['output'];
};

/** Fields available for inventory location */
export type InventoryLocation = {
  __typename?: 'InventoryLocation';
  /** [source] The coordinates of the location. */
  coordinates?: Maybe<Coordinate>;
  /** [source] The country code of the location. */
  countryCode?: Maybe<Scalars['String']['output']>;
  /** [source] List of metafields associated with the item. */
  metafields?: Maybe<Scalars['JSON']['output']>;
  /** [sys] The Nacelle ID of the entry. */
  nacelleEntryId: Scalars['ID']['output'];
  /** [source] The name of the location. */
  name?: Maybe<Scalars['String']['output']>;
  /** [source] The region code of the location. */
  regionCode?: Maybe<Scalars['String']['output']>;
  /** [source] The ID for the location from its system of origin (i.e. Shopify). */
  sourceEntryId: Scalars['ID']['output'];
};

/** Filter result for inventory */
export type InventoryLocationFilterInput = {
  /** Filter inventory by location country code */
  countryCode?: InputMaybe<Scalars['String']['input']>;
  /** Filter inventory by location name */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Filter inventory by location region code */
  regionCode?: InputMaybe<Scalars['String']['input']>;
};

/** A piece of media that can represent an Image, 3dModel, or Video. */
export type Media = {
  __typename?: 'Media';
  altText?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  mimeType?: Maybe<Scalars['String']['output']>;
  src: Scalars['String']['output'];
  thumbnailSrc?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
};

/** Metafields represent custom metadata attached to a resource. Metafields can be sorted into namespaces and are comprised of keys, values */
export type Metafield = {
  __typename?: 'Metafield';
  id?: Maybe<Scalars['ID']['output']>;
  key: Scalars['String']['output'];
  namespace?: Maybe<Scalars['String']['output']>;
  value: Scalars['String']['output'];
};

/** Represents a single price */
export type Money = {
  __typename?: 'Money';
  /** [source] An amount for the money */
  amount: Scalars['Int']['output'];
  /** [source] A currencyCode identifier for the amount */
  currencyCode: Scalars['String']['output'];
  /** [source] (optional) The precision to which the currency amount should be displayed */
  precisionDigits?: Maybe<Scalars['Int']['output']>;
};

/** The mutation root. */
export type Mutation = {
  __typename?: 'Mutation';
  root?: Maybe<Scalars['String']['output']>;
};

/** The filter to apply, when selecting navigation items. */
export type NavigationFilterInput = {
  /** The navigation group to filter by */
  groupId?: InputMaybe<Scalars['String']['input']>;
};

export type NavigationGroup = {
  __typename?: 'NavigationGroup';
  /** Created-at timestamp */
  createdAt?: Maybe<Scalars['String']['output']>;
  /** The unique identifier of the navigation group */
  groupId: Scalars['String']['output'];
  /** Items within a navigation group */
  items?: Maybe<Array<NavigationGroupItem>>;
  /** Navigation properties */
  properties?: Maybe<Array<NavigationPropertyItem>>;
  /** Displayable title of a navigation group */
  title?: Maybe<Scalars['String']['output']>;
  /** Updated-at timestamp */
  updatedAt?: Maybe<Scalars['String']['output']>;
  /** Updated-by user ID */
  updatedBy?: Maybe<Scalars['String']['output']>;
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
  title: Scalars['String']['output'];
  /** Item type */
  type?: Maybe<NavigationPropertyType>;
  /** Route to a navigation item */
  url: Scalars['String']['output'];
};

export type NavigationMediaItem = {
  __typename?: 'NavigationMediaItem';
  /** URL that links to the media item */
  url?: Maybe<Scalars['String']['output']>;
};

export type NavigationPropertyItem = {
  __typename?: 'NavigationPropertyItem';
  key: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export enum NavigationPropertyType {
  Blog = 'BLOG',
  Collection = 'COLLECTION',
  External = 'EXTERNAL',
  General = 'GENERAL',
  Page = 'PAGE',
  Product = 'PRODUCT'
}

/** An entry with a Globally Unique ID */
export type Node = {
  /** The Nacelle ID of the entry. */
  nacelleEntryId: Scalars['ID']['output'];
};

/** An object containing an array of Node data and pagination information */
export type NodeConnection = {
  edges: Array<NodeEdge>;
  pageInfo: PageInfo;
};

/** An object containing a node with Nacelle data and a cursor for pagination and filtering */
export type NodeEdge = {
  cursor: Scalars['String']['output'];
  node: Node;
};

/** Pagination object indicating if there are more pages of data and where the next page starts. */
export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor: Scalars['String']['output'];
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor: Scalars['String']['output'];
};

/** A price break definition. */
export type PriceBreak = {
  __typename?: 'PriceBreak';
  /** [source] List of metafields associated with the price break. */
  metafields: Array<Metafield>;
  /** [source] The price associated with this price break. */
  price?: Maybe<Scalars['Decimal']['output']>;
  /** [source] Maximum quantity of variant needed to apply price break. */
  quantityMax?: Maybe<Scalars['Int']['output']>;
  /** [source] Minimum quantity of variant needed to apply price break. */
  quantityMin?: Maybe<Scalars['Int']['output']>;
};

/** A price rule definition. */
export type PriceRule = {
  __typename?: 'PriceRule';
  /** [source] Array of customer segment ids. Unused. */
  availableTo: Array<Scalars['String']['output']>;
  /** [source] The compare at price of the price rule. This can be used to mark a variant as on sale. */
  comparedAtPrice?: Maybe<Scalars['Decimal']['output']>;
  /** [source] Country code associated with this price rule. Distinct from currency code. */
  country?: Maybe<Scalars['String']['output']>;
  /** [source] Identifying handle of price rule if applicable. */
  handle: Scalars['String']['output'];
  /** [source] The id of the source price rule if applicable. */
  id?: Maybe<Scalars['ID']['output']>;
  /** [source] List of metafields associated with the price rule. */
  metafields: Array<Metafield>;
  /** [source] The price associated with this price rule. */
  price: Scalars['Decimal']['output'];
  /** [source] Used for changing a variant's price based on quantity selected. */
  priceBreaks: Array<PriceBreak>;
  /** [source] The currency code for this price rule. */
  priceCurrency: Scalars['String']['output'];
  /** [source] The title of the price rule. */
  title: Scalars['String']['output'];
};

/** Fields available for standalone pricing */
export type Pricing = {
  __typename?: 'Pricing';
  /** [source] List of metafields associated with the pricing */
  metafields?: Maybe<Scalars['JSON']['output']>;
  /** [sys] The Nacelle ID of the entry */
  nacelleEntryId: Scalars['ID']['output'];
  /** [source] The default price */
  price?: Maybe<Money>;
  /** [source] The shipping price */
  shipping?: Maybe<Money>;
  /** [source] The discounted price */
  strikeThroughPrice?: Maybe<Money>;
  /** [source] The tax amount */
  taxValue?: Maybe<Money>;
  /** [sys] Reference to parent variant by Nacelle ID */
  variantEntryId: Scalars['ID']['output'];
};

/** Filter results for pricing */
export type PricingFilterInput = {
  /** Filter pricing by country code (ISO-3166 alpha-2) */
  countryCode?: InputMaybe<Scalars['String']['input']>;
  /** Filter pricing by currency code (ISO-4217) */
  currencyCode?: InputMaybe<Scalars['String']['input']>;
  /** Returns the first n products of a query. Defaults to 100. Max value of 500 */
  first?: InputMaybe<Scalars['Int']['input']>;
};

/** A product represents an individual item for sale. Products are often physical, but they don't have to be. For example, a digital download (such as a movie, music or ebook file) also qualifies as a product, as do services (such as equipment rental, work for hire, customization of another product or an extended warranty). */
export type Product = Node & {
  __typename?: 'Product';
  /** [source] Specifies if at least one product variant is available for sale. */
  availableForSale?: Maybe<Scalars['Boolean']['output']>;
  /** [source] Localized content for the product. */
  content?: Maybe<ProductContent>;
  /** [source] The Unix timestamp in seconds when the product was created. */
  createdAt?: Maybe<Scalars['Int']['output']>;
  /** [sys] Timestamp of when Nacelle last indexed this entry. */
  indexedAt?: Maybe<Scalars['Int']['output']>;
  /** [source] List of metafields associated with the product. */
  metafields: Array<Metafield>;
  /** [sys] The Nacelle ID of the entry. */
  nacelleEntryId: Scalars['ID']['output'];
  /** [source] The categorization for a product, often used for search and filter. */
  productType?: Maybe<Scalars['String']['output']>;
  /** [source] The ID for the product from its system of origin (i.e. Shopify). */
  sourceEntryId: Scalars['ID']['output'];
  /** [source] The ID for the system of origin. */
  sourceId: Scalars['ID']['output'];
  /** [source] List of tags that have been associated to the product. */
  tags: Array<Scalars['String']['output']>;
  /** [source] The Unix timestamp in seconds when the product was last modified. */
  updatedAt?: Maybe<Scalars['Int']['output']>;
  /** [source] List of variants for the product. */
  variants: Array<Variant>;
  /** [source] Vendor name for product. */
  vendor?: Maybe<Scalars['String']['output']>;
};


/** A product represents an individual item for sale. Products are often physical, but they don't have to be. For example, a digital download (such as a movie, music or ebook file) also qualifies as a product, as do services (such as equipment rental, work for hire, customization of another product or an extended warranty). */
export type ProductVariantsArgs = {
  filter?: InputMaybe<ProductFilterInput>;
};

/** Represents a collection of products. */
export type ProductCollection = Node & {
  __typename?: 'ProductCollection';
  /** [source] Localized content associated with the product collection. */
  content?: Maybe<CollectionContent>;
  /** [source] The Unix timestamp in seconds when the product collection was created. */
  createdAt?: Maybe<Scalars['Int']['output']>;
  /** [sys] Timestamp of when Nacelle last indexed this entry. */
  indexedAt?: Maybe<Scalars['Int']['output']>;
  /** [source] List of metafields associated with the product collection. */
  metafields: Array<Metafield>;
  /** [sys] The Nacelle ID of the entry. */
  nacelleEntryId: Scalars['ID']['output'];
  /** [source] List of products entries with Relay-style pagination */
  productConnection: ProductConnection;
  /**
   * [source] List of products for a given product collection.
   * @deprecated `productConnection` should be used for paginated product queries.
   */
  products: Array<Product>;
  /** [source] The ID for the content from its system of origin (i.e. Shopify). */
  sourceEntryId: Scalars['ID']['output'];
  /** [source] The ID for the system of origin. */
  sourceId: Scalars['ID']['output'];
  /** [source] List of tags that have been associated to the collection. */
  tags: Array<Scalars['String']['output']>;
  /** [source] The Unix timestamp in seconds when the product collection was last modified. */
  updatedAt?: Maybe<Scalars['Int']['output']>;
};


/** Represents a collection of products. */
export type ProductCollectionProductConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


/** Represents a collection of products. */
export type ProductCollectionProductsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};

/** Result of a Content Query with pagination info */
export type ProductCollectionConnection = NodeConnection & {
  __typename?: 'ProductCollectionConnection';
  edges: Array<ProductCollectionEdge>;
  /** [source] Returns filtered number of collections for backend search, defaults to null */
  filteredCount?: Maybe<Scalars['Int']['output']>;
  pageInfo: PageInfo;
  /** [source] Returns total number of collections for backend search, defaults to null */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** Implementation of an Edge type for Content entries */
export type ProductCollectionEdge = NodeEdge & {
  __typename?: 'ProductCollectionEdge';
  cursor: Scalars['String']['output'];
  node: ProductCollection;
};

/** Filter results for product collection */
export type ProductCollectionFilterInput = {
  /** Returns elements after a cursor nacelleEntryId */
  after?: InputMaybe<Scalars['String']['input']>;
  /** Returns the first n collections of a query. Defaults to 100. Max value of 500 */
  first?: InputMaybe<Scalars['Int']['input']>;
  /** Filter product collection entries by entry handle. */
  handles?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Filter items based on locale. [IETF language tag] (ie. en-US) */
  locale?: InputMaybe<Scalars['String']['input']>;
  /** Filter product collection entries by Nacelle entry id. */
  nacelleEntryIds?: InputMaybe<Array<Scalars['String']['input']>>;
  /** The backend search filter */
  searchFilter?: InputMaybe<ProductCollectionSearchOptions>;
  /** Filter product collection entries by source entry id. */
  sourceEntryIds?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Filter content entries by content type (ie. 'article', 'page', etc.) */
  type?: InputMaybe<Scalars['String']['input']>;
};

/** Searchable fields for product collection */
export enum ProductCollectionSearchFields {
  Handle = 'HANDLE',
  Tags = 'TAGS',
  Title = 'TITLE'
}

/** Search options for Product Collection */
export type ProductCollectionSearchOptions = {
  /** The searchable fields for product collections */
  fields?: InputMaybe<Array<ProductCollectionSearchFields>>;
  /** The field by which to sort by */
  sortField?: InputMaybe<ProductCollectionSearchFields>;
  /** The order by which to sort */
  sortOrder?: InputMaybe<ProductCollectionSortOrder>;
  /** The search term of the entry to search */
  term?: InputMaybe<Scalars['String']['input']>;
};

/** Order by which to sort */
export enum ProductCollectionSortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

/** Result of a Content Query with pagination info */
export type ProductConnection = NodeConnection & {
  __typename?: 'ProductConnection';
  edges: Array<ProductEdge>;
  /** [source] Returns filtered number of products for backend search, defaults to null */
  filteredCount?: Maybe<Scalars['Int']['output']>;
  pageInfo: PageInfo;
  /** [source] Returns total number of products in a collection for collection queries, null for product queries */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** A piece of product content represents the localized version of data points, with more flexibility. */
export type ProductContent = Node & {
  __typename?: 'ProductContent';
  /** [source] The Unix timestamp in seconds when the product content was created. */
  createdAt?: Maybe<Scalars['Int']['output']>;
  /** [source] The description for a product. */
  description?: Maybe<Scalars['String']['output']>;
  /** [source] The primary media for a product. */
  featuredMedia?: Maybe<Media>;
  /** [source] Custom fields from a dynamic CMS source. */
  fields?: Maybe<Scalars['JSON']['output']>;
  /** [sys] Reference to product by handle. */
  handle?: Maybe<Scalars['String']['output']>;
  /** [sys] Timestamp of when Nacelle last indexed this entry. */
  indexedAt?: Maybe<Scalars['Int']['output']>;
  /** [source] The locale of product content to be presented. [IETF language tag] (ie. en-US) */
  locale?: Maybe<Scalars['String']['output']>;
  /** [source] List of media for a product */
  media: Array<Media>;
  /** [source] List of metafields associated with the product content. */
  metafields: Array<Metafield>;
  /** [sys] The Nacelle ID of the entry. */
  nacelleEntryId: Scalars['ID']['output'];
  /** [source] List of product options. */
  options: Array<ProductOption>;
  /** [sys] Reference to product by Nacelle ID. */
  productEntryId?: Maybe<Scalars['ID']['output']>;
  /** [source] Specifies if the product content has been published. */
  published?: Maybe<Scalars['Boolean']['output']>;
  /** [source] SEO fields for a product */
  seo?: Maybe<Seo>;
  /** [source] The ID for the product content from its system of origin (i.e. Shopify). */
  sourceEntryId: Scalars['ID']['output'];
  /** [source] The ID for the system of origin. */
  sourceId: Scalars['ID']['output'];
  /** [source] The title for a product. */
  title?: Maybe<Scalars['String']['output']>;
  /** [source] The Unix timestamp in seconds when the product content was last modified. */
  updatedAt?: Maybe<Scalars['Int']['output']>;
};

/** Implementation of an Edge type for Product entries */
export type ProductEdge = NodeEdge & {
  __typename?: 'ProductEdge';
  cursor: Scalars['String']['output'];
  node: Product;
};

/** Filter results for product */
export type ProductFilterInput = {
  /** Returns elements after a cursor nacelleEntryId */
  after?: InputMaybe<Scalars['String']['input']>;
  /** Returns the first n products of a query. Defaults to 100. Max value of 500 */
  first?: InputMaybe<Scalars['Int']['input']>;
  /** Filter product entries by entry handle. */
  handles?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Filter items based on locale. [IETF language tag] (ie. en-US) */
  locale?: InputMaybe<Scalars['String']['input']>;
  /** Filter product entries by Nacelle entry id. */
  nacelleEntryIds?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Deprecated. `PricingFilterInput` should be used for filtering Price books. */
  pricingCountryCode?: InputMaybe<Scalars['String']['input']>;
  /** The backend search filter */
  searchFilter?: InputMaybe<ProductSearchOptions>;
  /** Filter product entries by source entry id. */
  sourceEntryIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** List of Product ids grouped for a specific purpose. */
export type ProductList = {
  __typename?: 'ProductList';
  ids: Array<Scalars['ID']['output']>;
  listHandle?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

/** Product property names like Size, Color, and Material that the customers can select. Variants are selected based on permutations of these options. */
export type ProductOption = {
  __typename?: 'ProductOption';
  name: Scalars['String']['output'];
  values: Array<Scalars['String']['output']>;
};

/** Searchable fields for product */
export enum ProductSearchFields {
  Handle = 'HANDLE',
  Sku = 'SKU',
  Tags = 'TAGS',
  Title = 'TITLE'
}

/** Search options for product */
export type ProductSearchOptions = {
  /** The searchable fields for product */
  fields?: InputMaybe<Array<ProductSearchFields>>;
  /** The field by which to sort by */
  sortField?: InputMaybe<ProductCollectionSearchFields>;
  /** The order by which to sort */
  sortOrder?: InputMaybe<ProductCollectionSortOrder>;
  /** The search term of the entry to search */
  term?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  _service: _Service;
  /** Query a list of content entries with Relay-style pagination */
  allContent: ContentConnection;
  /**
   * Query a list of content collection entries with Relay-style pagination
   * @deprecated `allContent` should be used for paginated content queries.
   */
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
   * @deprecated `allContent` should be used for paginated content queries.
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
  root?: Maybe<Scalars['String']['output']>;
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
  message: Scalars['String']['output'];
};

/** A field used to provide SEO data for web crawlers */
export type Seo = {
  __typename?: 'SEO';
  description: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

/** Properties used by customers to select a product variant. Products can have multiple options, like different sizes or colors. */
export type SelectedOption = {
  __typename?: 'SelectedOption';
  label?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type SpaceProperties = {
  __typename?: 'SpaceProperties';
  /** List of space properties grouped by namespace */
  properties?: Maybe<Array<Maybe<SpacePropertyNamespace>>>;
  /** Updated-at timestamp */
  updatedAt?: Maybe<Scalars['String']['output']>;
  /** Updated-by user ID */
  updatedBy?: Maybe<Scalars['String']['output']>;
};

export type SpacePropertyItem = {
  __typename?: 'SpacePropertyItem';
  /** Property name */
  key: Scalars['String']['output'];
  /** Property value */
  value: Scalars['String']['output'];
};

export type SpacePropertyNamespace = {
  __typename?: 'SpacePropertyNamespace';
  /** List of space properties items */
  items?: Maybe<Array<Maybe<SpacePropertyItem>>>;
  /** Namespace name */
  namespace?: Maybe<Scalars['String']['output']>;
};

export type TypedFieldsExampleArticle = Node & {
  __typename?: 'TypedFieldsExampleArticle';
  /** [source] The Unix timestamp in seconds when the content was created. */
  createdAt?: Maybe<Scalars['Int']['output']>;
  /** [source] A human-friendly unique string for the content. */
  handle?: Maybe<Scalars['String']['output']>;
  /** [sys] Timestamp of when Nacelle last indexed this entry. */
  indexedAt?: Maybe<Scalars['Int']['output']>;
  /** [source] The Unix timestamp in seconds when the content was created. */
  locale?: Maybe<Scalars['String']['output']>;
  /** [sys] The Nacelle ID of the entry. */
  nacelleEntryId: Scalars['ID']['output'];
  /** [source] Specifies if the content has been published. */
  published?: Maybe<Scalars['Boolean']['output']>;
  /** [source] The ID for the content from its system of origin. */
  sourceEntryId: Scalars['ID']['output'];
  /** [source] The ID for the system of origin. */
  sourceId: Scalars['ID']['output'];
  /** [source] The ID for the system of origin. */
  tags: Array<Scalars['String']['output']>;
  /** [source] The title for the content. */
  title?: Maybe<Scalars['String']['output']>;
  /** [source] The categorization for the content, often used for search and filter. */
  type?: Maybe<Scalars['String']['output']>;
  /** [source] Fields defined by the content model. */
  typedFields?: Maybe<TypedFieldsExampleArticleFields>;
  /** [source] The Unix timestamp in seconds when the content was last modified. */
  updatedAt?: Maybe<Scalars['Int']['output']>;
};

export type TypedFieldsExampleArticleFields = {
  __typename?: 'TypedFieldsExampleArticleFields';
  author?: Maybe<TypedFieldsExampleAuthor>;
  haiku?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type TypedFieldsExampleAuthor = Node & {
  __typename?: 'TypedFieldsExampleAuthor';
  /** [source] The Unix timestamp in seconds when the content was created. */
  createdAt?: Maybe<Scalars['Int']['output']>;
  /** [source] A human-friendly unique string for the content. */
  handle?: Maybe<Scalars['String']['output']>;
  /** [sys] Timestamp of when Nacelle last indexed this entry. */
  indexedAt?: Maybe<Scalars['Int']['output']>;
  /** [source] The Unix timestamp in seconds when the content was created. */
  locale?: Maybe<Scalars['String']['output']>;
  /** [sys] The Nacelle ID of the entry. */
  nacelleEntryId: Scalars['ID']['output'];
  /** [source] Specifies if the content has been published. */
  published?: Maybe<Scalars['Boolean']['output']>;
  /** [source] The ID for the content from its system of origin. */
  sourceEntryId: Scalars['ID']['output'];
  /** [source] The ID for the system of origin. */
  sourceId: Scalars['ID']['output'];
  /** [source] The ID for the system of origin. */
  tags: Array<Scalars['String']['output']>;
  /** [source] The title for the content. */
  title?: Maybe<Scalars['String']['output']>;
  /** [source] The categorization for the content, often used for search and filter. */
  type?: Maybe<Scalars['String']['output']>;
  /** [source] Fields defined by the content model. */
  typedFields?: Maybe<TypedFieldsExampleAuthorFields>;
  /** [source] The Unix timestamp in seconds when the content was last modified. */
  updatedAt?: Maybe<Scalars['Int']['output']>;
};

export type TypedFieldsExampleAuthorFields = {
  __typename?: 'TypedFieldsExampleAuthorFields';
  firstName?: Maybe<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
};

export type TypedFieldsExampleLinks = Node & {
  __typename?: 'TypedFieldsExampleLinks';
  /** [source] The Unix timestamp in seconds when the content was created. */
  createdAt?: Maybe<Scalars['Int']['output']>;
  /** [source] A human-friendly unique string for the content. */
  handle?: Maybe<Scalars['String']['output']>;
  /** [sys] Timestamp of when Nacelle last indexed this entry. */
  indexedAt?: Maybe<Scalars['Int']['output']>;
  /** [source] The Unix timestamp in seconds when the content was created. */
  locale?: Maybe<Scalars['String']['output']>;
  /** [sys] The Nacelle ID of the entry. */
  nacelleEntryId: Scalars['ID']['output'];
  /** [source] Specifies if the content has been published. */
  published?: Maybe<Scalars['Boolean']['output']>;
  /** [source] The ID for the content from its system of origin. */
  sourceEntryId: Scalars['ID']['output'];
  /** [source] The ID for the system of origin. */
  sourceId: Scalars['ID']['output'];
  /** [source] The ID for the system of origin. */
  tags: Array<Scalars['String']['output']>;
  /** [source] The title for the content. */
  title?: Maybe<Scalars['String']['output']>;
  /** [source] The categorization for the content, often used for search and filter. */
  type?: Maybe<Scalars['String']['output']>;
  /** [source] Fields defined by the content model. */
  typedFields?: Maybe<TypedFieldsExampleLinksFields>;
  /** [source] The Unix timestamp in seconds when the content was last modified. */
  updatedAt?: Maybe<Scalars['Int']['output']>;
};

export type TypedFieldsExampleLinksFields = {
  __typename?: 'TypedFieldsExampleLinksFields';
  links?: Maybe<TypedFieldsExampleLinksFieldsLinksConnection>;
  title?: Maybe<Scalars['String']['output']>;
};


export type TypedFieldsExampleLinksFieldsLinksArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};

/** A content connection with pagination info */
export type TypedFieldsExampleLinksFieldsLinksConnection = {
  __typename?: 'TypedFieldsExampleLinksFieldsLinksConnection';
  edges: Array<TypedFieldsExampleLinksFieldsLinksEdge>;
  pageInfo: TypedFieldsExamplePageInfo;
};

/** A content connection edge */
export type TypedFieldsExampleLinksFieldsLinksEdge = {
  __typename?: 'TypedFieldsExampleLinksFieldsLinksEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  node?: Maybe<TypedFieldsExamplePage>;
};

export type TypedFieldsExamplePage = Node & {
  __typename?: 'TypedFieldsExamplePage';
  /** [source] The Unix timestamp in seconds when the content was created. */
  createdAt?: Maybe<Scalars['Int']['output']>;
  /** [source] A human-friendly unique string for the content. */
  handle?: Maybe<Scalars['String']['output']>;
  /** [sys] Timestamp of when Nacelle last indexed this entry. */
  indexedAt?: Maybe<Scalars['Int']['output']>;
  /** [source] The Unix timestamp in seconds when the content was created. */
  locale?: Maybe<Scalars['String']['output']>;
  /** [sys] The Nacelle ID of the entry. */
  nacelleEntryId: Scalars['ID']['output'];
  /** [source] Specifies if the content has been published. */
  published?: Maybe<Scalars['Boolean']['output']>;
  /** [source] The ID for the content from its system of origin. */
  sourceEntryId: Scalars['ID']['output'];
  /** [source] The ID for the system of origin. */
  sourceId: Scalars['ID']['output'];
  /** [source] The ID for the system of origin. */
  tags: Array<Scalars['String']['output']>;
  /** [source] The title for the content. */
  title?: Maybe<Scalars['String']['output']>;
  /** [source] The categorization for the content, often used for search and filter. */
  type?: Maybe<Scalars['String']['output']>;
  /** [source] Fields defined by the content model. */
  typedFields?: Maybe<TypedFieldsExamplePageFields>;
  /** [source] The Unix timestamp in seconds when the content was last modified. */
  updatedAt?: Maybe<Scalars['Int']['output']>;
};

export type TypedFieldsExamplePageFields = {
  __typename?: 'TypedFieldsExamplePageFields';
  handle?: Maybe<Scalars['String']['output']>;
  sections?: Maybe<TypedFieldsExamplePageFieldsSectionsConnection>;
  title?: Maybe<Scalars['String']['output']>;
};


export type TypedFieldsExamplePageFieldsSectionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};

export type TypedFieldsExamplePageFieldsSections = TypedFieldsExampleArticle | TypedFieldsExampleLinks;

/** A content connection with pagination info */
export type TypedFieldsExamplePageFieldsSectionsConnection = {
  __typename?: 'TypedFieldsExamplePageFieldsSectionsConnection';
  edges: Array<TypedFieldsExamplePageFieldsSectionsEdge>;
  pageInfo: TypedFieldsExamplePageInfo;
};

/** A content connection edge */
export type TypedFieldsExamplePageFieldsSectionsEdge = {
  __typename?: 'TypedFieldsExamplePageFieldsSectionsEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  node?: Maybe<TypedFieldsExamplePageFieldsSections>;
};

/** Pagination object indicating if there are more pages of data and where the next page starts. */
export type TypedFieldsExamplePageInfo = {
  __typename?: 'TypedFieldsExamplePageInfo';
  endCursor: Scalars['String']['output'];
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor: Scalars['String']['output'];
};

/** A product variant represents a different version of a product, such as differing sizes or differing colors. */
export type Variant = Node & {
  __typename?: 'Variant';
  /** [source] Specifies if the variant is available for sale. */
  availableForSale?: Maybe<Scalars['Boolean']['output']>;
  /** [source] The compare at price of the variant. This can be used to mark a variant as on sale. */
  compareAtPrice?: Maybe<Scalars['Decimal']['output']>;
  /** [source] Localized content for the variant. */
  content?: Maybe<VariantContent>;
  /** [source] The Unix timestamp in seconds when the variant was created. */
  createdAt?: Maybe<Scalars['Int']['output']>;
  /** [sys] Timestamp of when Nacelle last indexed this entry. */
  indexedAt?: Maybe<Scalars['Int']['output']>;
  /** [source] Standalone inventory */
  inventory?: Maybe<InventoryItem>;
  /** [source] List of metafields associated with the variant. */
  metafields: Array<Metafield>;
  /** [sys] The Nacelle ID of the entry. */
  nacelleEntryId: Scalars['ID']['output'];
  /** [source] The price of the variant. */
  price?: Maybe<Scalars['Decimal']['output']>;
  /** [source] The currency of the variant price. */
  priceCurrency?: Maybe<Scalars['String']['output']>;
  /** [source] List of pricing rules associated with the variant */
  priceRules: Array<PriceRule>;
  /** [source] Standalone pricing */
  pricing?: Maybe<Array<Maybe<Pricing>>>;
  /** [sys] Reference to parent product by Nacelle ID. */
  productEntryId?: Maybe<Scalars['ID']['output']>;
  /** [sys] Reference to parent product by handle. */
  productHandle?: Maybe<Scalars['String']['output']>;
  /** [source] The total sellable quantity of the variant for online sales channels. */
  quantityAvailable?: Maybe<Scalars['Int']['output']>;
  /** [source] The SKU (stock keeping unit) associated with the variant. */
  sku?: Maybe<Scalars['String']['output']>;
  /** [source] The ID for the product variant from its system of origin (i.e. Shopify). */
  sourceEntryId: Scalars['ID']['output'];
  /** [source] The ID for the system of origin. */
  sourceId: Scalars['ID']['output'];
  /** [source] The Unix timestamp in seconds when the variant was last modified. */
  updatedAt?: Maybe<Scalars['Int']['output']>;
  /** [source] The variant sort position. */
  variantPosition?: Maybe<Scalars['Int']['output']>;
  /** [source] The weight of the variant in the unit specified with weightUnit. */
  weight?: Maybe<Scalars['Float']['output']>;
  /** [source] The unit of measurement for weight. */
  weightUnit?: Maybe<Scalars['String']['output']>;
};


/** A product variant represents a different version of a product, such as differing sizes or differing colors. */
export type VariantInventoryArgs = {
  filter?: InputMaybe<InventoryLocationFilterInput>;
};


/** A product variant represents a different version of a product, such as differing sizes or differing colors. */
export type VariantPricingArgs = {
  filter?: InputMaybe<PricingFilterInput>;
};

/** A piece of variant content represents the localized version of data points, with more flexibility. */
export type VariantContent = Node & {
  __typename?: 'VariantContent';
  /** [source] The Unix timestamp in seconds when the variant content was created. */
  createdAt?: Maybe<Scalars['Int']['output']>;
  /** [source] The description for a variant. */
  description?: Maybe<Scalars['String']['output']>;
  /** [source] The primary media for a variant. */
  featuredMedia?: Maybe<Media>;
  /** [source] Custom fields from a dynamic CMS source. */
  fields?: Maybe<Scalars['JSON']['output']>;
  /** [sys] Timestamp of when Nacelle last indexed this entry. */
  indexedAt?: Maybe<Scalars['Int']['output']>;
  /** [source] The locale of variant content to be presented. [IETF language tag] (ie. en-US) */
  locale?: Maybe<Scalars['String']['output']>;
  /** [source] List of media for a variant */
  media: Array<Media>;
  /** [source] List of metafields associated with the variant content. */
  metafields: Array<Metafield>;
  /** [sys] The Nacelle ID of the entry. */
  nacelleEntryId: Scalars['ID']['output'];
  /** [sys] Reference to parent product by Nacelle ID. */
  productEntryId?: Maybe<Scalars['ID']['output']>;
  /** [sys] Reference to parent product by handle. */
  productHandle?: Maybe<Scalars['String']['output']>;
  /** [source] Specifies if the variant content has been published. */
  published?: Maybe<Scalars['Boolean']['output']>;
  /** [source] List of product options applied to the variant. */
  selectedOptions: Array<SelectedOption>;
  /** [source] The ID for the variant content from its system of origin (i.e. Shopify). */
  sourceEntryId: Scalars['ID']['output'];
  /** [source] The ID for the system of origin. */
  sourceId: Scalars['ID']['output'];
  /** [source] Source url of variant swatch. */
  swatchSrc?: Maybe<Scalars['String']['output']>;
  /** [source] The title for a variant. */
  title?: Maybe<Scalars['String']['output']>;
  /** [source] The Unix timestamp in seconds when the variant content was last modified. */
  updatedAt?: Maybe<Scalars['Int']['output']>;
  /** [sys] Reference to parent variant by Nacelle ID. */
  variantEntryId?: Maybe<Scalars['ID']['output']>;
};

export type _Service = {
  __typename?: '_Service';
  /** The sdl representing the federated service capabilities. Includes federation directives, removes federation types, and includes rest of full schema after schema directives have been applied */
  sdl?: Maybe<Scalars['String']['output']>;
};

export type ContentRoutesQueryVariables = Exact<{ [key: string]: never; }>;


export type ContentRoutesQuery = { __typename?: 'Query', pages: { __typename?: 'ContentConnection', edges: Array<{ __typename?: 'ContentEdge', node: { __typename?: 'Content', handle?: string | null } }> } };

export type PageFields_PageFieldsFragment = { __typename: 'TypedFieldsExamplePageFields', handle?: string | null, title?: string | null, sections?: { __typename?: 'TypedFieldsExamplePageFieldsSectionsConnection', edges: Array<{ __typename?: 'TypedFieldsExamplePageFieldsSectionsEdge', node?: (
        { __typename: 'TypedFieldsExampleArticle', nacelleEntryId: string }
        & { ' $fragmentRefs'?: { 'Article_ContentFragment': Article_ContentFragment } }
      ) | (
        { __typename: 'TypedFieldsExampleLinks', nacelleEntryId: string }
        & { ' $fragmentRefs'?: { 'Links_ContentFragment': Links_ContentFragment } }
      ) | null }> } | null } & { ' $fragmentName'?: 'PageFields_PageFieldsFragment' };

export type PageByHandleQueryVariables = Exact<{
  handle: Scalars['String']['input'];
}>;


export type PageByHandleQuery = { __typename?: 'Query', allContent: { __typename?: 'ContentConnection', edges: Array<{ __typename?: 'ContentEdge', node: { __typename?: 'Content', handle?: string | null, nacelleEntryId: string, typedFields?: { __typename: 'TypedFieldsExampleArticleFields' } | { __typename: 'TypedFieldsExampleAuthorFields' } | { __typename: 'TypedFieldsExampleLinksFields' } | (
          { __typename: 'TypedFieldsExamplePageFields' }
          & { ' $fragmentRefs'?: { 'PageFields_PageFieldsFragment': PageFields_PageFieldsFragment } }
        ) | null } }> } };

export type Article_ContentFragment = { __typename?: 'TypedFieldsExampleArticle', nacelleEntryId: string, typedFields?: { __typename?: 'TypedFieldsExampleArticleFields', haiku?: string | null, title?: string | null, author?: { __typename?: 'TypedFieldsExampleAuthor', typedFields?: { __typename?: 'TypedFieldsExampleAuthorFields', firstName?: string | null, lastName?: string | null } | null } | null } | null } & { ' $fragmentName'?: 'Article_ContentFragment' };

export type LinkArticle_ContentFragment = { __typename: 'TypedFieldsExampleArticle', nacelleEntryId: string, title?: string | null, typedFields?: { __typename?: 'TypedFieldsExampleArticleFields', author?: { __typename?: 'TypedFieldsExampleAuthor', typedFields?: { __typename?: 'TypedFieldsExampleAuthorFields', firstName?: string | null, lastName?: string | null } | null } | null } | null } & { ' $fragmentName'?: 'LinkArticle_ContentFragment' };

export type Link_ContentFragment = { __typename: 'TypedFieldsExamplePage', nacelleEntryId: string, handle?: string | null, typedFields?: { __typename?: 'TypedFieldsExamplePageFields', sections?: { __typename?: 'TypedFieldsExamplePageFieldsSectionsConnection', edges: Array<{ __typename?: 'TypedFieldsExamplePageFieldsSectionsEdge', node?: (
          { __typename?: 'TypedFieldsExampleArticle' }
          & { ' $fragmentRefs'?: { 'LinkArticle_ContentFragment': LinkArticle_ContentFragment } }
        ) | { __typename?: 'TypedFieldsExampleLinks' } | null }> } | null } | null } & { ' $fragmentName'?: 'Link_ContentFragment' };

export type Links_ContentFragment = { __typename?: 'TypedFieldsExampleLinks', nacelleEntryId: string, typedFields?: { __typename?: 'TypedFieldsExampleLinksFields', title?: string | null, links?: { __typename?: 'TypedFieldsExampleLinksFieldsLinksConnection', edges: Array<{ __typename?: 'TypedFieldsExampleLinksFieldsLinksEdge', node?: (
          { __typename?: 'TypedFieldsExamplePage', nacelleEntryId: string }
          & { ' $fragmentRefs'?: { 'Link_ContentFragment': Link_ContentFragment } }
        ) | null }> } | null } | null } & { ' $fragmentName'?: 'Links_ContentFragment' };

export const Article_ContentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Article_Content"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TypedFieldsExampleArticle"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nacelleEntryId"}},{"kind":"Field","name":{"kind":"Name","value":"typedFields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"haiku"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"typedFields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]}}]} as unknown as DocumentNode<Article_ContentFragment, unknown>;
export const LinkArticle_ContentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LinkArticle_Content"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TypedFieldsExampleArticle"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"nacelleEntryId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"typedFields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"typedFields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]}}]} as unknown as DocumentNode<LinkArticle_ContentFragment, unknown>;
export const Link_ContentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Link_Content"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TypedFieldsExamplePage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"nacelleEntryId"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}},{"kind":"Field","name":{"kind":"Name","value":"typedFields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LinkArticle_Content"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LinkArticle_Content"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TypedFieldsExampleArticle"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"nacelleEntryId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"typedFields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"typedFields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]}}]} as unknown as DocumentNode<Link_ContentFragment, unknown>;
export const Links_ContentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Links_Content"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TypedFieldsExampleLinks"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nacelleEntryId"}},{"kind":"Field","name":{"kind":"Name","value":"typedFields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"links"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Node"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nacelleEntryId"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Link_Content"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LinkArticle_Content"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TypedFieldsExampleArticle"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"nacelleEntryId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"typedFields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"typedFields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Link_Content"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TypedFieldsExamplePage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"nacelleEntryId"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}},{"kind":"Field","name":{"kind":"Name","value":"typedFields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LinkArticle_Content"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<Links_ContentFragment, unknown>;
export const PageFields_PageFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PageFields_PageFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TypedFieldsExamplePageFields"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Node"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nacelleEntryId"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Article_Content"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Links_Content"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LinkArticle_Content"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TypedFieldsExampleArticle"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"nacelleEntryId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"typedFields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"typedFields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Link_Content"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TypedFieldsExamplePage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"nacelleEntryId"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}},{"kind":"Field","name":{"kind":"Name","value":"typedFields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LinkArticle_Content"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Article_Content"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TypedFieldsExampleArticle"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nacelleEntryId"}},{"kind":"Field","name":{"kind":"Name","value":"typedFields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"haiku"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"typedFields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Links_Content"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TypedFieldsExampleLinks"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nacelleEntryId"}},{"kind":"Field","name":{"kind":"Name","value":"typedFields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"links"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Node"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nacelleEntryId"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Link_Content"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<PageFields_PageFieldsFragment, unknown>;
export const ContentRoutesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ContentRoutes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"pages"},"name":{"kind":"Name","value":"allContent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"StringValue","value":"page","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"handle"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ContentRoutesQuery, ContentRoutesQueryVariables>;
export const PageByHandleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PageByHandle"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"handle"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allContent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"StringValue","value":"page","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"handles"},"value":{"kind":"ListValue","values":[{"kind":"Variable","name":{"kind":"Name","value":"handle"}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"handle"}},{"kind":"Field","name":{"kind":"Name","value":"nacelleEntryId"}},{"kind":"Field","name":{"kind":"Name","value":"typedFields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PageFields_PageFields"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Article_Content"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TypedFieldsExampleArticle"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nacelleEntryId"}},{"kind":"Field","name":{"kind":"Name","value":"typedFields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"haiku"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"typedFields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LinkArticle_Content"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TypedFieldsExampleArticle"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"nacelleEntryId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"typedFields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"typedFields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Link_Content"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TypedFieldsExamplePage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"nacelleEntryId"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}},{"kind":"Field","name":{"kind":"Name","value":"typedFields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LinkArticle_Content"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Links_Content"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TypedFieldsExampleLinks"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nacelleEntryId"}},{"kind":"Field","name":{"kind":"Name","value":"typedFields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"links"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Node"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nacelleEntryId"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Link_Content"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PageFields_PageFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TypedFieldsExamplePageFields"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Node"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nacelleEntryId"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Article_Content"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Links_Content"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PageByHandleQuery, PageByHandleQueryVariables>;